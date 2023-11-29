import React, { useEffect, useState } from 'react'
import './Conversation.css'
import moment from 'moment'
import rem from '../../../../../../assets/rem.jpg'
import AuthProvider from '../../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../../hooks/auth/useUserRequest'
import userService from '../../../../../../services/UserService'
import { useSocket } from '../../../../../../hooks/useSocket'
import { useCallbackRequest } from '../../../../../../hooks/useCallbackRequest/useCallbackRequest'

import messageService from '../../../MessageBox/service/MessageService'

import { useQuery, useQueryClient } from 'react-query'
import SimpleLineLoader from '../../../../../Loaders/SimpleLineLoader'
import BoxMessagesStore from '../../../../../../zustand/BoxMessagesStore'
import Image from '../../../../../../utilities/Image'

const Conversation = ({conversation}) => {

    const {userId} = AuthProvider()
    const [isTyping, setIsTyping] = useState(false)
    const queryClient = useQueryClient()
    const privateRequest = useUserRequest() 
    const socket = useSocket()
    const { checkConversation} = BoxMessagesStore()
    const friendId = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
  
    const { data: userData } = useQuery(["user", friendId], () => userService.getUser({ privateRequest, userId:friendId}));
    
    const user = userData?.data ?? {};
 
    const {data:lastMessage, isLoading} = useCallbackRequest({request: messageService.lastMessage, id:conversation?._id, name:'lastMessage', privateRequest})

    const {data: UnReadMessage} = useQuery(['unReadMessage', conversation?._id], ()=> messageService.unReadMessages({privateRequest, conversationId: conversation?._id, userId}))

  
    const notReadMessages = UnReadMessage?.data ?? {}

    const message = lastMessage?.data ?? {}

    const fechaFormateada = moment(message.createdAt).format(' h:mm A');
    
    useEffect(()=>{

        socket?.on('new-message', async (message)=>{

            // add new messageView | last Message
            queryClient.setQueryData(['lastMessage', conversation?._id],{data: message} )

            // invalidateQuerys of lastMessage
            await queryClient.invalidateQueries(['lastMessage', conversation?._id])
        })

        socket?.on('new-unRead-message', async (notReadMessages)=>{
            queryClient.setQueryData(['unReadMessage', conversation?._id], (prevData)=>{

                const check = checkConversation(conversation)
             

                if(check) return {data:prevData}
                if(!check) return {data:notReadMessages}
                

            }) 
          
        })

        return ()=>{
            socket.off('new-message')
            socket.off('new-unRead-message')
        }

    }, [socket])

    useEffect(()=>{
        
        socket?.on("typing", (typing)=>{
            setIsTyping(typing)
        })

        return ()=>{
            socket?.off()
            setIsTyping(false)
        }
    }, [socket])


    const handleSocket = ()=>{
    
        socket?.emit('open-conversation', {to:friendId, from:userId})
    }
    
    
  return (
    <div className='conversation-container' onClick={()=> handleSocket()}>
        
        <div className='conversation-profile-picture '>
        <div className='profile-photo'>
                <Image src={rem}/>
                
            </div>
        </div>
        <div className='conversation-information'>
            <div className='conversation-user-information'>
                <h5 className='conversation-username'>
                {user?.username ? user?.username :  "not Name"}
                </h5>
                <p className='conversation-time-message'>{fechaFormateada}</p>
            </div>
            <div className='conversation-message-info'>
                <div className='conversation-message'> 
                {isLoading && <SimpleLineLoader/>}
                {!isLoading &&
                 <>
                 {isTyping && <p>Typing...</p>}
                {!isTyping && <p>{message?.text}</p>}
                 </>
                 }
                </div>
               {
                notReadMessages.unRead > 0  &&  <span className='conversation-popup'>{notReadMessages.unRead ?? null}</span>
               }
            </div>
        </div>
    </div>
  )
}

export default Conversation