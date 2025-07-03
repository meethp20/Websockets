"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const http_1 = __importDefault(require("http"));
const ws_2 = require("ws");
const server = http_1.default.createServer(function (request, response) {
    console.log((new Date()) + 'Request recieved for' + request.url);
    response.end("hi there");
});
const wss = new ws_2.WebSocketServer({ server });
wss.on("connection", function connection(ws) {
    ws.on("error", (err) => console.log("error" + err));
    ws.on("message", function message(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    });
    ws.send('Message from server');
});
server.listen(3000, function () {
    console.log((new Date()) + 'server is running on port 8080');
});
