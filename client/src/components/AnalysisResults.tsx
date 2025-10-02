import { IngredientAnalysisCard, type IngredientRating } from "./IngredientAnalysisCard";
import { ProductRating } from "./ProductRating";
import { IngredientsList } from "./IngredientsList";
import { AnalysisMetadata } from "./AnalysisMetadata";
import { SkincareDisclaimer } from "./SkincareDisclaimer";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface IngredientData {
  name: string;
  commonName?: string;
  rating: IngredientRating;
  pros: string[];
  cons: string[];
}

export interface AnalysisResultData {
  url: string;
  ingredients: string;
  analyzedIngredients: IngredientData[];
  timestamp: Date;
  confidence: number;
}

interface AnalysisResultsProps {
  data: AnalysisResultData;
  onNewAnalysis: () => void;
}

export function AnalysisResults({ data, onNewAnalysis }: AnalysisResultsProps) {
  const beneficialCount = data.analyzedIngredients.filter((i) => i.rating === "beneficial").length;
  const concernCount = data.analyzedIngredients.filter((i) => i.rating === "concern").length;
  
  const productRating = 
    concernCount === 0 && beneficialCount >= data.analyzedIngredients.length * 0.7 ? "excellent" :
    concernCount <= 1 && beneficialCount >= data.analyzedIngredients.length * 0.5 ? "good" :
    concernCount <= 2 ? "fair" : "poor";
  
  const analyzedIngredientNames = data.analyzedIngredients.map((i) => i.name.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onNewAnalysis}
          data-testid="button-new-analysis"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Analyze Another Product
        </Button>
      </div>

      <div className="space-y-6">
        <ProductRating
          rating={productRating}
          beneficialCount={beneficialCount}
          concernCount={concernCount}
          totalAnalyzed={data.analyzedIngredients.length}
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredient Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.analyzedIngredients.map((ingredient, idx) => (
              <IngredientAnalysisCard
                key={idx}
                {...ingredient}
              />
            ))}
          </div>
        </div>

        <IngredientsList
          ingredients={data.ingredients}
          detectedAllergens={analyzedIngredientNames}
        />

        <AnalysisMetadata
          timestamp={data.timestamp}
          confidence={data.confidence}
          source="OpenAI GPT-4"
        />

        <SkincareDisclaimer />
      </div>
    </div>
  );
}
