import express from "express";

import {
getManagerAnalytics
}
from "../controllers/analyticsController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router=express.Router();


router.get(
"/manager",
authMiddleware,
roleMiddleware("manager"),
getManagerAnalytics
);


export default router;