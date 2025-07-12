"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleService_1 = require("../src/services/scheduleService");
const user_1 = require("../src/models/user");
describe("Schedule Service", () => {
    it("should get correct shift for Ahmad on 2024-12-26 (P)", () => {
        const user = (0, scheduleService_1.getUserByIdOrName)("Ahmad");
        expect((0, scheduleService_1.getShiftForUserOnDate)(user, "2024-12-26")).toBe("P");
    });
    it("should get correct shift for Widi on 2024-12-27 (S)", () => {
        const user = (0, scheduleService_1.getUserByIdOrName)("Widi");
        expect((0, scheduleService_1.getShiftForUserOnDate)(user, "2024-12-27")).toBe("S");
    });
    it("should get correct schedule for Yono in range (object result)", () => {
        const user = (0, scheduleService_1.getUserByIdOrName)("Yono");
        const schedule = (0, scheduleService_1.getScheduleForUserInRange)(user, "2024-12-26", "2025-01-01");
        expect(Object.keys(schedule).length).toBe(7);
        expect(schedule["2024-12-26"]).toBe("M");
        expect(schedule["2025-01-01"]).toBeDefined();
    });
    it("should get all users schedule in range (object result)", () => {
        const all = (0, scheduleService_1.getAllUsersScheduleInRange)("2024-12-26", "2024-12-28");
        expect(all.length).toBe(user_1.users.length);
        expect(Object.keys(all[0].schedule).length).toBe(3);
    });
    it("should get correct schedule for Yohan (14-day pattern)", () => {
        const user = (0, scheduleService_1.getUserByIdOrName)("Yohan");
        const schedule = (0, scheduleService_1.getScheduleForUserInRange)(user, "2025-06-02", "2025-06-08");
        expect(schedule["2025-06-02"]).toBe("L");
        expect(schedule["2025-06-03"]).toBe("P");
        expect(schedule["2025-06-04"]).toBe("P");
        expect(schedule["2025-06-05"]).toBe("P");
        expect(schedule["2025-06-06"]).toBe("S");
        expect(schedule["2025-06-07"]).toBe("P");
        expect(schedule["2025-06-08"]).toBe("L");
    });
    it("should throw error for invalid date range", () => {
        const user = (0, scheduleService_1.getUserByIdOrName)("Ahmad");
        expect(() => (0, scheduleService_1.getScheduleForUserInRange)(user, "2025-01-10", "2025-01-01")).toThrow();
        expect(() => (0, scheduleService_1.getScheduleForUserInRange)(user, "invalid-date", "2025-01-01")).toThrow();
    });
});
