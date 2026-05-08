import ImportBadge from "@/components/materials/ImportBadge";

export type MaterialSpecSheetProps = {
  productName: string;
  modelNo: string;
  specs: Array<{ label: string; value: string }>;
  isImported?: boolean;
  origin: string;
  imageUrl?: string;
};

export function MaterialSpecSheet({
  productName,
  modelNo,
  specs,
  isImported = false,
  origin,
  imageUrl,
}: MaterialSpecSheetProps) {
  return (
    <article className="grid gap-4 rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line md:grid-cols-[200px_1fr]">
      <div className="overflow-hidden rounded border border-concrete-grey bg-washi-white">
        <div className="h-40 w-full bg-concrete-grey/30" style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined} />
      </div>
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h3 className="font-serif-jp text-lg text-charcoal-black">{productName}</h3>
          <ImportBadge variant={isImported ? "imported" : "domestic"} origin={origin} />
        </div>
        <p className="mb-3 font-mono-data text-xs text-rust-iron">{modelNo}</p>
        <dl className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-rust-iron">{spec.label}</dt>
              <dd className="text-charcoal-black">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default MaterialSpecSheet;
