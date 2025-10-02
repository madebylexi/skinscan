import { Clock, Brain, Database } from "lucide-react";

interface AnalysisMetadataProps {
  timestamp: Date;
  confidence: number;
  source: string;
}

export function AnalysisMetadata({ timestamp, confidence, source }: AnalysisMetadataProps) {
  return (
    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground" data-testid="metadata-container">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span data-testid="text-timestamp">
          {timestamp.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4" />
        <span data-testid="text-confidence">
          AI Confidence: <span className="font-medium text-foreground">{confidence}%</span>
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4" />
        <span data-testid="text-source">Source: {source}</span>
      </div>
    </div>
  );
}
