import WebSocket from 'ws';
import * as fs from "fs";

const wss = new WebSocket.Server({ port: 8080 });

const clients = []

wss.on('connection', function connection(ws) {
    clients.push(ws);

    wss.on('disconnect', (ws) => {
        

        clients.slice(clients.find(ws), clients.find(ws) + 1)
    })
});