import React, { useCallback } from 'react'
import './DeclineFriend.css'
import useUserRequest from '../../../../hooks/auth/useUserRequest';

const DeclineFriend = ({ userRequestFriend, currentUser, acceptUser}) => {


    const privateRequest = useUserRequest()
    const handleMutate = useCallback(() => {
        acceptUser({
            addUserId: userRequestFriend,
            userId: currentUser,
            accept: false,
            privateRequest
            
        })
    }, [])

    return (
        <button className="Accept-friend" onClick={() => handleMutate()}>
            <span>Decline</span>
        </button>
    )
}

export default DeclineFriend