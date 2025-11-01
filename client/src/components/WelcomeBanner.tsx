import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("sinceNow-welcome-seen");
    if (!hasSeenWelcome) {
      setTimeout(() => setShow(true), 500);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("sinceNow-welcome-seen", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
      <div className="backdrop-blur-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-white/30 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full"
          data-testid="button-close-welcome"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float">✨</div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-4">
            Welcome to SinceNow
          </h1>
          <p className="text-xl text-foreground/90 font-inter">
            Every second tells your story
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                  Track What Matters
                </h3>
                <p className="text-foreground/70 font-inter text-sm">
                  Create beautiful counters for life's biggest moments - from quitting bad habits to
                  counting down to celebrations.
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                  Celebrate Milestones
                </h3>
                <p className="text-foreground/70 font-inter text-sm">
                  Get rewarded with visual celebrations, achievements, and sounds when you hit 7,
                  30, 100, or 365 days.
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                  Build Your Streak
                </h3>
                <p className="text-foreground/70 font-inter text-sm">
                  Visit daily to maintain your streak and unlock exclusive achievement badges along
                  the way.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleClose}
          className="w-full rounded-full py-6 text-lg font-poppins font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
          data-testid="button-start-journey"
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  );
}
