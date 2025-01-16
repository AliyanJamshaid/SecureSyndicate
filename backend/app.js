require("dotenv").config(); // Import and configure dotenv
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io"); // Import Socket.IO
const http = require("http"); // To create the HTTP server

const app = express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(express.json()); // Use express's built-in JSON parser (body-parser is no longer needed)
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
  smokeLevel: null, // Add smokeLevel data
  smokeStatus: null, // Add smokeStatus data
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
  const { temperature, humidity, co2, nh4, smokeLevel, smokeStatus } = req.body;

  // Log the incoming data
  console.log("Incoming data:", req.body);

  // Validate that all required fields are provided and that they are valid (not NaN)
  if (
    temperature != null &&
    !isNaN(temperature) &&
    humidity != null &&
    !isNaN(humidity) &&
    co2 != null &&
    !isNaN(co2) &&
    nh4 != null &&
    !isNaN(nh4) &&
    smokeLevel != null &&
    !isNaN(smokeLevel) &&
    smokeStatus != null
  ) {
    espData = { temperature, humidity, co2, nh4, smokeLevel, smokeStatus };
    console.log("Data received from ESP:", espData);

    // Emit data to all connected WebSocket clients (React)
    io.emit("updateData", espData);

    // Send success response
    res.status(200).send({ message: "Data received successfully" });
  } else {
    // If data is invalid, log it and return an error
    console.log("Invalid data received", req.body);
    res.status(400).send({ error: "Invalid data" });
  }
});

// Default route for testing
app.use("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
