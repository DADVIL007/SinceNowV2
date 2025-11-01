import { Heart, Target, Sparkles, Dumbbell, BookOpen, Briefcase } from "lucide-react";

export type EventCategory = "health" | "goals" | "relationships" | "fitness" | "learning" | "career" | "other";

interface CategoryBadgeProps {
  category: EventCategory;
  onSelect?: (category: EventCategory) => void;
  selected?: boolean;
}

const CATEGORY_CONFIG = {
  health: {
    icon: Heart,
    label: "Health",
    colors: "from-red-500 to-pink-500",
    bg: "bg-red-500/20",
    text: "text-red-400",
  },
  goals: {
    icon: Target,
    label: "Goals",
    colors: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/20",
    text: "text-blue-400",
  },
  relationships: {
    icon: Sparkles,
    label: "Relationships",
    colors: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/20",
    text: "text-pink-400",
  },
  fitness: {
    icon: Dumbbell,
    label: "Fitness",
    colors: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/20",
    text: "text-orange-400",
  },
  learning: {
    icon: BookOpen,
    label: "Learning",
    colors: "from-purple-500 to-violet-500",
    bg: "bg-purple-500/20",
    text: "text-purple-400",
  },
  career: {
    icon: Briefcase,
    label: "Career",
    colors: "from-green-500 to-emerald-500",
    bg: "bg-green-500/20",
    text: "text-green-400",
  },
  other: {
    icon: Sparkles,
    label: "Other",
    colors: "from-gray-500 to-slate-500",
    bg: "bg-gray-500/20",
    text: "text-gray-400",
  },
};

export function CategoryBadge({ category, onSelect, selected }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  if (onSelect) {
    return (
      <button
        onClick={() => onSelect(category)}
        className={`px-3 py-2 rounded-xl flex items-center gap-2 font-inter text-sm transition-all hover-elevate ${
          selected
            ? `bg-gradient-to-r ${config.colors} text-white`
            : `${config.bg} ${config.text}`
        }`}
        data-testid={`button-category-${category}`}
      >
        <Icon className="h-4 w-4" />
        {config.label}
      </button>
    );
  }

  return (
    <div className={`px-3 py-1 rounded-xl flex items-center gap-2 font-inter text-xs ${config.bg} ${config.text}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  );
}

export { CATEGORY_CONFIG };
