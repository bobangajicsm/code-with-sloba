// app/posts/[category]/FilterBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./filter-bar.module.scss";

interface FilterBarProps {
  currentSort: string;
  currentDifficulty?: string;
  currentSearch: string;
}

export default function FilterBar({
  currentSort,
  currentDifficulty,
  currentSearch,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams || "");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    updateFilters({ sort: newSort });
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    updateFilters({
      difficulty: newDifficulty === "all" ? null : newDifficulty,
    });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;

    updateFilters({
      search: searchQuery || null,
    });
  };

  return (
    <div className={styles.filterBar}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="search"
          name="search"
          placeholder="Search posts..."
          defaultValue={currentSearch}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort">Sort:</label>
          <select
            id="sort"
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={currentDifficulty || "all"}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
}
