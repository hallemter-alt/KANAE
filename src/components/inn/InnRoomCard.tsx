export type InnRoomCardProps = {
  variant?: "standard" | "deluxe" | "suite";
  roomName: string;
  price: string;
  capacity: string;
  features: string[];
  imageUrl?: string;
};

export function InnRoomCard({
  variant = "standard",
  roomName,
  price,
  capacity,
  features,
  imageUrl,
}: InnRoomCardProps) {
  return (
    <article className="overflow-hidden rounded border border-charcoal-black/10 bg-brick-white shadow-subtle-line">
      <div
        className="h-44 bg-concrete-grey/50"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      />
      <div className="space-y-2 p-4">
        <p className="text-xs tracking-widest text-decay-wood">{variant.toUpperCase()}</p>
        <h3 className="font-serif-jp text-lg text-charcoal-black">{roomName}</h3>
        <p className="font-mono-data text-xl text-light-copper">{price} / 泊</p>
        <p className="text-sm text-rust-iron">定員 {capacity}</p>
        <div className="flex flex-wrap gap-1">
          {features.map((feature) => <span key={feature} className="rounded bg-concrete-grey px-2 py-1 text-xs text-rust-iron">{feature}</span>)}
        </div>
      </div>
    </article>
  );
}

export default InnRoomCard;
