import { EventForm } from "../EventForm";

export default function EventFormExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8 flex items-center justify-center">
      <EventForm onAddEvent={(event) => console.log("Event added:", event)} />
    </div>
  );
}
