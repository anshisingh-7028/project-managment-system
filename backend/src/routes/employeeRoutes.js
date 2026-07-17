import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";


import {
getEmployeeDashboard
}
from "../controllers/employeeController.js";


const router = express.Router();



router.get(
"/dashboard",
authMiddleware,
roleMiddleware("employee"),
getEmployeeDashboard
);



export default router;