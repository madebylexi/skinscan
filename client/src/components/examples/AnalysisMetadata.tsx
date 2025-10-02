import { AnalysisMetadata as AnalysisMetadataComponent } from '../AnalysisMetadata';
import { ThemeProvider } from '../ThemeProvider';

export default function AnalysisMetadataExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-4xl mx-auto">
        <AnalysisMetadataComponent 
          timestamp={new Date()} 
          confidence={95} 
          source="OpenAI GPT-4 Vision"
        />
      </div>
    </ThemeProvider>
  );
}
