import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './router';
import { onConnection } from './controller';
import { ClientToServerEvents, ServerToClientEvents } from './types';

const client = `http://${process.env.VITE_IPV4}:${process.env.VITE_CLIENT_PORT}`;
const serverPort = process.env.VITE_SERVER_PORT;

const app = express();
const server = createServer(app);
const webSocket = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: client,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(
  cors({
    origin: client,
    methods: 'GET, PUT, POST, DELETE',
  })
);
app.use(express.json());
app.use(router);
app.set('webSocket', webSocket);

webSocket.on('connection', onConnection(webSocket));

server.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});
