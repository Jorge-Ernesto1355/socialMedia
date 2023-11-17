import React, { useEffect } from 'react'
import './MessageBoxBody.css'
import Message from '../../Message/Message'
import useInfiniteScroll from '../../../../../hooks/useInfiniteScroll/useInfiniteScroll'
import AuthProvider from '../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import messageService from '../service/MessageService'
import { useSocket } from '../../../../../hooks/useSocket'
import { useQueryClient } from 'react-query'

const MessageBoxBody = ({conversation}) => {

    
    const privateRequest = useUserRequest()
    const {userId} = AuthProvider()
    const queryClient = useQueryClient()
    const socket = useSocket()
    const {results, isLoading, isError} = useInfiniteScroll({
        name:"messages", 
        request:messageService.messages,
        privateRequest, 
        id:conversation?._id

    })

     useEffect(()=>{

        socket?.on('new-message', async (message)=>{
          
            queryClient.setQueryData(['messages', conversation?._id], (newMessage)=>{
              
                const messageToAdd = structuredClone(message)
                messageToAdd.preview = true
                const dataDocs = newMessage?.pages[0]?.data?.docs ?? []
                const newDocs = [...dataDocs, messageToAdd]
                const {docs, ...restData}  = newMessage.pages[0].data 
                
                
                return {
                    pages: [
                       {
                        data:{
                            docs:newDocs, 
                            restData
                        }
                       }
                    ]
                }
            })

        })

        return ()=>{
            socket.off('new-message')
        }

     }, [])
    return (
        <div className='messages-container'>
        {
            !!results && results?.map((message)=>{
                    const isMyMessage = userId !== message.to
                    return <Message key={`message-key=${message?._id}`} isMyMessage={isMyMessage} message={message}/>
            })
        }
          
        </div>
    )
}




export default MessageBoxBody