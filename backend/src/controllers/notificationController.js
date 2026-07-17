import Notification from "../models/Notification.js";

export const createNotification = async (title, message, type = "system") => {
  try {
    const notification = await Notification.create({
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date(),
    });

    return notification;
  } catch (error) {
    console.log("createNotification error:", error.message);
  }
};

// =======================
// GET ALL NOTIFICATIONS
// =======================
export const getNotifications = async (req, res) => {
  try {
    const data = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// MARK AS READ
// =======================
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// DELETE ONE
// =======================
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// CLEAR ALL
// =======================
export const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});

    res.status(200).json({
      message: "All notifications cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};