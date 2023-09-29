import React from "react";
import "./FriendRequest.css";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import RequestFriends from "./requestFriends/RequestFriends";
import { useSelector } from "react-redux";
import FriendsRequestLoader from "./FriendsRequestLoader";
import RequestFriendsService from "./service/RequestFriends";

const FriendRequest = () => {
  const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);
 
  const {results, isLoading, isError, refetch} = useInfiniteScroll({request:RequestFriendsService, name:'requestFriends', id:currentUser})
 console.log(results)

  return (
    <div className="friend-request">
      <h4>Peticiones</h4>
      {isLoading && (
        <>
        <FriendsRequestLoader/>
        <FriendsRequestLoader/>
        <FriendsRequestLoader/>
        </>
      ) }

      {!isLoading && (
        <RequestFriends items={results}/>
      )}
    </div>
  );
};

export default FriendRequest;
