import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { CategoryBadge, type EventCategory } from "./CategoryBadge";

type EventMode = "since" | "until";

interface EventFormProps {
  onAddEvent: (event: {
    id: string;
    name: string;
    date: Date;
    mode: EventMode;
    category: EventCategory;
  }) => void;
}

export function EventForm({ onAddEvent }: EventFormProps) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [mode, setMode] = useState<EventMode>("since");
  const [category, setCategory] = useState<EventCategory>("other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventName || !eventDate) return;

    const dateTimeString = eventTime 
      ? `${eventDate}T${eventTime}` 
      : `${eventDate}T12:00`;
    
    const date = new Date(dateTimeString);

    onAddEvent({
      id: crypto.randomUUID(),
      name: eventName,
      date,
      mode,
      category,
    });

    setEventName("");
    setEventDate("");
    setEventTime("");
    setCategory("other");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="text-5xl mb-2 animate-float">✨</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-center mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent leading-tight">
            Track Your Journey
          </h1>
          <p className="text-center text-foreground/80 text-lg md:text-xl mb-2 font-inter">
            Measure moments that matter
          </p>
          <p className="text-center text-foreground/60 font-inter text-sm">
            From achievements to aspirations, every second counts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3 justify-center mb-6">
            <Button
              type="button"
              variant={mode === "since" ? "default" : "secondary"}
              onClick={() => setMode("since")}
              className="flex-1 max-w-[150px]"
              data-testid="button-mode-since"
            >
              Since
            </Button>
            <Button
              type="button"
              variant={mode === "until" ? "default" : "secondary"}
              onClick={() => setMode("until")}
              className="flex-1 max-w-[150px]"
              data-testid="button-mode-until"
            >
              Until
            </Button>
          </div>

          <div>
            <Label htmlFor="event-name" className="text-foreground/90 font-inter mb-2 block">
              Event Name
            </Label>
            <Input
              id="event-name"
              type="text"
              placeholder="e.g., Quit Smoking, Next Birthday, Met My Partner"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/30 dark:border-white/20 text-foreground placeholder:text-foreground/40 rounded-2xl"
              data-testid="input-event-name"
              required
            />
          </div>

          <div>
            <Label className="text-foreground/90 font-inter mb-3 block">
              Category
            </Label>
            <div className="flex flex-wrap gap-2">
              {(["health", "goals", "relationships", "fitness", "learning", "career", "other"] as EventCategory[]).map((cat) => (
                <CategoryBadge
                  key={cat}
                  category={cat}
                  selected={category === cat}
                  onSelect={setCategory}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-date" className="text-foreground/90 font-inter mb-2 block">
                Date
              </Label>
              <div className="relative">
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/30 dark:border-white/20 text-foreground rounded-2xl pl-10"
                  data-testid="input-event-date"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              </div>
            </div>

            <div>
              <Label htmlFor="event-time" className="text-foreground/90 font-inter mb-2 block">
                Time (Optional)
              </Label>
              <Input
                id="event-time"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/30 dark:border-white/20 text-foreground rounded-2xl"
                data-testid="input-event-time"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full py-6 text-lg font-poppins font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105"
            data-testid="button-start-tracking"
          >
            <span className="flex items-center justify-center gap-2">
              <span>✨</span>
              Start Tracking
              <span>✨</span>
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
