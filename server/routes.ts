import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
console.log("Gemini API Key loaded?", process.env.GEMINI_API_KEY ? "YES" : "NO");

interface AnalyzedIngredient {
  name: string;
  commonName?: string;
  rating: "beneficial" | "caution" | "concern";
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
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const selectors = [
      ".ingredients",
      ".ingredient-list",
      '[class*="ingredient"]',
      '[id*="ingredient"]',
      'p:contains("Ingredients")',
      'div:contains("Ingredients")',
      'span:contains("Ingredients")',
      ".product-description",
      ".description",
    ];

    let ingredients = "";

    for (const selector of selectors) {
      const element = $(selector);
      if (element.length > 0) {
        let text = element.text().trim();

        if (text.toLowerCase().includes("ingredients")) {
          const match = text.match(/ingredients[:\s]+([\s\S]+?)(?:\n\n|$)/i);
          if (match) {
            ingredients = match[1].trim();
            break;
          }
        }

        if (text.length > 50 && !ingredients) {
          ingredients = text;
        }
      }
    }

    if (!ingredients) {
      const bodyText = $("body").text();
      const match = bodyText.match(
        /ingredients[:\s]+([^.]+(?:\.[^.]+){0,10})/i
      );
      if (match) {
        ingredients = match[1].trim();
      }
    }

    if (!ingredients) {
      throw new Error(
        "Could not find ingredients on the page. Please verify the URL contains product ingredient information."
      );
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
    const prompt = `You are a skincare ingredient analysis expert. Analyze the following skincare product ingredients and return JSON in this format:

{
  "analyzedIngredients": [
    {
      "name": "Ingredient Name",
      "commonName": "Alternative Name",
      "rating": "beneficial | caution | concern",
      "pros": ["benefit 1", "benefit 2"],
      "cons": ["concern 1"]
    }
  ],
  "confidence": 85
}

Ingredients: ${ingredients}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    if (!rawText) throw new Error("Empty response from Gemini");

    // ✅ Clean code fences before parsing
    const cleaned = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {
      analyzedIngredients: parsed.analyzedIngredients || [],
      confidence: parsed.confidence || 75,
    };
  } catch (error) {
    throw new Error(
      `AI analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "URL is required" });
      }

      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      console.log("Scraping ingredients from:", url);
      const ingredients = await scrapeIngredients(url);

      if (!ingredients) {
        return res
          .status(404)
          .json({ error: "No ingredients found on this page" });
      }

      console.log("Found ingredients, analyzing with AI...");

      const analysis = await analyzeIngredientsWithAI(ingredients);

      const response: AnalysisResponse = {
        url,
        ingredients,
        analyzedIngredients: analysis.analyzedIngredients,
        timestamp: new Date(),
        confidence: analysis.confidence,
      };

      res.json(response);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze product",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
