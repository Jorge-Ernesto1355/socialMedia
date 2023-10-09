import React from "react";
import "./FriendRequest.css";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import RequestFriends from "./requestFriends/RequestFriends";
import { useSelector } from "react-redux";
import FriendsRequestLoader from "./FriendsRequestLoader";
import RequestFriendsService from "./service/RequestFriends";
import toast, { Toaster } from 'react-hot-toast'
const FriendRequest = () => {


  const { results, isLoading, isError, refetch } = useInfiniteScroll({ request: RequestFriendsService, name: 'requestFriends', })



  return (
    <div className="friend-request">
      <h4>Peticiones</h4>
      {isLoading && (
        <>
          <FriendsRequestLoader />
          <FriendsRequestLoader />
          <FriendsRequestLoader />
        </>
      )}

      {!isLoading && (
        <RequestFriends items={results} />
      )}
      <Toaster />
    </div>
  );
};

export default FriendRequest;
