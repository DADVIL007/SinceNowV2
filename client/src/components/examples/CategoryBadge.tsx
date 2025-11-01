import { CategoryBadge, type EventCategory } from "../CategoryBadge";
import { useState } from "react";

export default function CategoryBadgeExample() {
  const [selected, setSelected] = useState<EventCategory>("health");

  const categories: EventCategory[] = ["health", "goals", "relationships", "fitness", "learning", "career", "other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-poppins font-semibold text-white mb-4">Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryBadge
                key={cat}
                category={cat}
                selected={selected === cat}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>

        <div className="backdrop-blur-3xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-poppins font-semibold text-white mb-4">Display Only</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
