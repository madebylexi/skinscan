import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, AlertCircle, ThumbsUp } from "lucide-react";

interface ProductRatingProps {
  rating: "excellent" | "good" | "fair" | "poor";
  beneficialCount: number;
  concernCount: number;
  totalAnalyzed: number;
}

export function ProductRating({ rating, beneficialCount, concernCount, totalAnalyzed }: ProductRatingProps) {
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
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${config.color}/20`}>
          <RatingIcon className={`h-8 w-8 text-${config.color}`} />
        </div>
        <div className="flex-1">
          <Badge
            className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
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
          <p className="text-lg font-semibold">{config.message}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {beneficialCount} beneficial, {concernCount} concerning of {totalAnalyzed} analyzed
          </p>
        </div>
      </div>
    </Card>
  );
}
