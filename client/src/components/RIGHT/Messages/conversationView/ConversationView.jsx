import React, { useCallback, useEffect, useState } from "react";
import "./MessageView.css";
import AuthProvider from "../../../../zustand/AuthProvider";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll/useInfiniteScroll";
import ConversationService from "./services/ConversationService";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../../../utilities/Loader";
import Conversations from "./conversations/Conversations";
import UsersOnline from "../usersOnline/UsersOnline";
import SearchConversationView from "./SearchConversationView";
import { useQueryClient } from "react-query";
import GroupText from "../newGroup/GroupText";
import ComponentStateHandler from "../../../../hooks/stateManagmentComponent/ComponentStateHandler";
import EmptyMessage from "./EmptyMessage";


const ConversationView = ({ autocomplete, inputProps, state, title = "Messages"}, inputRef) => {
  const {userId } = AuthProvider()
  const privateRequest = useUserRequest()
  const queryClient = useQueryClient()
  const [filtred, setFiltred] = useState(false)
  const [searchConversation, setSearchConversation ] = useState([])


  const { results, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteScroll({
      name: "conversations",
      request: ConversationService.Conversations,
      privateRequest,
      id: userId
    });
  

    const {
           results: filtredConversations,
           isLoading: loadingFiltredConversation,
           isError: errorFiltredConversation,
           refetch,
           fetchNextPage: fetchNextPageFiltred,
           hasNextPage:hasNextPageFiltred} = useInfiniteScroll({privateRequest, request:ConversationService.getUnReadConversations, name:'filtredConversations', id:userId, options:{
           enabled:false
    }})


    const handleClickFiltrered = useCallback(async()=>{
      
      if(filtred){ 
        await queryClient.cancelQueries({ queryKey: ['conversations', userId], exact: true })
        refetch()
        setFiltred(false)
      }
      else{
        setFiltred(true)
      }
    }, [filtred])
    
    
    
    if(isError || errorFiltredConversation){
      return <div>error</div>
    }


    useEffect(()=>{
      const groupMessagesByConversationId = () => {
        const grouped = {};
  
        state?.collections[0]?.items?.forEach((message) => {
          const conversationId = message.conversationId;
  
          if (!grouped[conversationId]) {
            grouped[conversationId] = {
              conversationId,
              messages: [],
            };
          }
  
          grouped[conversationId].messages.push(message);
        });
  
        // Convertir el objeto a un array de conversaciones
        const conversationsArray = Object.values(grouped);
        setSearchConversation(conversationsArray);
      };
  
      groupMessagesByConversationId();

    },[state?.collections[0]?.items])





  return (
    <div {...autocomplete.getRootProps()}>
    <div className="conversation-title-container">
      <h4>{title}</h4>
      <GroupText/>
    </div>
      <SearchConversationView stateFiltred={filtred} filtred={handleClickFiltrered} ref={inputRef} inputProps={inputProps} autocomplete={autocomplete}/>
   
   {filtred && <p className="message-filter">Filtred by Unread</p>}
   <InfiniteScroll
   {...autocomplete.getPanelProps()}
    dataLength={filtred ? filtredConversations?.length : results?.length}
    hasMore={hasNextPage || isLoading || loadingFiltredConversation || hasNextPageFiltred  }
    loader={<Loader />}
    next={() => {
      if(filtred) fetchNextPage()
      if(!filtred) fetchNextPageFiltred() 
    }}
    >
      <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<Loader/>} ErrorMessageComponent={<>error conversations</>} items={results} EmptyMessage={<EmptyMessage/>}>
        <Conversations conversations={filtred ? filtredConversations : results }/>
      </ComponentStateHandler>
    </InfiniteScroll>
    </div>
  );
};

export default React.forwardRef(ConversationView)
