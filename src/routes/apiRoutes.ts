import { Router } from "express";
import {
  getAllSchedulesApi,
  getUserScheduleApi,
  exportSchedulesApi,
  checkUserScheduleApi,
} from "../controllers/scheduleController";

const router = Router();

router.get("/schedules", (req, res) =>
  req.query.user_id
    ? getUserScheduleApi(req, res)
    : getAllSchedulesApi(req, res)
);

router.get("/export-schedules", exportSchedulesApi);
router.get("/check-schedule", checkUserScheduleApi);

export default router;
