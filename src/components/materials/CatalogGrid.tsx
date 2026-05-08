import ImportBadge from "@/components/materials/ImportBadge";

export type CatalogProduct = {
  id: string;
  name: string;
  modelNo: string;
  price: string;
  origin: string;
  variant?: "domestic" | "imported" | "inStock" | "madeToOrder";
};

export type CatalogGridProps = {
  products: CatalogProduct[];
  columns?: 1 | 2 | 3;
};

export function CatalogGrid({ products, columns = 3 }: CatalogGridProps) {
  const colClass = columns === 1 ? "md:grid-cols-1" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">建材カタログ</h3>
      <div className={`grid gap-3 ${colClass}`}>
        {products.map((product) => (
          <article key={product.id} className="rounded border border-concrete-grey bg-washi-white p-3">
            <h4 className="font-serif-jp text-base text-charcoal-black">{product.name}</h4>
            <p className="text-xs text-rust-iron">{product.modelNo}</p>
            <p className="mt-2 font-mono-data text-sm text-charcoal-black">{product.price}</p>
            <div className="mt-2"><ImportBadge variant={product.variant} origin={product.origin} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CatalogGrid;
