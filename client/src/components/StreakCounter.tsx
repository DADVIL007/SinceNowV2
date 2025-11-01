import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export function StreakCounter() {
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("sinceNow-lastVisit");
    const storedStreak = localStorage.getItem("sinceNow-streak") || "0";
    const currentStreak = parseInt(storedStreak, 10);
    
    const validStreak = isNaN(currentStreak) ? 0 : currentStreak;

    if (lastVisit === today) {
      setStreak(validStreak);
    } else {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      
      if (lastVisit === yesterday) {
        const newStreak = validStreak + 1;
        setStreak(newStreak);
        localStorage.setItem("sinceNow-streak", newStreak.toString());
        
        if (newStreak > validStreak) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      } else {
        setStreak(1);
        localStorage.setItem("sinceNow-streak", "1");
      }
      
      localStorage.setItem("sinceNow-lastVisit", today);
    }
  }, []);

  if (streak === 0) return null;

  return (
    <div className="fixed top-6 left-6 z-50">
      <div className={`backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-6 py-3 shadow-lg transition-all duration-500 ${showCelebration ? 'scale-110 border-yellow-400/50 shadow-yellow-500/20' : ''}`}>
        <div className="flex items-center gap-3">
          <Flame className={`h-6 w-6 ${streak >= 7 ? 'text-orange-400' : 'text-yellow-400'} ${showCelebration ? 'animate-pulse' : ''}`} />
          <div>
            <div className="text-2xl font-inter font-bold text-foreground tabular-nums" data-testid="text-streak-count">
              {streak}
            </div>
            <div className="text-xs text-foreground/60 font-inter">Day Streak</div>
          </div>
        </div>
        {showCelebration && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-poppins font-medium text-yellow-400 whitespace-nowrap animate-float">
            🎉 Streak increased!
          </div>
        )}
      </div>
    </div>
  );
}
