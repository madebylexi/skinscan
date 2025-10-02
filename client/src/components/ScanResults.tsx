import { AllergenCard, type AllergenStatus } from "./AllergenCard";
import { SafetyScore } from "./SafetyScore";
import { IngredientsList } from "./IngredientsList";
import { AnalysisMetadata } from "./AnalysisMetadata";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface AllergenData {
  name: string;
  icon: string;
  status: AllergenStatus;
  details?: string;
}

export interface ScanResultData {
  url: string;
  ingredients: string;
  allergens: AllergenData[];
  timestamp: Date;
  confidence: number;
}

interface ScanResultsProps {
  data: ScanResultData;
  onNewScan: () => void;
}

export function ScanResults({ data, onNewScan }: ScanResultsProps) {
  const detectedCount = data.allergens.filter((a) => a.status === "detected").length;
  const safetyScore = detectedCount === 0 ? "safe" : detectedCount <= 2 ? "warning" : "danger";
  
  const detectedAllergenNames = data.allergens
    .filter((a) => a.status === "detected")
    .map((a) => a.name.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onNewScan}
          data-testid="button-new-scan"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New Scan
        </Button>
      </div>

      <div className="space-y-6">
        <SafetyScore
          score={safetyScore}
          detectedCount={detectedCount}
          totalChecked={data.allergens.length}
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4">Allergen Analysis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.allergens.map((allergen) => (
              <AllergenCard
                key={allergen.name}
                {...allergen}
              />
            ))}
          </div>
        </div>

        <IngredientsList
          ingredients={data.ingredients}
          detectedAllergens={detectedAllergenNames}
        />

        <AnalysisMetadata
          timestamp={data.timestamp}
          confidence={data.confidence}
          source="OpenAI GPT-4 Vision"
        />

        <DisclaimerBanner />
      </div>
    </div>
  );
}
