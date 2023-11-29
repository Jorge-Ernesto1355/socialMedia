import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import ReactPlayer from 'react-player'
import peerService from '../services/peerService'
import AuthProvider from '../zustand/AuthProvider'

const Room = () => {

    const socket = useSocket()
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [myStream, setMyStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    console.log({remoteStream, myStream})

    const {userId} = AuthProvider()
    const handleUserJoined = useCallback(({ id})=>{
      
        setRemoteSocketId(id)
    }, [])

    const handleCallUser = useCallback( async ()=>{
        console.log('call')
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true})
        const offer = await peerService.getOffer()
       
        socket?.emit('userCall', {to:remoteSocketId, from:userId ,  offer})
        setMyStream(stream)
    }, [remoteSocketId, socket])

    const handleIncommingCall = useCallback( async ({from, offer})=>{
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setMyStream(stream)
            
          } catch (error) {
            if (error.name === 'NotAllowedError' && error.message === 'Device in use') {
              // Ignorar el error si el dispositivo ya está en uso
            } else {
                const ans = await peerService.getAnswer(offer)
                socket?.emit('callAccepted', {to:from, ans})
              // Manejar otros errores de manera adecuada
              console.error('Error al obtener acceso a los dispositivos de medios:', error.message);
            }
          }
        
        
    }, [socket])

    const handleNegotationNeeded = useCallback(  async ()=> {
        const offer = await peerService.getOffer()
        socket?.emit('peerNegoNeeded', {offer, to:remoteSocketId, from:userId})
    }, [socket, remoteSocketId])


    useEffect(()=>{
        peerService.peer.addEventListener('negotiationneeded', handleNegotationNeeded)
        return ()=> peerService.peer.removeEventListener('negotiationneeded', handleNegotationNeeded)
    }, [handleNegotationNeeded])

    const sendStream = useCallback(() => {
        for (const track of myStream.getTracks()) {
          peerService.peer.addTrack(track, myStream);
        }
      }, [myStream]);



    const handleCallAccepted = useCallback(async ({ ans }) => {
        await peerService.setLocalDescription(ans);
        sendStream();
      }, [sendStream]);

    const handleNegoNeedInComing = useCallback(async ({from, offer})=>{
         const ans = await peerService.getAnswer(offer)
         socket?.emit('peerNegoDone', {to:from, ans, from:userId})
    }, [socket])

    const handleNegoFinal = useCallback(async ({ans})=>{
       await  peerService.setLocalDescription(ans)
    }, [])

    useEffect(()=>{
        peerService.peer.addEventListener('track', async ev =>{
            console.log('alv tracks ')
            const remoteStream = ev.streams[0] 
          
            setRemoteStream(remoteStream)
        })

    }, [])

    useEffect(()=>{

        socket?.on('userJoined', handleUserJoined)
        socket?.on('incomingCall', handleIncommingCall)
        socket?.on('callAccepted', handleCallAccepted )
        socket?.on('peerNegoNeeded', handleNegoNeedInComing )
        socket?.on('peerNegoFinal', handleNegoFinal )

        return ()=>{
            socket?.off('userJoined')
            socket?.off('incomingCall')
            socket?.off('callAccepted')
            socket?.off('peerNegoNeeded')
            socket?.off('peerNegoFinal')
        }
    },[socket, handleUserJoined, remoteSocketId, handleCallAccepted, handleCallUser])
    return (
        <div>
          <h2>Remote Room</h2>
          {remoteSocketId ? <>Connected</> : <>Not Connected</>}
          {remoteSocketId}
          {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
          {remoteSocketId && <button onClick={sendStream}>Send Stream</button>}
    
          {!!myStream && (
            <>
              <h2>My Stream</h2>
              {/* Cambiado para mostrar solo la URL del stream */}
              <ReactPlayer url={myStream} height={'200px'} width={'200px'} playing muted />
            </>
          )}
          {!!remoteStream && (
            <>
              <h3>Remote Stream</h3>
              {/* Cambiado para mostrar solo la URL del stream */}
              <ReactPlayer url={remoteStream} height={'200px'} width={'200px'} playing muted />
            </>
          )}
        </div>
      );
}

export default Room