const Notification = require("../models/notificationModel");

// Send Notification API
const sendNotification = async (req, res) => {
  const { target, userId, message, source } = req.body;
  try {
    const notification = new Notification({ target, userId, message, source });
    await notification.save();
    res
      .status(201)
      .json({ message: "Notification sent successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error });
  }
};

// Fetch Notifications API
const fetchNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find(
      { userId, status: "unread" },
      { message: 1, status: 1, timestamp: 1, _id: 0 }
    );
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Mark Notifications as Read API
const markNotificationsAsRead = async (req, res) => {
  const { userId, notificationIds } = req.body;
  try {
    await Notification.updateMany(
      { _id: { $in: notificationIds }, userId },
      { status: "read" }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error });
  }
};

module.exports = {
  sendNotification,
  fetchNotifications,
  markNotificationsAsRead,
};
