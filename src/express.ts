// server.ts or server.js

import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

// 1. Create Express app
const app = express();

// 2. Create HTTP server from Express app
const server = http.createServer(app);

// 3. Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server });

// 4. Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("✅ WebSocket connected");

  ws.on("message", (msg) => {
    console.log("📩 Message received:", msg.toString());

    // Echo the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(`Echo: ${msg}`);
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ WebSocket disconnected");
  });

  ws.send("👋 Hello from WebSocket server!");
});

// 5. Optional Express route
app.get("/", (_req, res) => {
  res.send("🚀 Express + WebSocket server running.");
});

// 6. Start server
server.listen(3000, () => {
  console.log("🟢 Server listening on http://localhost:3000");
  console.log("🟢 WebSocket listening on ws://localhost:3000");
});
