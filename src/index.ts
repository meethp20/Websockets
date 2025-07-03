import WebSocket from "ws";
import http from "http"
import { WebSocketServer } from "ws";



const server = http.createServer(function(request:any, response:any){
    console.log((new Date())+ 'Request recieved for'+ request.url)
    response.end("hi there");
})

const wss = new WebSocketServer({server})

wss.on("connection",function connection(ws){
      ws.on("error",(err)=>console.log("error"+err));

    ws.on("message",function message(data){
        wss.clients.forEach(function each(client){
            if(client.readyState=== WebSocket.OPEN){
                client.send(data)
            }
        });
    });
    ws.send('Message from server')
})

server.listen(3000,function(){
    console.log((new Date())+'server is running on port 8080')
})