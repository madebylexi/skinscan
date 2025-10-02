import { DisclaimerBanner as DisclaimerBannerComponent } from '../DisclaimerBanner';
import { ThemeProvider } from '../ThemeProvider';

export default function DisclaimerBannerExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-4xl mx-auto">
        <DisclaimerBannerComponent />
      </div>
    </ThemeProvider>
  );
}
