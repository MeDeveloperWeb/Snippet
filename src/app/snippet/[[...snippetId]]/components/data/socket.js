'use client';

import { connect } from 'socket.io-client';

export const socket = connect(process.env.NEXT_PUBLIC_CODE_SOCKET);

export const sendInput = (data) => {
  if (!socket || !socket.connected) {
    return 'Something Went Wrong!!';
  }

  if (data) socket.emit('input', data);
};
