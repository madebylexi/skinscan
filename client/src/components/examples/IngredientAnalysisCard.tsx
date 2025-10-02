import { IngredientAnalysisCard as IngredientAnalysisCardComponent } from '../IngredientAnalysisCard';
import { ThemeProvider } from '../ThemeProvider';

export default function IngredientAnalysisCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl mx-auto space-y-4">
        <IngredientAnalysisCardComponent 
          name="Hyaluronic Acid" 
          commonName="Sodium Hyaluronate"
          rating="beneficial" 
          pros={[
            "Excellent hydration and moisture retention",
            "Plumps skin and reduces fine lines",
            "Suitable for all skin types"
          ]}
          cons={[]}
        />
        <IngredientAnalysisCardComponent 
          name="Retinol" 
          rating="caution" 
          pros={[
            "Reduces wrinkles and fine lines",
            "Improves skin texture and tone",
            "Boosts collagen production"
          ]}
          cons={[
            "Can cause irritation and sensitivity",
            "Requires sun protection",
            "Not suitable during pregnancy"
          ]}
        />
        <IngredientAnalysisCardComponent 
          name="Fragrance" 
          rating="concern" 
          pros={[
            "Provides pleasant scent"
          ]}
          cons={[
            "Common allergen and irritant",
            "Can disrupt skin barrier",
            "May cause contact dermatitis"
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
