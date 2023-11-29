import React, { createContext, useContext, useEffect, useMemo } from 'react';
import socketIOClient from 'socket.io-client';
import AuthProvider from '../zustand/AuthProvider';
const ENDPOINT = 'http://localhost:3002';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const {userId, accessToken} = AuthProvider()

  
  const socket = useMemo(()=>{
    
    if(userId && accessToken) 
    return  socketIOClient(ENDPOINT, {
      query:{
        userId, 
        "token":accessToken
      }})   
     
   
  },[userId, accessToken])

  

  

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
