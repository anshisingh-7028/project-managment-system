import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectDetails,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin & Manager
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getProjects
);

// Employee Project Details
router.get(
  "/:id/details",
  authMiddleware,
  roleMiddleware("employee", "manager", "admin"),
  getProjectDetails
);

// Admin & Manager
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createProject
);

// Admin & Manager
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  updateProject
);

// Admin Only
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteProject
);

export default router;