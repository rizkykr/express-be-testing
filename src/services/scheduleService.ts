import { User, ShiftType, users } from "../models/user";
import { format, differenceInCalendarDays, parseISO } from "date-fns";

export function getUserByIdOrName(idOrName: string): User | undefined {
  const lower = idOrName.toLowerCase();
  return users.find((u) => u.id === idOrName || u.name.toLowerCase() === lower);
}

export function getShiftForUserOnDate(
  user: User,
  date: string,
  rangeMonday?: Date,
  patternOffset: number = 0
): ShiftType {
  const target = parseISO(date);
  const base = rangeMonday || parseISO(user.startDate);
  const diff = differenceInCalendarDays(target, base);
  const idx = (diff + patternOffset) % user.pattern.length;
  return user.pattern[idx] as ShiftType;
}

export function getScheduleForUserInRange(
  user: User,
  startDate: string,
  endDate: string,
  patternOffset?: number
) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
    throw new Error("Invalid date range");
  }
  const days = differenceInCalendarDays(end, start) + 1;
  const offset =
    patternOffset !== undefined
      ? patternOffset
      : (user as any).patternOffset || 0;
  const schedule: { [date: string]: ShiftType } = {};
  for (let i = 0; i < days; i++) {
    const dateObj = new Date(start.getTime() + i * 86400000);
    const date = format(dateObj, "yyyy-MM-dd");
    schedule[date] = user.pattern[
      (i + offset) % user.pattern.length
    ] as ShiftType;
  }
  return schedule;
}

export function getAllUsersScheduleInRange(startDate: string, endDate: string) {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    schedule: getScheduleForUserInRange(
      user,
      startDate,
      endDate,
      (user as any).patternOffset
    ),
  }));
}
