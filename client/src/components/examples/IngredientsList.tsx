import { IngredientsList as IngredientsListComponent } from '../IngredientsList';
import { ThemeProvider } from '../ThemeProvider';

export default function IngredientsListExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-4xl mx-auto">
        <IngredientsListComponent 
          ingredients="Enriched flour (wheat flour, niacin, reduced iron, vitamin B1), sugar, peanut butter (peanuts, salt), vegetable oil, high fructose corn syrup, salt, soy lecithin, artificial flavor"
          detectedAllergens={["wheat", "peanuts", "soy"]}
        />
      </div>
    </ThemeProvider>
  );
}
