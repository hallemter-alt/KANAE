export type ImportBadgeProps = {
  variant?: "domestic" | "imported" | "inStock" | "madeToOrder";
  origin: string;
};

const labels = {
  domestic: "国内品",
  imported: "輸入品",
  inStock: "在庫あり",
  madeToOrder: "受注生産",
} as const;

const styles = {
  domestic: "bg-celadon-blue text-washi-white",
  imported: "bg-light-copper text-washi-white",
  inStock: "bg-brass-gold text-charcoal-black",
  madeToOrder: "bg-decay-wood text-washi-white",
} as const;

export function ImportBadge({ variant = "domestic", origin }: ImportBadgeProps) {
  return <span className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${styles[variant]}`}>{labels[variant]} · {origin}</span>;
}

export default ImportBadge;
