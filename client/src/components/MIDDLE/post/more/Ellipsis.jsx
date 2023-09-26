
import "./Ellipsis.css";

// icons
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import GetUser from "../../../../services/GetUser.service";
import EllipsiOwner from "./EllipsiOwner";
import EllipsiNormalUser from "./EllipsiNormalUser";
const EllipsisPost = ({ isOpen, userId }) => {
  
  // userId is the  user that has uploaded the post that we trying to config
  // currentUser is our id, is our own user
  
  const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);

  const { data: userData, isLoading } = useQuery(["user", userId], () => GetUser(userId));

	const user = userData?.data?.data ?? {};

 


  return (
     <>
       {currentUser !== userId ? <EllipsiOwner isOpen={isOpen} username={user.username ?? ''}  isLoading={isLoading}/> : <EllipsiNormalUser isOpen={isOpen} isLoading={isLoading} username={user.username ?? ''}/> }
       
     </>
  );
};

export default EllipsisPost;





