import { SafetyScore as SafetyScoreComponent } from '../SafetyScore';
import { ThemeProvider } from '../ThemeProvider';

export default function SafetyScoreExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl mx-auto space-y-4">
        <SafetyScoreComponent score="safe" detectedCount={0} totalChecked={8} />
        <SafetyScoreComponent score="warning" detectedCount={1} totalChecked={8} />
        <SafetyScoreComponent score="danger" detectedCount={3} totalChecked={8} />
      </div>
    </ThemeProvider>
  );
}
