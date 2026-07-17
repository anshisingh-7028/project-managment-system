import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
 getManagerDashboard
} from "../controllers/managerController.js";


const router = express.Router();


router.get(
"/dashboard",
authMiddleware,
roleMiddleware("manager"),
getManagerDashboard
);


export default router;