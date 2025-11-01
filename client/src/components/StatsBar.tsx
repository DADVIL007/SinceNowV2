import { Calendar, Target, Trophy } from "lucide-react";

type EventMode = "since" | "until";

interface Event {
  id: string;
  name: string;
  date: Date;
  mode: EventMode;
}

interface StatsBarProps {
  events: Event[];
}

export function StatsBar({ events }: StatsBarProps) {
  if (events.length === 0) return null;

  const totalDays = events.reduce((acc, event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const diffMs = event.mode === "since"
      ? now.getTime() - eventDate.getTime()
      : eventDate.getTime() - now.getTime();
    return acc + Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }, 0);

  const sinceCount = events.filter(e => e.mode === "since").length;
  const untilCount = events.filter(e => e.mode === "until").length;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="text-3xl font-inter font-bold text-foreground tabular-nums" data-testid="text-total-days">
                {totalDays.toLocaleString()}
              </div>
              <div className="text-sm text-foreground/60 font-inter">Total Days Tracked</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-inter font-bold text-foreground tabular-nums" data-testid="text-since-count">
                {sinceCount}
              </div>
              <div className="text-sm text-foreground/60 font-inter">Since Events</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <div className="text-3xl font-inter font-bold text-foreground tabular-nums" data-testid="text-until-count">
                {untilCount}
              </div>
              <div className="text-sm text-foreground/60 font-inter">Until Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
