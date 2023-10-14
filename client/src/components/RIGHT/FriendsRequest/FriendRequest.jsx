import React from "react";
import "./FriendRequest.css";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import RequestFriends from "./requestFriends/RequestFriends";
import AuthProvider from "../../../zustand/AuthProvider";
import userService from "../../../services/UserService";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import { ToastContainer } from "react-toastify";
import ComponentStateHandler from "../../../hooks/stateManagmentComponent/ComponentStateHandler";
import LoaderFriendRequest from "./Loader/LoaderFriendRequest";
import ErrorMessageFriendRequest from "./ErrorMessage/ErrorMessageFriendRequest";

const FriendRequest = () => {
  const { userId } = AuthProvider()
  const privateRequest = useUserRequest()
  const { results, isLoading, isError, reset } = useInfiniteScroll({ request: userService.requestFriends, name: 'requestFriends', id: userId, privateRequest })



  return (
    <div className="friend-request">
      <h4>Peticiones</h4>
      <ComponentStateHandler Loader={<LoaderFriendRequest />} isError={isError} isLoading={isLoading} ErrorMessageComponent={<ErrorMessageFriendRequest reset={reset} />} items={results}  >
        <RequestFriends items={results} />
      </ComponentStateHandler>
      <ToastContainer />
    </div>
  );
};

export default FriendRequest;
