import React, { useCallback, useEffect, useRef } from 'react'
import './MessageBoxBody.css'
import Message from '../../Message/Message'
import useInfiniteScroll from '../../../../../hooks/useInfiniteScroll/useInfiniteScroll'
import AuthProvider from '../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import messageService from '../service/MessageService'
import { useSocket } from '../../../../../hooks/useSocket'
import { useQueryClient } from 'react-query'

import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../../../../../utilities/Loader'
import BoxMessagesDetails from '../MessageDetails/BoxMessagesDetails'

const MessageBoxBody = ({conversation, friendUser}) => {

    
    const messagesContainerRef = useRef();
    const privateRequest = useUserRequest()
    const {userId} = AuthProvider()
    const queryClient = useQueryClient()
    const socket = useSocket()
    const {results, isLoading, isError, hasNextPage, fetchNextPage} = useInfiniteScroll({
        name:"messages", 
        request:messageService.messages,
        privateRequest, 
        id:conversation?._id

    })

    const handleNewMessage = useCallback((message) => {
         
      
      queryClient.setQueryData(['messages', conversation?._id], (prevData) => {
        const dataDocs = prevData?.pages[0]?.data?.docs ?? [];
       
        const newDocs = [message, ...dataDocs];
        const { docs, ...restData } = prevData.pages[0].data;
        

  
        return {
          pages: [
            {
              data: {
                docs: newDocs,
                ...restData,
              },
            },
          ],
        };
      });
    }, [socket])

    const handleReadedMessage = useCallback((messages)=>{
      console.log(messages)

    },[socket])

    useEffect(() => {
        
      
        socket?.on('new-message', handleNewMessage);
        socket?.on('readedMessage', handleReadedMessage)
      
        // Scroll automático cuando hay un nuevo mensaje
        messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      
        return () => {
          socket.off('new-message', handleNewMessage);
        };
      }, [socket, queryClient, conversation, handleNewMessage]);
      
      
      


    
    return (
        <div className='messages-container'  style={{
            height: "100%",
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }} id="scrollableDiv"
        >
     
         <InfiniteScroll
        dataLength={results.length}
        next={() => fetchNextPage()}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} 
        inverse={true} 
        hasMore={hasNextPage || isLoading}
        loader={<Loader/>}
        scrollableTarget="scrollableDiv"
         >
         <>
         
         {isLoading && <SpinnerLoader/>}
          {isError && <>Error Message</>}
            {!isLoading && !isError && (<>
                {
            !!results && results?.map((message)=>{
                    const isMyMessage = userId !== message.to
                    return <Message key={`message-key=${message?._id}`} isMyMessage={isMyMessage} message={message}/>
            })
        }
            </>)}
            <div ref={messagesContainerRef}></div>
         </>
         </InfiniteScroll>
         <BoxMessagesDetails friendUser={friendUser}/>
        </div>
    )
}




export default MessageBoxBody