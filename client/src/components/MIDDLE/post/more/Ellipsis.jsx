
import "./Ellipsis.css";

import { useQuery } from "react-query";
import EllipsiOwner from "./ellipsiOwnUser/EllipsiOwner";
import EllipsiNormalUser from "./EllipsiNormalUser/EllipsiNormalUser";
import AuthProvider from "../../../../zustand/AuthProvider";
import userService from "../../../../services/UserService";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
const EllipsisPost = ({  userId, postId, favoriteLength, reportsLength }) => {

  // userId is the  user that has uploaded the post that we trying to config
  // currentUser is our id, is our own user

  const { userId: currentUser } = AuthProvider()
  const privateRequest = useUserRequest()

  const { data: userData, isLoading, } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId }));

  const user = userData?.data ?? {};


  return (
    <>
      {currentUser === userId ? <EllipsiOwner reportsLength={reportsLength} postId={postId} favoriteLength={favoriteLength}  username={user.username ?? ''} isLoading={isLoading} /> : <EllipsiNormalUser postId={postId} postUserId={userId} isLoading={isLoading} username={user.username ?? ''} />}
      
    </>
  );
};

export default EllipsisPost;





