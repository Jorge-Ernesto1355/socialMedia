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
const Conversation = ({conversation}) => {

    const {userId} = AuthProvider()
    const [isTyping, setIsTyping] = useState(false)
    const queryClient = useQueryClient()
    const privateRequest = useUserRequest()
    const socket = useSocket()
    const friendId = conversation.participants.filter((participant)=> participant._id !==  userId)[0]?._id ?? null
    const { data: userData} = useCallbackRequest({request:userService.getUser, id:friendId, name:'user', privateRequest})

    const user = userData?.data ?? {}
    
    const {data:lastMessage, isError} = useCallbackRequest({request: messageService.lastMessage, id:conversation?._id, name:'lastMessage', privateRequest})

    const {data: UnReadMessage} = useQuery(['unReadMessage', conversation?._id], ()=> messageService.unReadMessages({privateRequest, conversationId: conversation?._id, userId}))

    const notReadMessages = UnReadMessage?.data ?? []

    const message = lastMessage?.data ?? {}

    const fechaFormateada = moment(message.createdAt).format(' h:mm A');
    
    useEffect(()=>{

        socket.on('new-message', async (message)=>{

            // add new messageView | last Message
            queryClient.setQueryData(['lastMessage', conversation?._id],{data: message} )

            // invalidateQuerys of lastMessage
            await queryClient.invalidateQueries(['lastMessage', conversation?._id])
        })

        socket.on('new-unRead-message', async  (notReadMessages)=>{
    
            queryClient.setQueryData(['unReadMessage', conversation?._id], (data)=>{
                return {
                    data: notReadMessages
                }
            }) 
            await  queryClient.invalidateQueries(['unReadMessage', conversation?._id])
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
    
  return (
    <div className='conversation-container' onClick={()=> socket.emit('start-conversation', {to:friendId, from:userId})}>
        <div className='conversation-profile-picture'>
            <img src={rem} alt=""  className='profile-photo'/>
        </div>
        <div className='conversation-information'>
            <div className='conversation-user-information'>
                <h4 className='conversation-username'>{user?.username ? user?.username :  "not Name"}</h4>
                <p className='conversation-time-message'>{fechaFormateada}</p>
            </div>
            <div className='conversation-message-info'>
                {isError && <p>message not found</p>}
                <div className='conversation-message'> 
                {isTyping && <p>Typing...</p>}
                {!isTyping && <p>{message.text}</p>}
                </div>
               {
                notReadMessages?.length > 0  &&  <span className='conversation-popup'>{notReadMessages?.length ?? null}</span>
               }
            </div>
        </div>
    </div>
  )
}

export default Conversation