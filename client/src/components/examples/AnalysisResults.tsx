import { AnalysisResults as AnalysisResultsComponent } from '../AnalysisResults';
import { ThemeProvider } from '../ThemeProvider';

export default function AnalysisResultsExample() {
  const mockData = {
    url: 'https://example.com/product',
    ingredients: 'Water, Glycerin, Hyaluronic Acid, Niacinamide, Vitamin C, Retinol, Peptides, Fragrance',
    analyzedIngredients: [
      {
        name: 'Hyaluronic Acid',
        commonName: 'Sodium Hyaluronate',
        rating: 'beneficial' as const,
        pros: ['Excellent hydration', 'Plumps skin', 'Suitable for all skin types'],
        cons: [],
      },
      {
        name: 'Niacinamide',
        commonName: 'Vitamin B3',
        rating: 'beneficial' as const,
        pros: ['Reduces hyperpigmentation', 'Minimizes pores', 'Strengthens skin barrier'],
        cons: [],
      },
      {
        name: 'Retinol',
        rating: 'caution' as const,
        pros: ['Anti-aging benefits', 'Improves texture'],
        cons: ['Can cause irritation', 'Requires sun protection'],
      },
      {
        name: 'Fragrance',
        rating: 'concern' as const,
        pros: ['Pleasant scent'],
        cons: ['Common irritant', 'Can disrupt skin barrier'],
      },
    ],
    timestamp: new Date(),
    confidence: 92,
  };

  return (
    <ThemeProvider>
      <AnalysisResultsComponent 
        data={mockData} 
        onNewAnalysis={() => console.log('New analysis clicked')}
      />
    </ThemeProvider>
  );
}
