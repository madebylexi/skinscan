import { Sparkles, CheckCircle2, Zap } from "lucide-react";
import { UrlScanner } from "./UrlScanner";

interface HeroProps {
  onScan: (url: string) => void;
  isScanning?: boolean;
}

export function Hero({ onScan, isScanning }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary/70 text-primary-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Ingredient Intelligence</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Decode Your Skincare Ingredients
          </h1>
          
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Instantly analyze product ingredients to discover benefits, concerns, and make informed skincare decisions. 
            Get expert AI-driven insights.
          </p>

          <div className="max-w-3xl mx-auto mb-8">
            <UrlScanner onScan={onScan} isScanning={isScanning} />
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Comprehensive Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>Pros & Cons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
