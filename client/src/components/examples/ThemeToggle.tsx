import { ThemeToggle as ThemeToggleComponent } from '../ThemeToggle';
import { ThemeProvider } from '../ThemeProvider';

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <ThemeToggleComponent />
      </div>
    </ThemeProvider>
  );
}
