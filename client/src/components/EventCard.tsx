import { useEffect, useState } from "react";
import { Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryBadge, type EventCategory, CATEGORY_CONFIG } from "./CategoryBadge";
import { playMilestoneSound } from "./SoundToggle";

type EventMode = "since" | "until";

interface Event {
  id: string;
  name: string;
  date: Date;
  mode: EventMode;
  category?: EventCategory;
}

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
  onShare: (event: Event) => void;
}

interface TimeDisplay {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MOTIVATIONAL_QUOTES = [
  "Keep going — progress compounds.",
  "Every second you stay consistent counts.",
  "Small steps lead to big changes.",
  "You're stronger than you think.",
  "Consistency is the key to success.",
  "Every day is a new beginning.",
  "Progress, not perfection.",
  "You've got this!",
  "Stay focused on your journey.",
  "Celebrate every milestone.",
];

const MILESTONE_DAYS = [7, 30, 100, 365, 730, 1000];

export function EventCard({ event, onDelete, onShare }: EventCardProps) {
  const [timeDisplay, setTimeDisplay] = useState<TimeDisplay>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [quote] = useState(() => 
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
  );
  const [showMilestone, setShowMilestone] = useState(false);
  const [lastMilestone, setLastMilestone] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const eventDate = new Date(event.date);
      const diffMs = event.mode === "since" 
        ? now.getTime() - eventDate.getTime()
        : eventDate.getTime() - now.getTime();

      const absDiff = Math.abs(diffMs);
      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

      setTimeDisplay({ days, hours, minutes, seconds });

      if (event.mode === "since") {
        const milestone = MILESTONE_DAYS.find(m => m === days);
        if (milestone && milestone !== lastMilestone) {
          setShowMilestone(true);
          setLastMilestone(milestone);
          playMilestoneSound();
          setTimeout(() => setShowMilestone(false), 3000);
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [event, lastMilestone]);

  const getProgressPercentage = () => {
    if (event.mode !== "until") return 0;
    const now = new Date();
    const eventDate = new Date(event.date);
    const total = eventDate.getTime() - now.getTime();
    if (total <= 0) return 100;
    return Math.min(100, Math.max(0, ((eventDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) * 100 / 365));
  };

  const category = event.category || "other";
  const categoryConfig = CATEGORY_CONFIG[category];

  return (
    <div 
      className={`backdrop-blur-3xl bg-white/10 dark:bg-white/5 border ${showMilestone ? 'border-yellow-400/50 shadow-xl shadow-yellow-500/20' : 'border-white/20 dark:border-white/10'} rounded-3xl p-8 shadow-lg hover-elevate transition-all duration-300 group relative overflow-visible hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {showMilestone && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-sm font-poppins font-medium text-white shadow-lg animate-float z-10">
          🎉 {lastMilestone} Days Milestone!
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-poppins font-semibold text-foreground mb-2" data-testid={`text-event-name-${event.id}`}>
            {event.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-inter font-medium bg-primary/20 text-primary">
              {event.mode === "since" ? "Since" : "Until"}
            </span>
            <CategoryBadge category={category} />
          </div>
        </div>
        
        {event.mode === "until" && (
          <div className="relative w-16 h-16 ml-4">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - getProgressPercentage() / 100)}`}
                className="text-primary transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-inter font-semibold text-foreground">
              {Math.round(getProgressPercentage())}%
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-inter font-bold text-foreground tabular-nums" data-testid={`text-days-${event.id}`}>
            {timeDisplay.days}
          </div>
          <div className="text-xs uppercase tracking-wider text-foreground/60 mt-1 font-inter">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-inter font-bold text-foreground tabular-nums" data-testid={`text-hours-${event.id}`}>
            {timeDisplay.hours}
          </div>
          <div className="text-xs uppercase tracking-wider text-foreground/60 mt-1 font-inter">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-inter font-bold text-foreground tabular-nums" data-testid={`text-minutes-${event.id}`}>
            {timeDisplay.minutes}
          </div>
          <div className="text-xs uppercase tracking-wider text-foreground/60 mt-1 font-inter">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-inter font-bold text-foreground tabular-nums" data-testid={`text-seconds-${event.id}`}>
            {timeDisplay.seconds}
          </div>
          <div className="text-xs uppercase tracking-wider text-foreground/60 mt-1 font-inter">Seconds</div>
        </div>
      </div>

      <p className="text-sm italic text-foreground/70 text-center mt-6 mb-4 font-inter" data-testid={`text-quote-${event.id}`}>
        "{quote}"
      </p>

      <div className="flex gap-2 mt-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onShare(event)}
          className="flex-1 rounded-xl"
          data-testid={`button-share-${event.id}`}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(event.id)}
          className="flex-1 rounded-xl"
          data-testid={`button-delete-${event.id}`}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
