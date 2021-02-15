import { createContext } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

export const socket = io();
export const socketContext = createContext();

export const emitFriendRequest = (actionUserId) => {
  socket.emit('send friend request', actionUserId);
};

// Receive friend request
export const onFriendRequest = () => {
  socket.on('receive friend request', (notification) => {
    // if (notification.receiverId !== sessionUser.id) return;
    toast.error(`Received a friend request from ${notification.actionUser.displayName}!`);
  });
};