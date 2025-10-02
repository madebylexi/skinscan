import { Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SkincareDisclaimer() {
  return (
    <Alert className="border-primary/20 bg-primary/5" data-testid="alert-disclaimer">
      <Heart className="h-4 w-4 text-primary" />
      <AlertDescription className="text-sm">
        <strong>Skincare Note:</strong> This analysis provides general ingredient information. Individual skin reactions vary. 
        Always patch test new products and consult a dermatologist for personalized skincare advice, especially if you have sensitive skin or specific concerns.
      </AlertDescription>
    </Alert>
  );
}
