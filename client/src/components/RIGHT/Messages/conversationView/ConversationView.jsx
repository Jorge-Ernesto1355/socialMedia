import React from "react";
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


const ConversationView = () => {
  const {userId } = AuthProvider()
  const privateRequest = useUserRequest()

  const { results, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteScroll({
      name: "conversations",
      request: ConversationService.Conversations,
      privateRequest,
      id: userId
    });

    if(isError){
      return <div>error</div>
    }


  return (
   
    <>
    <div className="conversation-title-container">
      <h4>Messages</h4>
      <span className="conversation-newGroup">New group</span>
    </div>
    <SearchConversationView/>
    <UsersOnline/>
   <InfiniteScroll
    dataLength={results.length}
    hasMore={hasNextPage || isLoading}
    loader={<Loader />}
    next={() => fetchNextPage()}
    >
      <Conversations conversations={results}/>
    </InfiniteScroll>
    </>
  );
};

export default ConversationView
