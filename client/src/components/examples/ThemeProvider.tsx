import { ThemeProvider } from "../ThemeProvider";

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <p className="text-foreground">Theme Provider Example</p>
      </div>
    </ThemeProvider>
  );
}
