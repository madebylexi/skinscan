import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface AnalyzedIngredient {
  name: string;
  commonName?: string;
  rating: 'beneficial' | 'caution' | 'concern';
  pros: string[];
  cons: string[];
}

interface AnalysisResponse {
  url: string;
  ingredients: string;
  analyzedIngredients: AnalyzedIngredient[];
  timestamp: Date;
  confidence: number;
}

async function scrapeIngredients(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Try multiple common selectors for ingredient lists
    const selectors = [
      '.ingredients',
      '.ingredient-list',
      '[class*="ingredient"]',
      '[id*="ingredient"]',
      'p:contains("Ingredients")',
      'div:contains("Ingredients")',
      'span:contains("Ingredients")',
      '.product-description',
      '.description'
    ];
    
    let ingredients = '';
    
    for (const selector of selectors) {
      const element = $(selector);
      if (element.length > 0) {
        let text = element.text().trim();
        
        // Look for the ingredients section
        if (text.toLowerCase().includes('ingredients')) {
          // Extract just the ingredients part
          const match = text.match(/ingredients[:\s]+([\s\S]+?)(?:\n\n|$)/i);
          if (match) {
            ingredients = match[1].trim();
            break;
          }
        }
        
        // If we found a substantial text block, use it
        if (text.length > 50 && !ingredients) {
          ingredients = text;
        }
      }
    }
    
    // If no ingredients found, search in all text
    if (!ingredients) {
      const bodyText = $('body').text();
      const match = bodyText.match(/ingredients[:\s]+([^.]+(?:\.[^.]+){0,10})/i);
      if (match) {
        ingredients = match[1].trim();
      }
    }
    
    if (!ingredients) {
      throw new Error('Could not find ingredients on the page. Please verify the URL contains product ingredient information.');
    }
    
    return ingredients;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch URL: ${error.message}`);
    }
    throw error;
  }
}

async function analyzeIngredientsWithAI(ingredients: string): Promise<{
  analyzedIngredients: AnalyzedIngredient[];
  confidence: number;
}> {
  try {
    const systemPrompt = `You are a skincare ingredient analysis expert. Provide detailed, accurate analysis of skincare ingredients based on scientific research. Always respond with valid JSON.`;

    const userPrompt = `You are a skincare ingredient expert. Analyze the following skincare product ingredients and provide detailed information about each significant ingredient.

Ingredients: ${ingredients}

For each notable ingredient, provide:
1. The ingredient name
2. Common name (if different)
3. Rating: "beneficial", "caution", or "concern"
4. List of pros (benefits)
5. List of cons (concerns or side effects)

Focus on the most important ingredients (skip basic ones like water unless they're significant). Rate as:
- "beneficial": Safe and effective with proven benefits
- "caution": Generally safe but may cause issues for some people or require care
- "concern": Potentially problematic, allergenic, or controversial

Respond with valid JSON in this exact format:
{
  "analyzedIngredients": [
    {
      "name": "Ingredient Name",
      "commonName": "Alternative Name",
      "rating": "beneficial",
      "pros": ["benefit 1", "benefit 2"],
      "cons": ["concern 1"]
    }
  ],
  "confidence": 85
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            analyzedIngredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  commonName: { type: "string" },
                  rating: { type: "string" },
                  pros: {
                    type: "array",
                    items: { type: "string" }
                  },
                  cons: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["name", "rating", "pros", "cons"]
              }
            },
            confidence: { type: "number" }
          },
          required: ["analyzedIngredients", "confidence"]
        }
      },
      contents: userPrompt,
    });

    const rawJson = response.text;

    if (rawJson) {
      const result = JSON.parse(rawJson);
      return {
        analyzedIngredients: result.analyzedIngredients || [],
        confidence: result.confidence || 75
      };
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/analyze - Analyze product URL for ingredients
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL is required' });
      }
      
      // Validate URL format
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: 'Invalid URL format' });
      }
      
      // Scrape ingredients from the URL
      console.log('Scraping ingredients from:', url);
      const ingredients = await scrapeIngredients(url);
      
      if (!ingredients) {
        return res.status(404).json({ error: 'No ingredients found on this page' });
      }
      
      console.log('Found ingredients, analyzing with AI...');
      
      // Analyze ingredients with AI
      const analysis = await analyzeIngredientsWithAI(ingredients);
      
      const response: AnalysisResponse = {
        url,
        ingredients,
        analyzedIngredients: analysis.analyzedIngredients,
        timestamp: new Date(),
        confidence: analysis.confidence
      };
      
      res.json(response);
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to analyze product'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
