import { AchievementBadge, getAchievements } from "../AchievementBadge";

export default function AchievementBadgeExample() {
  const mockAchievements = getAchievements([
    {
      id: "1",
      name: "Test Event",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      mode: "since",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {mockAchievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
