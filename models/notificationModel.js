const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  target: { type: String, enum: ["specific", "all_users"], required: true },
  userId: {
    type: String,
    required: function () {
      return this.target === "specific";
    },
  },
  message: { type: String, required: true },
  source: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
