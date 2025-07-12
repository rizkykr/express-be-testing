import { format, parseISO } from "date-fns";
import { ShiftType } from "../models/user";

interface UserSchedule {
  id: string;
  name: string;
  schedule: { date: string; shift: ShiftType }[];
}

export function exportToCSV(
  data: UserSchedule[],
  start: string,
  end: string
): string {
  const dates: string[] = [];
  let current = parseISO(start);
  const endDate = parseISO(end);
  const oneDay = 86400000;

  while (current <= endDate) {
    dates.push(format(current, "yyyy/MM/dd"));
    current = new Date(current.getTime() + oneDay);
  }

  const csvLines = data.map((user) => {
    const scheduleMap = new Map(
      user.schedule.map((s) => [
        format(parseISO(s.date), "yyyy/MM/dd"),
        s.shift,
      ])
    );
    const row = [
      user.id,
      user.name,
      ...dates.map((d) => scheduleMap.get(d) || ""),
    ];
    return row.join(",");
  });

  return ["ID,Nama," + dates.join(","), ...csvLines].join("\n");
}
