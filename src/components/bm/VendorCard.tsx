import { Star } from "lucide-react";

export type VendorCardProps = {
  name: string;
  specialty: string;
  rating: number;
  tags: string[];
  contact: string;
};

export function VendorCard({ name, specialty, rating, tags, contact }: VendorCardProps) {
  const stars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <article className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="font-serif-jp text-lg text-charcoal-black">{name}</h3>
      <p className="text-sm text-rust-iron">{specialty}</p>
      <div className="mt-2 flex items-center gap-1 text-brass-gold">
        {Array.from({ length: stars }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((tag) => <span key={tag} className="rounded bg-concrete-grey px-2 py-1 text-xs text-rust-iron">{tag}</span>)}
      </div>
      <p className="mt-3 text-xs text-rust-iron">{contact}</p>
    </article>
  );
}

export default VendorCard;
