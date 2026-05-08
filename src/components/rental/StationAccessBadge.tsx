import { Bus, Car, Footprints } from "lucide-react";

type AccessType = "walk" | "bus" | "car";

export type StationAccessBadgeProps = {
  type?: AccessType;
  minutes: number;
  stationName: string;
};

const iconMap = {
  walk: Footprints,
  bus: Bus,
  car: Car,
} as const;

const labelMap = {
  walk: "徒歩",
  bus: "バス",
  car: "車",
} as const;

export function StationAccessBadge({
  type = "walk",
  minutes,
  stationName,
}: StationAccessBadgeProps) {
  const Icon = iconMap[type];

  return (
    <span className="inline-flex items-center gap-1 rounded bg-brass-gold px-2.5 py-1 text-xs font-semibold text-washi-white">
      <Icon size={12} aria-hidden="true" />
      {stationName} {labelMap[type]}{minutes}分
    </span>
  );
}

export default StationAccessBadge;
