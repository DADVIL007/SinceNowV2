import { ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EventCategory } from "./CategoryBadge";

type SortOption = "newest" | "oldest" | "name" | "category";

interface FilterSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterCategory: EventCategory | "all";
  onFilterChange: (category: EventCategory | "all") => void;
}

export function FilterSort({
  sortBy,
  onSortChange,
  filterCategory,
  onFilterChange,
}: FilterSortProps) {
  return (
    <div className="flex gap-2 justify-end mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/20"
            data-testid="button-filter"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="backdrop-blur-3xl bg-white/95 dark:bg-black/95">
          <DropdownMenuItem onClick={() => onFilterChange("all")}>
            All Categories
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("health")}>Health</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("goals")}>Goals</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("relationships")}>
            Relationships
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("fitness")}>Fitness</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("learning")}>Learning</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("career")}>Career</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("other")}>Other</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/20"
            data-testid="button-sort"
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="backdrop-blur-3xl bg-white/95 dark:bg-black/95">
          <DropdownMenuItem onClick={() => onSortChange("newest")}>Newest First</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("oldest")}>Oldest First</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("name")}>By Name</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("category")}>
            By Category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
