import React, { createContext, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import AuthProvider from '../zustand/AuthProvider';

const ENDPOINT = 'http://localhost:3002'; // Reemplaza esto con la URL de tu servidor Socket.io

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const {userId, accessToken} = AuthProvider()
  let socket = {}
  if(userId){
     socket = socketIOClient(ENDPOINT, {
      query:{
        userId, 
        "token":accessToken
      }
    });
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
