import { ThemeProvider } from "../ThemeProvider";
import { SoundToggle } from "../SoundToggle";

export default function SoundToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <SoundToggle />
      </div>
    </ThemeProvider>
  );
}
