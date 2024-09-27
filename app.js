const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notificationRoutes");
const { WebSocketServer } = require("ws");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WebSocket Setup
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");
  ws.on("message", (message) => {
    console.log("Received:", message);
  });
});
