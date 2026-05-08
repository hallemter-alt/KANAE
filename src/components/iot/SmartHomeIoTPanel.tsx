import { AlertTriangle, Wifi } from "lucide-react";

type Device = {
  id: string;
  name: string;
  type: string;
  online: boolean;
  status: string;
};

export type SmartHomeIoTPanelProps = {
  propertyId: string;
  propertyName: string;
  devices: Device[];
  role?: "admin" | "tenant" | "guest";
  alertCount?: number;
};

export function SmartHomeIoTPanel({
  propertyId,
  propertyName,
  devices,
  role = "tenant",
  alertCount = 0,
}: SmartHomeIoTPanelProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-serif-jp text-lg text-charcoal-black">{propertyName}</h3>
          <p className="text-xs text-rust-iron">{propertyId} · {role}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded bg-red-copper/10 px-2 py-1 text-xs text-red-copper"><AlertTriangle size={12} /> {alertCount} alerts</span>
      </div>
      <ul className="space-y-2">
        {devices.map((device) => (
          <li key={device.id} className="flex items-center justify-between rounded border border-concrete-grey bg-washi-white px-3 py-2 text-sm">
            <span>{device.name} <span className="text-xs text-rust-iron">({device.type})</span></span>
            <span className={`inline-flex items-center gap-1 text-xs ${device.online ? "text-celadon-blue" : "text-red-copper"}`}><Wifi size={12} /> {device.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SmartHomeIoTPanel;
