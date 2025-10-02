import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface IngredientsListProps {
  ingredients: string;
  detectedAllergens?: string[];
}

export function IngredientsList({ ingredients, detectedAllergens = [] }: IngredientsListProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ingredients);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightAllergens = (text: string) => {
    if (detectedAllergens.length === 0) return text;

    let result = text;
    detectedAllergens.forEach((allergen) => {
      const regex = new RegExp(`(${allergen})`, "gi");
      result = result.replace(
        regex,
        '<span class="bg-destructive/20 px-1 rounded font-medium">$1</span>'
      );
    });
    return result;
  };

  const shouldTruncate = ingredients.length > 500;

  return (
    <Card className="p-6" data-testid="card-ingredients">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Ingredient List</h3>
        <div className="flex items-center gap-2">
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              data-testid="button-toggle-ingredients"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Expand
                </>
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            data-testid="button-copy-ingredients"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div
        className={`font-mono text-sm leading-relaxed ${
          !isExpanded && shouldTruncate ? "line-clamp-6" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: highlightAllergens(ingredients) }}
        data-testid="text-ingredients"
      />
    </Card>
  );
}
