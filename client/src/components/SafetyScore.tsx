import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";

interface SafetyScoreProps {
  score: "safe" | "warning" | "danger";
  detectedCount: number;
  totalChecked: number;
}

export function SafetyScore({ score, detectedCount, totalChecked }: SafetyScoreProps) {
  const scoreConfig = {
    safe: {
      icon: ShieldCheck,
      color: "success",
      label: "SAFE",
      message: "No allergens detected",
      bgColor: "bg-success/10",
    },
    warning: {
      icon: Shield,
      color: "warning",
      label: "CAUTION",
      message: "Some allergens may be present",
      bgColor: "bg-warning/10",
    },
    danger: {
      icon: ShieldAlert,
      color: "destructive",
      label: "ALLERGENS FOUND",
      message: "Contains detected allergens",
      bgColor: "bg-destructive/10",
    },
  };

  const config = scoreConfig[score];
  const ScoreIcon = config.icon;

  return (
    <Card className={`p-6 ${config.bgColor}`} data-testid="card-safety-score">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${config.color}/20`}>
          <ScoreIcon className={`h-8 w-8 text-${config.color}`} />
        </div>
        <div className="flex-1">
          <Badge
            className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
              score === "safe"
                ? "bg-success text-success-foreground"
                : score === "warning"
                ? "bg-warning text-warning-foreground"
                : "bg-destructive text-destructive-foreground"
            }`}
            data-testid={`badge-score-${score}`}
          >
            {config.label}
          </Badge>
          <p className="text-lg font-semibold">{config.message}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {detectedCount} of {totalChecked} allergens detected
          </p>
        </div>
      </div>
    </Card>
  );
}
