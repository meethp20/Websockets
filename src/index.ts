import WebSocket from "ws";
import http from "http"
import { WebSocketServer } from "ws";
import { error } from "console";


const server = http.createServer(function(request:any, response:any){
    console.log((new Date())+ 'Request recieved for'+ request.url)
    response.end("hi there");
})

const wss = new WebSocketServer({server})

wss.on("connection",function connection(ws){
    ws.on("error",console.log(error));

    ws.on("message",function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState=== WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        });
    });
    ws.send('Message from server')
})

server.listen(8080,function(){
    console.log((new Date())+'server is runnin ')
})