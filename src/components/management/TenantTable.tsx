export type TenantRecord = {
  roomNo: string;
  name: string;
  rent: number;
  status: "occupied" | "notice" | "vacant";
};

export type TenantTableProps = {
  data: TenantRecord[];
  sortable?: boolean;
};

export function TenantTable({ data, sortable = false }: TenantTableProps) {
  const sorted = sortable
    ? [...data].sort((a, b) => a.roomNo.localeCompare(b.roomNo, "ja"))
    : data;

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">入居者一覧</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-concrete-grey text-left text-rust-iron">
              <th className="px-2 py-2">部屋</th><th className="px-2 py-2">入居者</th><th className="px-2 py-2">賃料</th><th className="px-2 py-2">状態</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={`${row.roomNo}-${row.name}`} className="border-b border-concrete-grey/50">
                <td className="px-2 py-2 font-mono-data">{row.roomNo}</td>
                <td className="px-2 py-2">{row.name}</td>
                <td className="px-2 py-2 font-mono-data">¥{row.rent.toLocaleString()}</td>
                <td className="px-2 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TenantTable;
