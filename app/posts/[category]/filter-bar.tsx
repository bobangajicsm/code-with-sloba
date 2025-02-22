"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./filter-bar.module.scss";
import CustomSelect from "@/app/components/select/select";

interface FilterBarProps {
  currentSort: string;
  currentDifficulty?: string;
  currentSearch: string;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const difficultyOptions = [
  { value: "all", label: "All Levels" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

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
    <>
      <h3 className={styles.title}>Search what you want to learn</h3>
      <div className={styles.filterBar}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchGroup}>
            <Search className={styles.searchIcon} />
            <input
              type="search"
              name="search"
              placeholder="Type ..."
              defaultValue={currentSearch}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterControls}>
            <button type="submit" className={styles.searchButton}>
              <Search width={13} className={styles.searchButtonIcon} />
              Search
            </button>
            <CustomSelect
              options={sortOptions}
              value={currentSort}
              onChange={handleSortChange}
              placeholder="Select sorting..."
              className={styles.filterSelect}
            />
            <CustomSelect
              options={difficultyOptions}
              value={currentDifficulty || "all"}
              onChange={handleDifficultyChange}
              placeholder="Select difficulty..."
              className={styles.filterSelect}
            />
          </div>
        </form>
      </div>
    </>
  );
}
