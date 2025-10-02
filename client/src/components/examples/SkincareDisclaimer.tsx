import { SkincareDisclaimer as SkincareDisclaimerComponent } from '../SkincareDisclaimer';
import { ThemeProvider } from '../ThemeProvider';

export default function SkincareDisclaimerExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-4xl mx-auto">
        <SkincareDisclaimerComponent />
      </div>
    </ThemeProvider>
  );
}
