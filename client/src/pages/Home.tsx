import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AnalysisResults, type AnalysisResultData } from "@/components/AnalysisResults";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    console.log('Analyzing URL:', url);

    try {
      const response = await apiRequest('POST', '/api/analyze', { url });
      const result = await response.json() as AnalysisResultData;

      setAnalysisResult({
        ...result,
        timestamp: new Date(result.timestamp),
      });
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${result.analyzedIngredients.length} ingredients`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze the product. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {!analysisResult ? (
        <Hero onScan={handleAnalyze} isScanning={isAnalyzing} />
      ) : (
        <AnalysisResults data={analysisResult} onNewAnalysis={handleNewAnalysis} />
      )}
    </div>
  );
}
