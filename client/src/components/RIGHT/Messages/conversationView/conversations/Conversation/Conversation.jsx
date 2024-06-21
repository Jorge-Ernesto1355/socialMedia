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

import { Avatar, Badge, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Text, Title, Paragraph} = Typography;
const Conversation = ({conversation}) => {

    const {userId} = AuthProvider()
    const [isTyping, setIsTyping] = useState(false)
    const queryClient = useQueryClient()
    const privateRequest = useUserRequest() 
    const socket = useSocket()
    const { checkConversation} = BoxMessagesStore()
    const friendId = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
  
    const { data: user, isLoadinguUser} = useQuery(["user", friendId], () => userService.getUser({ privateRequest, userId:friendId}));

 
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
            socket?.off('new-message')
            socket?.off('new-unRead-message')
        }

    }, [socket])

    useEffect(()=>{
        
        socket?.on("typing", (typing)=>{
            setIsTyping(typing)
        })

        return ()=>{
            socket?.off("typing")
            setIsTyping(false)
        }
    }, [socket])


    const handleSocket = ()=>{
      
        if(socket?.connected) socket.emit('open-conversation', {to:friendId, from:userId})
        
    }
    
    
  return (
    <div className='conversation-container' onClick={()=> handleSocket()}>
        
        <div className='conversation-profile-picture '>
        <Badge status={user?.status === "Online" ? "success" :  "default" } dot={true} offset={[-10, 45]} size={30} style={{width: "9px", height: "9px"}}>
          <Avatar  src={user?.imageProfile?.url} icon={<UserOutlined/>} size={50} alt="user"/>
        </Badge>
        </div>
        <div className='conversation-information'>
            <div className='conversation-user-information'>
                {isLoadinguUser && <SimpleLineLoader/>}
                {!isLoadinguUser &&  
                <Paragraph ellipsis style={{marginBottom: 0}}>
                    <Title level={5} style={{marginBottom: "0px"}} className='conversation-username'>
                        {user?.username ?? "UniVerse user"}
                    </Title>
                </Paragraph>
                }
                <Text className='conversation-time-message'>{fechaFormateada}</Text>
            </div>
            <div className='conversation-message-info'>
                <div className='conversation-message'> 
                {isLoading && <SimpleLineLoader/>}
                {!isLoading &&
                 <>
                 {isTyping && <p>Typing...</p>}
                {!isTyping && (
                    <Paragraph ellipsis>
                        <Text>{message?.text}</Text>
                    </Paragraph>
                )}
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