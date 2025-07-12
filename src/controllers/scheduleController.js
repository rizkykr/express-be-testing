"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserScheduleApi = exports.exportSchedulesApi = exports.getUserScheduleApi = exports.getAllSchedulesApi = void 0;
const scheduleService_1 = require("../services/scheduleService");
const exportUtils_1 = require("../utils/exportUtils");
// ambil data user dengan atau tanpa parameter tanggal
const getAllSchedulesApi = (req, res) => {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
        return res
            .status(400)
            .json({ status: "error", message: "Missing start_date or end_date" });
    }
    try {
        const schedules = (0, scheduleService_1.getAllUsersScheduleInRange)(String(start_date), String(end_date));
        const formattedSchedules = schedules.map((u) => ({
            id: u.id,
            name: u.name,
            schedule: u.schedule,
        }));
        res.json({ status: "success", data: formattedSchedules, http_code: 200 });
    }
    catch (e) {
        res.status(400).json({ status: "error", message: "Invalid date range" });
    }
};
exports.getAllSchedulesApi = getAllSchedulesApi;
// ambil jadwal berdasarkan user dan tanggal
const getUserScheduleApi = (req, res) => {
    const { start_date, end_date, user_id } = req.query;
    if (!start_date || !end_date || !user_id) {
        return res.status(400).json({
            status: "error",
            message: "Missing start_date, end_date, or user_id",
        });
    }
    const foundUser = (0, scheduleService_1.getUserByIdOrName)(String(user_id));
    if (!foundUser) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    try {
        const schedule = (0, scheduleService_1.getScheduleForUserInRange)(foundUser, String(start_date), String(end_date));
        return res.json({
            status: "success",
            data: [{ id: foundUser.id, name: foundUser.name, schedule }],
            http_code: 200,
        });
    }
    catch (e) {
        return res
            .status(400)
            .json({ status: "error", message: "Invalid date range" });
    }
};
exports.getUserScheduleApi = getUserScheduleApi;
// export data ke CSV
const exportSchedulesApi = (req, res) => {
    const { start_date, end_date, user_id } = req.query;
    if (!start_date || !end_date)
        return res
            .status(400)
            .json({ status: "error", message: "Missing start_date or end_date" });
    try {
        let data;
        if (user_id) {
            const foundUser = (0, scheduleService_1.getUserByIdOrName)(String(user_id));
            if (!foundUser)
                return res
                    .status(404)
                    .json({ status: "error", message: "User not found" });
            const scheduleObj = (0, scheduleService_1.getScheduleForUserInRange)(foundUser, String(start_date), String(end_date));
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
        }
        else {
            data = (0, scheduleService_1.getAllUsersScheduleInRange)(String(start_date), String(end_date)).map((u) => ({
                id: u.id,
                name: u.name,
                schedule: Object.entries(u.schedule).map(([date, shift]) => ({
                    date,
                    shift,
                })),
            }));
        }
        const csv = (0, exportUtils_1.exportToCSV)(data, String(start_date), String(end_date));
        res.header("Content-Type", "text/csv");
        res.attachment("schedules.csv");
        res.send(csv);
    }
    catch (e) {
        res.status(400).json({ status: "error", message: "Invalid date range" });
    }
};
exports.exportSchedulesApi = exportSchedulesApi;
// ambil data berdasarkan user dan tanggal
const checkUserScheduleApi = (req, res) => {
    const { user_id, date } = req.query;
    if (!user_id || !date)
        return res
            .status(400)
            .json({ status: "error", message: "Missing user_id or date" });
    const foundUser = (0, scheduleService_1.getUserByIdOrName)(String(user_id));
    if (!foundUser)
        return res.status(404).json({ status: "error", message: "User not found" });
    try {
        const shift = (0, scheduleService_1.getShiftForUserOnDate)(foundUser, String(date));
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
    }
    catch (e) {
        res.status(400).json({ status: "error", message: "Invalid date" });
    }
};
exports.checkUserScheduleApi = checkUserScheduleApi;
