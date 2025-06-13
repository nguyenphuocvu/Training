import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000', {
  path: '/api/socket',
  autoConnect: false,
  transports: ["websocket"]
});

export default socket;
