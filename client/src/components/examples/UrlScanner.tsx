import { UrlScanner as UrlScannerComponent } from '../UrlScanner';
import { ThemeProvider } from '../ThemeProvider';

export default function UrlScannerExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-4xl mx-auto">
        <UrlScannerComponent 
          onScan={(url) => console.log('Scanning:', url)} 
          isScanning={false}
        />
      </div>
    </ThemeProvider>
  );
}
