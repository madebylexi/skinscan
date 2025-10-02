import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AnalysisResults, type AnalysisResultData } from "@/components/AnalysisResults";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    console.log('Analyzing URL:', url);

    // TODO: remove mock functionality - Replace with actual API call
    setTimeout(() => {
      const mockResult: AnalysisResultData = {
        url,
        ingredients: 'Water, Glycerin, Hyaluronic Acid (Sodium Hyaluronate), Niacinamide (Vitamin B3), Ascorbic Acid (Vitamin C), Retinol, Peptides, Ceramides, Fragrance, Preservatives',
        analyzedIngredients: [
          {
            name: 'Hyaluronic Acid',
            commonName: 'Sodium Hyaluronate',
            rating: 'beneficial',
            pros: [
              'Excellent hydration and moisture retention',
              'Plumps skin and reduces fine lines',
              'Suitable for all skin types including sensitive'
            ],
            cons: [],
          },
          {
            name: 'Niacinamide',
            commonName: 'Vitamin B3',
            rating: 'beneficial',
            pros: [
              'Reduces hyperpigmentation and dark spots',
              'Minimizes pore appearance',
              'Strengthens skin barrier function'
            ],
            cons: [],
          },
          {
            name: 'Vitamin C',
            commonName: 'Ascorbic Acid',
            rating: 'beneficial',
            pros: [
              'Powerful antioxidant protection',
              'Brightens skin tone',
              'Boosts collagen production'
            ],
            cons: [
              'Can oxidize quickly',
              'May cause sensitivity in high concentrations'
            ],
          },
          {
            name: 'Retinol',
            rating: 'caution',
            pros: [
              'Reduces wrinkles and fine lines',
              'Improves skin texture and tone',
              'Boosts collagen production'
            ],
            cons: [
              'Can cause irritation and peeling',
              'Requires daily sun protection',
              'Not suitable during pregnancy'
            ],
          },
          {
            name: 'Fragrance',
            rating: 'concern',
            pros: [
              'Provides pleasant product scent'
            ],
            cons: [
              'Common allergen and irritant',
              'Can disrupt skin barrier',
              'May cause contact dermatitis',
              'Unnecessary for product efficacy'
            ],
          },
        ],
        timestamp: new Date(),
        confidence: 92,
      };
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2500);
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
