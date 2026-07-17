import express from "express";
import { getDashboardStats,getManagerDashboard } from "../controllers/dashboardController.js";
import { globalSearch } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
getEmployeeDashboard
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/search", globalSearch);
router.get(
"/manager",
authMiddleware,
roleMiddleware("manager"),
getManagerDashboard
);

router.get(
"/employee",
authMiddleware,
roleMiddleware("employee"),
getEmployeeDashboard
);

export default router;