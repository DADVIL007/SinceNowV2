import { FilterSort } from "../FilterSort";
import { useState } from "react";

export default function FilterSortExample() {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name" | "category">("newest");
  const [filterCategory, setFilterCategory] = useState<any>("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8">
      <FilterSort
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
      />
    </div>
  );
}
