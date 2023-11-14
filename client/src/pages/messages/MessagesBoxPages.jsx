import React, { useEffect } from 'react'
import './MessageBoxPage.css'
import ReactPortal from '../../components/modal/ReactPortal'
import MessageBox from '../../components/RIGHT/messages/MessageBox/BoxMessage'
import { useSocket } from '../../hooks/useSocket'
import BoxMessagesStore from '../../zustand/BoxMessagesStore'



const MessageBoxPage = () => {

  const socket = useSocket()
  const {setBoxMessages, boxMessages} = BoxMessagesStore()


  useEffect(()=>{

    socket?.on('open-conversation', (conversation)=>{
      setBoxMessages(conversation)
    })

    return ()=>{
       socket?.off('open-conversation')
    }
    
  }, [socket])

  return (
    <ReactPortal wrapperId={'Message-box-popup'}>
      <div className='boxMessages-container'>
        <ul className='boxMessages-row'>
          {boxMessages?.map((conversation)=> (
            <MessageBox key={`messagebox-key=${conversation?._id}`} conversation={conversation}/>
          ))}
        </ul>
      </div>
    </ReactPortal>
  )
}







export default MessageBoxPage