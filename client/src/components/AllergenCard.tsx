import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export type AllergenStatus = "detected" | "not_found" | "uncertain";

interface AllergenCardProps {
  name: string;
  icon: string;
  status: AllergenStatus;
  details?: string;
}

export function AllergenCard({ name, icon, status, details }: AllergenCardProps) {
  const statusConfig = {
    detected: {
      icon: XCircle,
      color: "destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive",
      label: "DETECTED",
    },
    not_found: {
      icon: CheckCircle2,
      color: "success",
      bgColor: "bg-success/10",
      borderColor: "border-success",
      label: "NOT FOUND",
    },
    uncertain: {
      icon: AlertCircle,
      color: "warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning",
      label: "UNCERTAIN",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className={`p-4 border-2 ${config.borderColor} ${config.bgColor}`} data-testid={`card-allergen-${name.toLowerCase()}`}>
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-base">{name}</h3>
            <StatusIcon className={`h-4 w-4 text-${config.color}`} />
          </div>
          <Badge
            variant={status === "not_found" ? "outline" : "default"}
            className={`text-xs font-semibold uppercase tracking-wide ${
              status === "detected"
                ? "bg-destructive text-destructive-foreground"
                : status === "uncertain"
                ? "bg-warning text-warning-foreground"
                : "bg-success text-success-foreground"
            }`}
            data-testid={`badge-status-${status}`}
          >
            {config.label}
          </Badge>
          {details && (
            <p className="text-sm text-muted-foreground mt-2">{details}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
