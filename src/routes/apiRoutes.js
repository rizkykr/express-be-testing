"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scheduleController_1 = require("../controllers/scheduleController");
const router = (0, express_1.Router)();
router.get("/schedules", (req, res) => req.query.user_id
    ? (0, scheduleController_1.getUserScheduleApi)(req, res)
    : (0, scheduleController_1.getAllSchedulesApi)(req, res));
router.get("/export-schedules", scheduleController_1.exportSchedulesApi);
router.get("/check-schedule", scheduleController_1.checkUserScheduleApi);
exports.default = router;
