import { ProductRating as ProductRatingComponent } from '../ProductRating';
import { ThemeProvider } from '../ThemeProvider';

export default function ProductRatingExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl mx-auto space-y-4">
        <ProductRatingComponent rating="excellent" beneficialCount={8} concernCount={0} totalAnalyzed={10} />
        <ProductRatingComponent rating="good" beneficialCount={6} concernCount={1} totalAnalyzed={10} />
        <ProductRatingComponent rating="fair" beneficialCount={4} concernCount={3} totalAnalyzed={10} />
        <ProductRatingComponent rating="poor" beneficialCount={2} concernCount={6} totalAnalyzed={10} />
      </div>
    </ThemeProvider>
  );
}
