import { ScanResults as ScanResultsComponent } from '../ScanResults';
import { ThemeProvider } from '../ThemeProvider';

export default function ScanResultsExample() {
  const mockData = {
    url: 'https://example.com/product',
    ingredients: 'Enriched flour (wheat flour, niacin, reduced iron, vitamin B1), sugar, peanut butter (peanuts, salt), vegetable oil, high fructose corn syrup, salt, soy lecithin, artificial flavor',
    allergens: [
      { name: 'Peanuts', icon: '🥜', status: 'detected' as const, details: 'Found in ingredient list' },
      { name: 'Tree Nuts', icon: '🌰', status: 'not_found' as const },
      { name: 'Milk', icon: '🥛', status: 'not_found' as const },
      { name: 'Eggs', icon: '🥚', status: 'not_found' as const },
      { name: 'Fish', icon: '🐟', status: 'not_found' as const },
      { name: 'Shellfish', icon: '🦐', status: 'not_found' as const },
      { name: 'Soy', icon: '🫘', status: 'detected' as const, details: 'Contains soy lecithin' },
      { name: 'Wheat', icon: '🌾', status: 'detected' as const, details: 'Contains wheat flour' },
    ],
    timestamp: new Date(),
    confidence: 95,
  };

  return (
    <ThemeProvider>
      <ScanResultsComponent 
        data={mockData} 
        onNewScan={() => console.log('New scan clicked')}
      />
    </ThemeProvider>
  );
}
