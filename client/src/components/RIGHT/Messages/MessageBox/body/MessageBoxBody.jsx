import React, { useEffect, useRef } from 'react'
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

const MessageBoxBody = ({conversation}) => {

    
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

    useEffect(() => {
        const handleNewMessage = (message) => {
         
      
          queryClient.setQueryData(['messages', conversation?._id], (prevData) => {
            const dataDocs = prevData?.pages[0]?.data?.docs ?? [];
            const newDocs = [...dataDocs, message];
            const { docs, ...restData } = prevData.pages[0].data;
      
            return {
              pages: [
                {
                  data: {
                    docs: newDocs,
                    restData,
                  },
                },
              ],
            };
          });
        };
      
        socket?.on('new-message', handleNewMessage);
      
        // Scroll automático cuando hay un nuevo mensaje
        messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      
        return () => {
          socket.off('new-message', handleNewMessage);
        };
      }, [socket, queryClient, conversation]);
      
      
      


    
    return (
        <div className='messages-container'  style={{
            height: 300,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }} id="scrollableDiv"
        >
         <InfiniteScroll
        dataLength={results.length}
        next={fetchNextPage}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} 
        inverse={true} //
       
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
         

        </div>
    )
}




export default MessageBoxBody