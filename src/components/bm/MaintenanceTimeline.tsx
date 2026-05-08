export type MaintenanceEvent = {
  date: string;
  title: string;
  status: "planned" | "inProgress" | "done";
};

export type MaintenanceTimelineProps = {
  events: MaintenanceEvent[];
  year: string;
};

export function MaintenanceTimeline({ events, year }: MaintenanceTimelineProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">修繕タイムライン {year}</h3>
      <ol className="space-y-3 border-l-2 border-concrete-grey pl-4">
        {events.map((event) => (
          <li key={`${event.date}-${event.title}`}>
            <p className="text-xs text-rust-iron">{event.date}</p>
            <p className="text-sm font-semibold text-charcoal-black">{event.title}</p>
            <p className="text-xs text-decay-wood">{event.status}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default MaintenanceTimeline;
