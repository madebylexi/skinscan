import { AllergenCard as AllergenCardComponent } from '../AllergenCard';
import { ThemeProvider } from '../ThemeProvider';

export default function AllergenCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-md mx-auto space-y-4">
        <AllergenCardComponent 
          name="Peanuts" 
          icon="🥜" 
          status="detected" 
          details="Found in ingredient list"
        />
        <AllergenCardComponent 
          name="Milk" 
          icon="🥛" 
          status="not_found" 
        />
        <AllergenCardComponent 
          name="Eggs" 
          icon="🥚" 
          status="uncertain" 
          details="May contain traces"
        />
      </div>
    </ThemeProvider>
  );
}
