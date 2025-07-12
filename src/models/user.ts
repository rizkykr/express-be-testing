export type ShiftType = "P" | "S" | "M" | "L";

export interface User {
  id: string;
  name: string;
  pattern: ShiftType[];
  patternLength?: number;
  startDate: string;
}

export const users: User[] = [
  {
    id: "001",
    name: "Ahmad",
    pattern: ["P", "P", "S", "S", "M", "M", "L"],
    patternLength: 7,
    startDate: "2024-12-26",
  },
  {
    id: "002",
    name: "Widi",
    pattern: ["S", "S", "M", "M", "L", "P", "S"],
    patternLength: 7,
    startDate: "2024-12-26",
  },
  {
    id: "003",
    name: "Yono",
    pattern: ["M", "M", "P", "L", "P", "P", "M"],
    patternLength: 7,
    startDate: "2024-12-26",
  },
  {
    id: "004",
    name: "Yohan",
    pattern: [
      "L",
      "P",
      "P",
      "P",
      "S",
      "P",
      "L",
      "S",
      "S",
      "P",
      "S",
      "S",
      "P",
      "P",
    ],
    startDate: "2024-12-26",
  },
];
