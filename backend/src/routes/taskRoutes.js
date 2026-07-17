import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
   getMyTasks,
    updateMyTaskStatus,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getMyProjects } from "../controllers/taskController.js";

const router = express.Router();
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createTask
);
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("employee"),
  getMyTasks
);
router.get(
  "/my-projects",
  authMiddleware,
  roleMiddleware("employee"),
  getMyProjects
);

router.put(
  "/my/:id",
  authMiddleware,
  roleMiddleware("employee"),
  updateMyTaskStatus
);

router.get(
  "/",
  authMiddleware,
  getTasks
);

router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  deleteTask
);



export default router;