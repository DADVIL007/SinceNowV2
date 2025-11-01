import { StatsBar } from "../StatsBar";

export default function StatsBarExample() {
  const mockEvents = [
    {
      id: "1",
      name: "Started Learning Guitar",
      date: new Date(Date.now() - 183 * 24 * 60 * 60 * 1000),
      mode: "since" as const,
    },
    {
      id: "2",
      name: "Next Birthday",
      date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      mode: "until" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8 flex items-center justify-center">
      <StatsBar events={mockEvents} />
    </div>
  );
}
