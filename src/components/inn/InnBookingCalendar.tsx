export type InnBookingCalendarProps = {
  yearMonth: string;
  bookedDates: string[];
  selectedDate?: string;
};

export function InnBookingCalendar({
  yearMonth,
  bookedDates,
  selectedDate,
}: InnBookingCalendarProps) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">予約カレンダー {yearMonth}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((day) => {
          const fullDate = `${yearMonth}-${String(day).padStart(2, "0")}`;
          const isBooked = bookedDates.includes(fullDate);
          const isSelected = selectedDate === fullDate;
          return (
            <div key={fullDate} className={`rounded px-1 py-2 ${isSelected ? "bg-light-copper text-washi-white" : isBooked ? "bg-red-copper/20 text-red-copper" : "bg-washi-white text-charcoal-black"}`}>
              {day}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default InnBookingCalendar;
