import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export default function Calendar02() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(Date.now()),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      numberOfMonths={1}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-sm"
    />
  );
}
