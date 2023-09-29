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
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join', (name: string) => {
    console.log('user name', name);

    socket.broadcast.emit('user-joined', name);
  });

});

io.on('error', (err: Error) => {
  console.log(err);
});

const PORT = 5500;

/* app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
}); */

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
