import React, { useEffect } from 'react'
import './MessageBoxPage.css'
import ReactPortal from '../../components/modal/ReactPortal'
import BoxMessage from '../../components/RIGHT/Messages/MessageBox/BoxMessage.jsx'
import { useSocket } from '../../hooks/useSocket'
import BoxMessagesStore from '../../zustand/BoxMessagesStore'


const MessageBoxPage = () => {

  const socket = useSocket()
  const {setBoxMessages, boxMessages} = BoxMessagesStore()


  useEffect(()=>{

    socket?.on('open-conversation', setBoxMessages)

    return ()=>{
       socket?.off('open-conversation')
    }
    
  }, [socket])

  if(boxMessages.length <= 0) return null

  return (
    <ReactPortal wrapperId={'Message-box-popup'}>
      <div className='boxMessages-container'>
        <ul className='boxMessages-row'>
          {boxMessages?.map((conversation)=> (
            <BoxMessage key={`messagebox-key=${conversation?._id}`} conversationId={conversation?._id}/>
          ))}
        </ul>
      </div>
    </ReactPortal>
  )
}







export default MessageBoxPage