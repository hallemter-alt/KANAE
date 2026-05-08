import { AlertTriangle, CheckCircle2, Clock3, Wrench } from "lucide-react";

export type RepairTicketProps = {
  status?: "new" | "inProgress" | "completed" | "urgent";
  ticketNo: string;
  title: string;
  description: string;
  reportedAt: string;
  roomNo: string;
  vendor?: string;
};

const statusStyle = {
  new: "bg-concrete-grey text-rust-iron",
  inProgress: "bg-light-copper text-washi-white",
  completed: "bg-celadon-blue text-washi-white",
  urgent: "bg-red-copper text-washi-white",
} as const;

const statusIcon = {
  new: Clock3,
  inProgress: Wrench,
  completed: CheckCircle2,
  urgent: AlertTriangle,
} as const;

export function RepairTicket({
  status = "new",
  ticketNo,
  title,
  description,
  reportedAt,
  roomNo,
  vendor,
}: RepairTicketProps) {
  const Icon = statusIcon[status];

  return (
    <article className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono-data text-xs text-rust-iron">{ticketNo}</span>
        <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${statusStyle[status]}`}><Icon size={12} /> {status}</span>
      </div>
      <h3 className="font-serif-jp text-lg text-charcoal-black">{title}</h3>
      <p className="mt-1 text-sm text-rust-iron">{description}</p>
      <p className="mt-3 text-xs text-rust-iron">{reportedAt} / {roomNo} / {vendor ?? "未割当"}</p>
    </article>
  );
}

export default RepairTicket;
