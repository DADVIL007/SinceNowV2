import { AchievementsModal } from "../AchievementsModal";

export default function AchievementsModalExample() {
  const mockEvents = [
    {
      id: "1",
      name: "Test Event",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      mode: "since",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      <AchievementsModal events={mockEvents} onClose={() => console.log("Close")} />
    </div>
  );
}
