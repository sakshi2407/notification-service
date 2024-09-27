const express = require("express");
const router = express.Router();
const {
  sendNotification,
  fetchNotifications,
  markNotificationsAsRead,
} = require("../controllers/notificationController");

router.post("/send", sendNotification);
router.get("/:userId", fetchNotifications);
router.post("/read", markNotificationsAsRead);

module.exports = router;
