type BusinessLine = {
  id: string;
  name: string;
  count: number;
};

type QuickFilter = {
  id: string;
  label: string;
};

type SearchResult = {
  id: string;
  title: string;
  type: string;
  location: string;
};

export type PropertyDatabaseHubProps = {
  businessLines: BusinessLine[];
  quickFilters: QuickFilter[];
  searchResults: SearchResult[];
  searchQuery?: string;
};

export function PropertyDatabaseHub({
  businessLines,
  quickFilters,
  searchResults,
  searchQuery = "",
}: PropertyDatabaseHubProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">不動産データベース</h3>
      <p className="mb-3 rounded border border-concrete-grey bg-washi-white px-3 py-2 text-sm text-rust-iron">検索: {searchQuery || "キーワード未入力"}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <span key={filter.id} className="rounded bg-concrete-grey px-2 py-1 text-xs text-rust-iron">{filter.label}</span>
        ))}
      </div>
      <div className="mb-3 grid gap-2 md:grid-cols-3">
        {businessLines.map((line) => (
          <div key={line.id} className="rounded border border-concrete-grey bg-washi-white px-3 py-2 text-sm text-charcoal-black">
            {line.name} <span className="font-mono-data text-rust-iron">({line.count})</span>
          </div>
        ))}
      </div>
      <ul className="space-y-2">
        {searchResults.map((result) => (
          <li key={result.id} className="rounded border border-concrete-grey bg-washi-white px-3 py-2">
            <p className="text-sm font-semibold text-charcoal-black">{result.title}</p>
            <p className="text-xs text-rust-iron">{result.type} · {result.location}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PropertyDatabaseHub;
