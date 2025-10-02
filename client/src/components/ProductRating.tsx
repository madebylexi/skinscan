import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, AlertCircle, ThumbsUp, CheckCircle, XCircle } from "lucide-react";

interface ProductRatingProps {
  rating: "excellent" | "good" | "fair" | "poor";
  beneficialCount: number;
  concernCount: number;
  totalAnalyzed: number;
  score: number;
}

export function ProductRating({ rating, beneficialCount, concernCount, totalAnalyzed, score }: ProductRatingProps) {
  const isRecommended = score >= 7;
  
  const ratingConfig = {
    excellent: {
      icon: Star,
      color: "success",
      label: "EXCELLENT",
      message: "Great ingredient profile",
      bgColor: "bg-success/10",
    },
    good: {
      icon: ThumbsUp,
      color: "success",
      label: "GOOD",
      message: "Mostly beneficial ingredients",
      bgColor: "bg-success/10",
    },
    fair: {
      icon: AlertCircle,
      color: "warning",
      label: "FAIR",
      message: "Some concerns identified",
      bgColor: "bg-warning/10",
    },
    poor: {
      icon: AlertCircle,
      color: "destructive",
      label: "POOR",
      message: "Multiple concerning ingredients",
      bgColor: "bg-destructive/10",
    },
  };

  const config = ratingConfig[rating];
  const RatingIcon = config.icon;

  return (
    <Card className={`p-6 ${config.bgColor}`} data-testid="card-product-rating">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-${config.color}/20`}>
            <RatingIcon className={`h-8 w-8 text-${config.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge
                className={`text-xs font-semibold uppercase tracking-wide ${
                  rating === "excellent" || rating === "good"
                    ? "bg-success text-success-foreground"
                    : rating === "fair"
                    ? "bg-warning text-warning-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
                data-testid={`badge-rating-${rating}`}
              >
                {config.label}
              </Badge>
              <Badge
                className={`text-xs font-semibold uppercase tracking-wide ${
                  isRecommended
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
                data-testid="badge-recommendation"
              >
                {isRecommended ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    RECOMMENDED
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    NOT RECOMMENDED
                  </>
                )}
              </Badge>
            </div>
            <p className="text-lg font-semibold">{config.message}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {beneficialCount} beneficial, {concernCount} concerning of {totalAnalyzed} analyzed
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Product Score</span>
            <span className="text-2xl font-bold" data-testid="text-score">
              {score.toFixed(1)}/10
            </span>
          </div>
          <Progress 
            value={score * 10} 
            className="h-3" 
            data-testid="progress-score"
          />
        </div>
      </div>
    </Card>
  );
}
