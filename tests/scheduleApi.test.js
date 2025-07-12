"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
describe("Schedule API", () => {
    it("GET /api/schedules?user_id=Ahmad&start_date=2024-12-26&end_date=2024-12-26 returns correct shift", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/schedules?user_id=Ahmad&start_date=2024-12-26&end_date=2024-12-26");
        expect(res.status).toBe(200);
        const data = Array.isArray(res.body.data)
            ? res.body.data[0]
            : res.body.data;
        expect(data.schedule["2024-12-26"]).toBe("P");
    }));
    it("GET /api/schedules?user_id=Widi&start_date=2024-12-26&end_date=2024-12-28 returns schedule as object", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/schedules?user_id=Widi&start_date=2024-12-26&end_date=2024-12-28");
        expect(res.status).toBe(200);
        const data = Array.isArray(res.body.data)
            ? res.body.data[0]
            : res.body.data;
        expect(data.schedule).toBeDefined();
        expect(Object.keys(data.schedule).length).toBe(3);
    }));
    it("GET /api/schedules?start_date=2024-12-26&end_date=2024-12-27 returns all users with object schedule", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/schedules?start_date=2024-12-26&end_date=2024-12-27");
        expect(res.status).toBe(200);
        const schedules = res.body.data;
        expect(Array.isArray(schedules)).toBe(true);
        expect(schedules.length).toBeGreaterThan(0);
        expect(typeof schedules[0].schedule).toBe("object");
    }));
    it("GET /api/export-schedules?user_id=Ahmad&start_date=2024-12-26&end_date=2024-12-27 returns CSV", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/export-schedules?user_id=Ahmad&start_date=2024-12-26&end_date=2024-12-27");
        expect(res.status).toBe(200);
        expect(res.text).toContain("ID,Nama");
    }));
    it("GET /api/schedules?user_id=Yohan&start_date=2025-06-02&end_date=2025-06-08 returns correct 14-day pattern", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/schedules?user_id=Yohan&start_date=2025-06-02&end_date=2025-06-08");
        expect(res.status).toBe(200);
        const data = Array.isArray(res.body.data)
            ? res.body.data[0]
            : res.body.data;
        const schedule = data.schedule;
        expect(schedule["2025-06-02"]).toBe("L");
        expect(schedule["2025-06-03"]).toBe("P");
        expect(schedule["2025-06-04"]).toBe("P");
        expect(schedule["2025-06-05"]).toBe("P");
        expect(schedule["2025-06-06"]).toBe("S");
        expect(schedule["2025-06-07"]).toBe("P");
        expect(schedule["2025-06-08"]).toBe("L");
    }));
});
