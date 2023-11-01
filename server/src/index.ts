import express from 'express';
import type { Request, Response, Express } from 'express';
import type { Socket } from 'socket.io';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('this is done');
});

io.on('connection', (socket: Socket) => {
  socket.on('join-room', (payload) => {
    console.log('user joined', payload);
    socket.broadcast.emit('user-connect', payload);
  });

});

io.on('error', (err: Error) => {
  console.log(err);
});

const PORT = 5500;

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
