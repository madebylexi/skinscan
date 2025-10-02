import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";

export type IngredientRating = "beneficial" | "caution" | "concern";

interface IngredientAnalysisCardProps {
  name: string;
  rating: IngredientRating;
  pros: string[];
  cons: string[];
  commonName?: string;
}

export function IngredientAnalysisCard({ name, rating, pros, cons, commonName }: IngredientAnalysisCardProps) {
  const ratingConfig = {
    beneficial: {
      color: "success",
      bgColor: "bg-success/10",
      borderColor: "border-success",
      label: "BENEFICIAL",
    },
    caution: {
      color: "warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning",
      label: "CAUTION",
    },
    concern: {
      color: "destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive",
      label: "CONCERN",
    },
  };

  const config = ratingConfig[rating];

  return (
    <Card className={`p-6 border-2 ${config.borderColor} ${config.bgColor}`} data-testid={`card-ingredient-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              {commonName && <p className="text-sm text-muted-foreground">{commonName}</p>}
            </div>
            <Badge
              className={`text-xs font-semibold uppercase tracking-wide shrink-0 ${
                rating === "beneficial"
                  ? "bg-success text-success-foreground"
                  : rating === "caution"
                  ? "bg-warning text-warning-foreground"
                  : "bg-destructive text-destructive-foreground"
              }`}
              data-testid={`badge-rating-${rating}`}
            >
              {config.label}
            </Badge>
          </div>
        </div>

        {pros.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="h-4 w-4 text-success" />
              <span className="font-medium text-sm">Benefits</span>
            </div>
            <ul className="space-y-1 ml-6">
              {pros.map((pro, idx) => (
                <li key={idx} className="text-sm text-muted-foreground list-disc">
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        )}

        {cons.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ThumbsDown className="h-4 w-4 text-destructive" />
              <span className="font-medium text-sm">Concerns</span>
            </div>
            <ul className="space-y-1 ml-6">
              {cons.map((con, idx) => (
                <li key={idx} className="text-sm text-muted-foreground list-disc">
                  {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
