import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  clearNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);
router.put("/read/:id", markAsRead);
router.delete("/:id", deleteNotification);
router.delete("/", clearNotifications);

export default router;