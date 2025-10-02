import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DisclaimerBanner() {
  return (
    <Alert className="border-warning bg-warning/10" data-testid="alert-disclaimer">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertDescription className="text-sm">
        <strong>Medical Disclaimer:</strong> This tool provides informational analysis only and is not a substitute for medical advice. 
        Always consult healthcare professionals for allergen-related concerns and verify ingredient information directly with manufacturers.
      </AlertDescription>
    </Alert>
  );
}
