import StationAccessBadge from "@/components/rental/StationAccessBadge";

type RentalVariant = "default" | "hover" | "reserved" | "newArrival";

export type RentalCardProps = {
  variant?: RentalVariant;
  propertyName: string;
  rentPrice: string;
  stationWalk: number;
  buildingAge: number;
  area: string;
  imageUrl?: string;
};

export function RentalCard({
  variant = "default",
  propertyName,
  rentPrice,
  stationWalk,
  buildingAge,
  area,
  imageUrl,
}: RentalCardProps) {
  const isReserved = variant === "reserved";

  return (
    <article className={`overflow-hidden rounded border bg-brick-white shadow-subtle-line transition-all duration-300 ${isReserved ? "border-celadon-blue/40 opacity-70" : "border-charcoal-black/10 hover:border-light-copper hover:shadow-card-hover"}`}>
      <div
        className="relative h-44 bg-concrete-grey/50"
        style={imageUrl ? { backgroundImage: `linear-gradient(to top, rgba(44,44,44,.45), transparent), url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className="absolute left-3 top-3">
          <StationAccessBadge stationName="最寄駅" minutes={stationWalk} />
        </div>
        {variant === "newArrival" ? (
          <span className="absolute right-3 top-3 rounded bg-light-copper px-2 py-1 text-[10px] font-bold tracking-wider text-washi-white">NEW</span>
        ) : null}
        {isReserved ? (
          <span className="absolute bottom-3 left-3 rounded bg-celadon-blue px-2 py-1 text-[10px] font-bold tracking-wider text-washi-white">内見予約済み</span>
        ) : null}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="font-serif-jp text-lg text-charcoal-black">{propertyName}</h3>
        <p className="font-mono-data text-2xl font-bold text-light-copper">{rentPrice}</p>
        <p className="text-sm text-rust-iron">築{buildingAge}年 / {area}</p>
      </div>
    </article>
  );
}

export default RentalCard;
