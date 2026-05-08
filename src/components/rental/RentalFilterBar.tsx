"use client";

export type ActiveFilter = {
  key: string;
  label: string;
  value: string;
};

export type RentalFilterBarProps = {
  activeFilters?: ActiveFilter[];
  onFilterChange?: (filter: ActiveFilter) => void;
  onClear?: () => void;
};

const quickFilters: ActiveFilter[] = [
  { key: "walk", label: "徒歩10分以内", value: "10" },
  { key: "pets", label: "ペット可", value: "yes" },
  { key: "new", label: "築10年以内", value: "10y" },
  { key: "family", label: "2LDK以上", value: "2ldk" },
];

export function RentalFilterBar({
  activeFilters = [],
  onFilterChange,
  onClear,
}: RentalFilterBarProps) {
  const activeKeys = new Set(activeFilters.map((filter) => `${filter.key}:${filter.value}`));

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif-jp text-base font-semibold text-charcoal-black">賃貸検索フィルター</h3>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-decay-wood underline-offset-2 hover:underline"
        >
          クリア
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => {
          const isActive = activeKeys.has(`${filter.key}:${filter.value}`);
          return (
            <button
              type="button"
              key={`${filter.key}-${filter.value}`}
              onClick={() => onFilterChange?.(filter)}
              className={`rounded px-3 py-1.5 text-xs transition-colors ${isActive ? "bg-light-copper text-washi-white" : "bg-concrete-grey text-rust-iron hover:bg-concrete-grey/80"}`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default RentalFilterBar;
