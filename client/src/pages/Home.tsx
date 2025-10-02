import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScanResults, type ScanResultData } from "@/components/ScanResults";

export default function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultData | null>(null);

  const handleScan = async (url: string) => {
    setIsScanning(true);
    console.log('Scanning URL:', url);

    // TODO: remove mock functionality - Replace with actual API call
    setTimeout(() => {
      const mockResult: ScanResultData = {
        url,
        ingredients: 'Enriched flour (wheat flour, niacin, reduced iron, vitamin B1), sugar, peanut butter (peanuts, salt), vegetable oil, high fructose corn syrup, salt, soy lecithin, artificial flavor',
        allergens: [
          { name: 'Peanuts', icon: '🥜', status: 'detected', details: 'Found in ingredient list' },
          { name: 'Tree Nuts', icon: '🌰', status: 'not_found' },
          { name: 'Milk', icon: '🥛', status: 'not_found' },
          { name: 'Eggs', icon: '🥚', status: 'not_found' },
          { name: 'Fish', icon: '🐟', status: 'not_found' },
          { name: 'Shellfish', icon: '🦐', status: 'not_found' },
          { name: 'Soy', icon: '🫘', status: 'detected', details: 'Contains soy lecithin' },
          { name: 'Wheat', icon: '🌾', status: 'detected', details: 'Contains wheat flour' },
        ],
        timestamp: new Date(),
        confidence: 95,
      };
      setScanResult(mockResult);
      setIsScanning(false);
    }, 2000);
  };

  const handleNewScan = () => {
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {!scanResult ? (
        <Hero onScan={handleScan} isScanning={isScanning} />
      ) : (
        <ScanResults data={scanResult} onNewScan={handleNewScan} />
      )}
    </div>
  );
}
