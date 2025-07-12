"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdOrName = getUserByIdOrName;
exports.getShiftForUserOnDate = getShiftForUserOnDate;
exports.getScheduleForUserInRange = getScheduleForUserInRange;
exports.getAllUsersScheduleInRange = getAllUsersScheduleInRange;
const user_1 = require("../models/user");
const date_fns_1 = require("date-fns");
function getUserByIdOrName(idOrName) {
    const lower = idOrName.toLowerCase();
    return user_1.users.find((u) => u.id === idOrName || u.name.toLowerCase() === lower);
}
function getShiftForUserOnDate(user, date, rangeMonday, patternOffset = 0) {
    const target = (0, date_fns_1.parseISO)(date);
    const base = rangeMonday || (0, date_fns_1.parseISO)(user.startDate);
    const diff = (0, date_fns_1.differenceInCalendarDays)(target, base);
    const idx = (diff + patternOffset) % user.pattern.length;
    return user.pattern[idx];
}
function getScheduleForUserInRange(user, startDate, endDate, patternOffset) {
    const start = (0, date_fns_1.parseISO)(startDate);
    const end = (0, date_fns_1.parseISO)(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
        throw new Error("Invalid date range");
    }
    const days = (0, date_fns_1.differenceInCalendarDays)(end, start) + 1;
    const offset = patternOffset !== undefined
        ? patternOffset
        : user.patternOffset || 0;
    const schedule = {};
    for (let i = 0; i < days; i++) {
        const dateObj = new Date(start.getTime() + i * 86400000);
        const date = (0, date_fns_1.format)(dateObj, "yyyy-MM-dd");
        schedule[date] = user.pattern[(i + offset) % user.pattern.length];
    }
    return schedule;
}
function getAllUsersScheduleInRange(startDate, endDate) {
    return user_1.users.map((user) => ({
        id: user.id,
        name: user.name,
        schedule: getScheduleForUserInRange(user, startDate, endDate, user.patternOffset),
    }));
}
