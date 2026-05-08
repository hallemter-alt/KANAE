type Coordinates = [number, number];

type Marker = {
  id: string;
  label: string;
  coordinates: Coordinates;
};

export type PropertyMapProps = {
  center: Coordinates;
  zoom: number;
  properties: Marker[];
  stations: Marker[];
  facilities: Marker[];
  showRoute?: boolean;
  radiusMeters?: number;
  theme?: "light" | "monochrome" | "satellite";
};

function markerPosition(coords: Coordinates) {
  const [lng, lat] = coords;
  return {
    left: `${Math.max(5, Math.min(95, 50 + lng * 10))}%`,
    top: `${Math.max(5, Math.min(95, 50 - lat * 10))}%`,
  };
}

export function PropertyMap({
  center,
  zoom,
  properties,
  stations,
  facilities,
  showRoute = false,
  radiusMeters = 800,
  theme = "light",
}: PropertyMapProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <div className="mb-3 flex items-center justify-between text-xs text-rust-iron">
        <p>中心: {center[0]}, {center[1]} / Zoom {zoom}</p>
        <p>{theme} · 半径 {radiusMeters}m</p>
      </div>
      <div className={`relative h-72 overflow-hidden rounded border ${theme === "satellite" ? "bg-charcoal-black" : "bg-concrete-grey/40"}`}>
        {[...properties, ...stations, ...facilities].map((marker) => (
          <span
            key={marker.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-washi-white bg-light-copper px-2 py-1 text-[10px] text-washi-white"
            style={markerPosition(marker.coordinates)}
          >
            {marker.label}
          </span>
        ))}
        {showRoute ? <div className="absolute inset-x-8 top-1/2 h-0.5 -translate-y-1/2 bg-brass-gold/80" /> : null}
      </div>
    </section>
  );
}

export default PropertyMap;
