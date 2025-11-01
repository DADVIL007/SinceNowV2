import { useEffect, useState } from "react";
import { EventForm } from "@/components/EventForm";
import { EventCard } from "@/components/EventCard";
import { ShareModal } from "@/components/ShareModal";
import { ThemeToggle } from "@/components/ThemeToggle";

type EventMode = "since" | "until";

interface Event {
  id: string;
  name: string;
  date: Date;
  mode: EventMode;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [shareEvent, setShareEvent] = useState<Event | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sinceNow-events");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const eventsWithDates = parsed.map((e: any) => ({
          ...e,
          date: new Date(e.date),
        }));
        setEvents(eventsWithDates);
      } catch (error) {
        console.error("Failed to parse stored events:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("sinceNow-events", JSON.stringify(events));
    }
  }, [events]);

  const handleAddEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleShareEvent = (event: Event) => {
    setShareEvent(event);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950 animate-gradient-shift bg-[length:400%_400%]" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="mb-16">
            <EventForm onAddEvent={handleAddEvent} />
          </div>

          {events.length === 0 ? (
            <div className="text-center py-20">
              <div className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6 animate-float">⏰</div>
                <h2 className="text-2xl font-poppins font-semibold text-foreground mb-3">
                  Your journey starts here
                </h2>
                <p className="text-foreground/70 font-inter">
                  Add your first moment above to begin tracking what matters most.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onDelete={handleDeleteEvent}
                  onShare={handleShareEvent}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="relative z-10 text-center py-8 text-foreground/50 font-inter text-sm">
          <p>SinceNow · Every second tells your story</p>
        </footer>
      </div>

      {shareEvent && (
        <ShareModal
          event={shareEvent}
          onClose={() => setShareEvent(null)}
        />
      )}
    </div>
  );
}
