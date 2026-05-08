export type SalesHeroProps = {
  variant?: "mansion" | "house" | "land";
  propertyName: string;
  price: string;
  pricePerTsubo: string;
  imageUrl?: string;
  ctaText?: string;
};

export function SalesHero({
  variant = "mansion",
  propertyName,
  price,
  pricePerTsubo,
  imageUrl,
  ctaText = "資料請求",
}: SalesHeroProps) {
  const variantLabel = {
    mansion: "マンション",
    house: "戸建",
    land: "土地",
  }[variant];

  return (
    <section
      className="relative overflow-hidden rounded border border-charcoal-black/10 bg-charcoal-black p-6 text-washi-white md:p-10"
      style={imageUrl ? { backgroundImage: `linear-gradient(120deg, rgba(44,44,44,.85), rgba(44,44,44,.45)), url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <p className="mb-2 text-xs tracking-[0.2em] text-light-copper">{variantLabel}</p>
      <h2 className="mb-4 font-serif-jp text-2xl md:text-4xl">{propertyName}</h2>
      <p className="font-mono-data text-3xl font-bold text-brass-gold md:text-5xl">{price}</p>
      <p className="mb-6 mt-2 text-sm text-concrete-grey">{pricePerTsubo}</p>
      <button className="rounded bg-light-copper px-5 py-2 text-sm font-bold text-charcoal-black transition-colors hover:bg-brass-gold">
        {ctaText}
      </button>
    </section>
  );
}

export default SalesHero;
