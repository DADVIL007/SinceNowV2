import { Award, Flame, Star, Trophy, Zap, Crown } from "lucide-react";

interface Achievement {
  id: string;
  icon: typeof Award;
  title: string;
  description: string;
  unlocked: boolean;
  gradient: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const Icon = achievement.icon;

  return (
    <div
      className={`relative group backdrop-blur-xl rounded-2xl p-4 transition-all duration-300 ${
        achievement.unlocked
          ? `bg-gradient-to-br ${achievement.gradient} border border-white/30 hover-elevate`
          : "bg-white/5 border border-white/10 opacity-50"
      }`}
      data-testid={`badge-${achievement.id}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            achievement.unlocked ? "bg-white/20" : "bg-white/5"
          }`}
        >
          <Icon className={`h-6 w-6 ${achievement.unlocked ? "text-white" : "text-white/30"}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-poppins font-semibold text-sm text-foreground">
            {achievement.title}
          </h4>
          <p className="text-xs text-foreground/70 font-inter">{achievement.description}</p>
        </div>
      </div>
      {achievement.unlocked && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );
}

export function getAchievements(events: any[]): Achievement[] {
  const totalDays = events.reduce((acc, event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const diffMs = event.mode === "since"
      ? now.getTime() - eventDate.getTime()
      : eventDate.getTime() - now.getTime();
    return acc + Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }, 0);

  const storedStreak = localStorage.getItem("sinceNow-streak") || "0";
  const maxStreak = parseInt(storedStreak, 10);
  const validMaxStreak = isNaN(maxStreak) ? 0 : maxStreak;
  const eventCount = events.length;
  const hasWeekEvent = events.some((e) => {
    const days = Math.abs(
      Math.floor((new Date().getTime() - new Date(e.date).getTime()) / (1000 * 60 * 60 * 24))
    );
    return days >= 7;
  });

  return [
    {
      id: "first-event",
      icon: Star,
      title: "First Step",
      description: "Created your first event",
      unlocked: eventCount >= 1,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "week-tracker",
      icon: Flame,
      title: "Week Warrior",
      description: "Tracked an event for 7 days",
      unlocked: hasWeekEvent,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "five-events",
      icon: Award,
      title: "Multi-Tasker",
      description: "Track 5 events simultaneously",
      unlocked: eventCount >= 5,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "week-streak",
      icon: Zap,
      title: "Consistent Tracker",
      description: "7-day login streak",
      unlocked: validMaxStreak >= 7,
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      id: "hundred-days",
      icon: Trophy,
      title: "Centurion",
      description: "Track 100+ total days",
      unlocked: totalDays >= 100,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "master",
      icon: Crown,
      title: "Master Tracker",
      description: "Track 1000+ total days",
      unlocked: totalDays >= 1000,
      gradient: "from-violet-500 to-purple-500",
    },
  ];
}
