import { Server as HttpServer } from 'http';
import httpStatus from 'http-status';
import { Server as SocketServer } from 'socket.io';
import config from './config';
import ApiError from './errors/ApiError';

let io: SocketServer | null = null;

export const initializeSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: [config.client_origin!, config.client_origin_2!],
      credentials: true,
    },
  });
  console.log('from here');

  io.on('connection', socket => {
    console.log('Client connected', socket.id);

    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined their privet room`);
    });

    socket.on('disconnected', () => {
      console.log(`Client disconnected:`, socket.id);
    });
  });

  return io;
};

export const getIo = (): SocketServer => {
  if (!io) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Socket.io not initialized.',
    );
  }
  return io;
};
