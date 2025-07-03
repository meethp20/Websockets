"use strict";
// server.ts or server.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
// 1. Create Express app
const app = (0, express_1.default)();
// 2. Create HTTP server from Express app
const server = http_1.default.createServer(app);
// 3. Create WebSocket server attached to HTTP server
const wss = new ws_1.WebSocketServer({ server });
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
