require("dotenv").config(); // Import and configure dotenv
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io"); // Import Socket.IO
const http = require("http"); // To create the HTTP server

const app = express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Use CORS origin from .env or default to "*"
  })
);

// Store ESP data in memory
let espData = {
  temperature: null,
  humidity: null,
  co2: null, // Add CO2 data
  nh4: null, // Add NH4 data
};

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // Use CORS origin from .env
    methods: ["GET", "POST"],
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A React client connected!");

  // Send the current ESP data to the new client
  socket.emit("updateData", espData);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Handle POST requests (data from ESP32)
app.post("/api/data", (req, res) => {
  const { temperature, humidity, co2, nh4 } = req.body; // Destructure CO2 and NH4

  if (temperature && humidity && co2 && nh4) {
    espData = { temperature, humidity, co2, nh4 }; // Update data object with CO2 and NH4
    console.log("Data received from ESP:", espData);

    // Emit data to all connected WebSocket clients (React)
    io.emit("updateData", espData);

    res.status(200).send({ message: "Data received successfully" });
  } else {
    res.status(400).send({ error: "Invalid data" });
  }
});

// Default route for testing
app.use("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
