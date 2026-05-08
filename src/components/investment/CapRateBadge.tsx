export type CapRateBadgeProps = {
  variant?: "high" | "medium" | "low" | "targetAchieved";
  value: number;
  target?: number;
};

const variantClass: Record<NonNullable<CapRateBadgeProps["variant"]>, string> = {
  high: "bg-light-copper text-washi-white",
  medium: "bg-decay-wood text-washi-white",
  low: "bg-concrete-grey text-rust-iron",
  targetAchieved: "bg-brass-gold text-charcoal-black",
};

export function CapRateBadge({ variant = "medium", value, target }: CapRateBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded px-2.5 py-1 text-xs font-semibold ${variantClass[variant]}`}>
      利回り {value.toFixed(1)}%
      {typeof target === "number" ? <span className="opacity-80">/ 目標 {target.toFixed(1)}%</span> : null}
    </span>
  );
}

export default CapRateBadge;
