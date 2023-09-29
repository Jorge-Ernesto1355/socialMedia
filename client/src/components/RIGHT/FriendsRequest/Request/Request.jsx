import React from 'react'
import './Request.css'
import rem from '../../../../assets/rem.jpg'
import MutualFriends from '../../../../utilities/MutualFriends'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import GetUser from '../../../../services/GetUser.service'
const Request = ({user}) => {
    const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);

    const { data: userData } = useQuery(["user", currentUser], () => GetUser(currentUser));

	const ownUser = userData?.data?.data ?? {};
    const mutualFriends = MutualFriends({friendsRequest: user?.friends, myFriends:ownUser?.friends})
    console.log(mutualFriends)
  return (
    
    <li className="info">e
      <div className="profile-photo">
        <img src={user?.imageProfile?.url ?? rem} alt="" />
      </div>
      <div>
        <h5>{user?.username}</h5>
        <p className="text-muted">{mutualFriends?.length} mutual friends</p>
      </div>
   
    <div className="action">
      <button className="">Accept</button>
      <button className="">Decline</button>
    </div>
 </li>
  )
}

export default Request