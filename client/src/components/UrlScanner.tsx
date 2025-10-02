import { useState } from "react";
import { Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrlScannerProps {
  onScan: (url: string) => void;
  isScanning?: boolean;
}

export function UrlScanner({ onScan, isScanning = false }: UrlScannerProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onScan(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="url"
            placeholder="Enter product page URL (e.g., https://example.com/product)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-10 h-12"
            disabled={isScanning}
            data-testid="input-url"
            required
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isScanning || !url.trim()}
          data-testid="button-scan"
          className="min-w-32"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning
            </>
          ) : (
            "Scan Now"
          )}
        </Button>
      </div>
    </form>
  );
}
