import { EventCard } from "../EventCard";

export default function EventCardExample() {
  const mockEvent = {
    id: "1",
    name: "Started Learning Guitar",
    date: new Date(Date.now() - 183 * 24 * 60 * 60 * 1000),
    mode: "since" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <EventCard
          event={mockEvent}
          onDelete={(id) => console.log("Delete event:", id)}
          onShare={(event) => console.log("Share event:", event)}
        />
      </div>
    </div>
  );
}
