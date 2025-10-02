import { Hero as HeroComponent } from '../Hero';
import { ThemeProvider } from '../ThemeProvider';

export default function HeroExample() {
  return (
    <ThemeProvider>
      <HeroComponent 
        onScan={(url) => console.log('Scanning:', url)} 
        isScanning={false}
      />
    </ThemeProvider>
  );
}
