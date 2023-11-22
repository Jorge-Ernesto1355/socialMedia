import React from 'react'
import './Request.css'
import rem from '../../../../assets/rem.jpg'
import MutualFriends from '../../../../utilities/MutualFriends'

import { useQuery } from 'react-query'
import GetUser from '../../../../services/GetUser.service'
import AcceptFriend from '../requestOptions/AcceptFriend'
import DeclineFriend from '../requestOptions/DeclineFriend'
import AuthProvider from '../../../../zustand/AuthProvider'
const Request = ({ user }) => {

  const { userId: currentUser } = AuthProvider()
  const { data: userData } = useQuery(["user", currentUser], () => GetUser(currentUser));

  const ownUser = userData?.data?.data ?? {};
  const mutualFriends = MutualFriends({ friendsRequest: user?.friends, myFriends: ownUser?.friends })

  return (

    <li className="user-request-container">
      <div className='user-request-information'>
        <div className="profile-photo">
          <img src={user?.imageProfile?.url ?? rem} alt="" />
        </div>
        <div className='user-request-text'>
          <h5>{user?.username}</h5>
          <p className="text-muted mutual-friends">{mutualFriends?.length} mutual friends</p>
        </div>
      </div>

      <div className="request-options">
        <AcceptFriend userRequestFriend={user?._id} currentUser={currentUser} />
        <DeclineFriend userRequestFriend={user?._id} currentUser={currentUser} />
      </div>
    </li>
  )
}

export default Request