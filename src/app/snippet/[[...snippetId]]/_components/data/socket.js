'use client';

import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_CODE_SOCKET, {
  autoConnect: false
});

export function sendInput(data) {
  if (!socket || !socket.connected) {
    return 'Something Went Wrong!!';
  }

  if (data) socket.emit('input', data);
}
