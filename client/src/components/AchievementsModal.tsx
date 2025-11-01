import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AchievementBadge, getAchievements } from "./AchievementBadge";

interface AchievementsModalProps {
  events: any[];
  onClose: () => void;
}

export function AchievementsModal({ events, onClose }: AchievementsModalProps) {
  const achievements = getAchievements(events);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-poppins font-bold text-foreground">Achievements</h2>
            <p className="text-foreground/70 font-inter mt-1">
              {unlockedCount} of {achievements.length} unlocked
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="rounded-full"
            data-testid="button-close-achievements"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}
