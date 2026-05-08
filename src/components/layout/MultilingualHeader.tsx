type Locale = "ja" | "en" | "zh";

type MultilingualHeaderProps = {
  locale?: Locale;
  title?: string;
  children?: React.ReactNode;
};

export function MultilingualHeader({
  locale = "ja",
  title = "KANAE",
  children,
}: MultilingualHeaderProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4">
      <p className="text-xs text-rust-iron">Locale: {locale.toUpperCase()}</p>
      <h3 className="font-serif-jp text-lg text-charcoal-black">{title}</h3>
      {children ? <div className="mt-3">{children}</div> : null}
    </section>
  );
}

export default MultilingualHeader;
