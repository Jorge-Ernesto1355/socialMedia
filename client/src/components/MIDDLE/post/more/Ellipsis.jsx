
import "./Ellipsis.css";

import { useQuery } from "react-query";
import EllipsiOwner from "./ellipsiOwnUser/EllipsiOwner";
import EllipsiNormalUser from "./EllipsiNormalUser";
import AuthProvider from "../../../../zustand/AuthProvider";
import userService from "../../../../services/UserService";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
import { ToastContainer } from "react-toastify";
const EllipsisPost = ({ isOpen, userId, postId, handleCloseEllipsi }) => {

  // userId is the  user that has uploaded the post that we trying to config
  // currentUser is our id, is our own user

  const { userId: currentUser } = AuthProvider()
  const privateRequest = useUserRequest()

  const { data: userData, isLoading, } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId }));

  const user = userData?.data ?? {};


  return (
    <>
      {currentUser === userId ? <EllipsiOwner postId={postId} isOpen={isOpen} username={user.username ?? ''} handleCloseEllipsi={handleCloseEllipsi} isLoading={isLoading} /> : <EllipsiNormalUser postId={postId} isOpen={isOpen} isLoading={isLoading} username={user.username ?? ''} />}
      <ToastContainer hideProgressBar={true} />
    </>
  );
};

export default EllipsisPost;





