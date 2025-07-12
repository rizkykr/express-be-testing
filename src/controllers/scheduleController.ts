import { Request, Response } from "express";
import {
  getUserByIdOrName,
  getShiftForUserOnDate,
  getScheduleForUserInRange,
  getAllUsersScheduleInRange,
} from "../services/scheduleService";
import { exportToCSV } from "../utils/exportUtils";

// ambil data user dengan atau tanpa parameter tanggal
export const getAllSchedulesApi = (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;
  if (!start_date || !end_date) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing start_date or end_date" });
  }

  try {
    const schedules = getAllUsersScheduleInRange(
      String(start_date),
      String(end_date)
    );
    const formattedSchedules = schedules.map((u) => ({
      id: u.id,
      name: u.name,
      schedule: u.schedule,
    }));
    res.json({ status: "success", data: formattedSchedules, http_code: 200 });
  } catch (e) {
    res.status(400).json({ status: "error", message: "Invalid date range" });
  }
};

// ambil jadwal berdasarkan user dan tanggal
export const getUserScheduleApi = (req: Request, res: Response) => {
  const { start_date, end_date, user_id } = req.query;
  if (!start_date || !end_date || !user_id) {
    return res.status(400).json({
      status: "error",
      message: "Missing start_date, end_date, or user_id",
    });
  }

  const foundUser = getUserByIdOrName(String(user_id));
  if (!foundUser) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  try {
    const schedule = getScheduleForUserInRange(
      foundUser,
      String(start_date),
      String(end_date)
    );

    return res.json({
      status: "success",
      data: [{ id: foundUser.id, name: foundUser.name, schedule }],
      http_code: 200,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid date range" });
  }
};

// export data ke CSV
export const exportSchedulesApi = (req: Request, res: Response) => {
  const { start_date, end_date, user_id } = req.query;
  if (!start_date || !end_date)
    return res
      .status(400)
      .json({ status: "error", message: "Missing start_date or end_date" });
  try {
    let data;
    if (user_id) {
      const foundUser = getUserByIdOrName(String(user_id));
      if (!foundUser)
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      const scheduleObj = getScheduleForUserInRange(
        foundUser,
        String(start_date),
        String(end_date)
      );
      data = [
        {
          id: foundUser.id,
          name: foundUser.name,
          schedule: Object.entries(scheduleObj).map(([date, shift]) => ({
            date,
            shift,
          })),
        },
      ];
    } else {
      data = getAllUsersScheduleInRange(
        String(start_date),
        String(end_date)
      ).map((u) => ({
        id: u.id,
        name: u.name,
        schedule: Object.entries(u.schedule).map(([date, shift]) => ({
          date,
          shift,
        })),
      }));
    }
    const csv = exportToCSV(data, String(start_date), String(end_date));
    res.header("Content-Type", "text/csv");
    res.attachment("schedules.csv");
    res.send(csv);
  } catch (e) {
    res.status(400).json({ status: "error", message: "Invalid date range" });
  }
};

// ambil data berdasarkan user dan tanggal
export const checkUserScheduleApi = (req: Request, res: Response) => {
  const { user_id, date } = req.query;
  if (!user_id || !date)
    return res
      .status(400)
      .json({ status: "error", message: "Missing user_id or date" });
  const foundUser = getUserByIdOrName(String(user_id));
  if (!foundUser)
    return res.status(404).json({ status: "error", message: "User not found" });
  try {
    const shift = getShiftForUserOnDate(foundUser, String(date));
    res.json({
      status: "success",
      data: {
        id: foundUser.id,
        name: foundUser.name,
        date,
        shift,
      },
      http_code: 200,
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: "Invalid date" });
  }
};
