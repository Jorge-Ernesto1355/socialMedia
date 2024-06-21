import React from "react";
import "./FriendRequest.css";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import RequestFriends from "./requestFriends/RequestFriends";
import AuthProvider from "../../../zustand/AuthProvider";
import userService from "../../../services/UserService";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import ComponentStateHandler from "../../../hooks/stateManagmentComponent/ComponentStateHandler";
import LoaderFriendRequest from "./Loader/LoaderFriendRequest";
import ErrorMessageFriendRequest from "./ErrorMessage/ErrorMessageFriendRequest";
import EmptyMessage from "./EmptyMessage";
import { Typography } from "antd";

const {  Title} = Typography;
const FriendRequest = () => {
  const { userId } = AuthProvider()
  const privateRequest = useUserRequest()
  const { results, isLoading, isError, reset } = useInfiniteScroll({ request: userService.requestFriends, name: 'requestFriends', id: userId, privateRequest })



  return (
    <div className="friend-request">
      <Title style={{padding: "10px"}} level={5}>Friend Request</Title>
      <ComponentStateHandler Loader={<LoaderFriendRequest />} isError={isError} isLoading={isLoading} ErrorMessageComponent={<ErrorMessageFriendRequest reset={reset} />} items={results} EmptyMessage={<EmptyMessage/>}  >
        <RequestFriends items={results} />
      </ComponentStateHandler>
     
    </div>
  );
};

export default FriendRequest;
