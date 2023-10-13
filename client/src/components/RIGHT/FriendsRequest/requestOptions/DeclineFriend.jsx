import React, { useCallback } from 'react'
import './DeclineFriend.css'
import LoaderVote from '../../../MIDDLE/post/Votes/LoaderVote';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import userService from '../../../../services/UserService';
import useMutationRequest from '../../../../hooks/useMutationRequest';
import { toast } from 'react-toastify';
const DeclineFriend = ({ userRequestFriend, currentUser }) => {


    const privateRequest = useUserRequest()
    const { mutate, isLoadingMutation, isError } = useMutationRequest(userService.acceptFriend, { name: 'requestFriends' })

    const handleMutate = useCallback(() => {
        mutate({
            addUserId: userRequestFriend,
            userId: currentUser,
            accept: true,
            privateRequest
        }, {
            onSuccess: () => {
                toast.success('declined friend request')
            },
            onError: () => {
                toast.error('Something went wrong')
            }
        })
    })
    return (
        <button className="Accept-friend" onClick={() => handleMutate()}>
            {isLoadingMutation && <LoaderVote />}
            {!isLoadingMutation && <span>Decline</span>}
        </button>
    )
}

export default DeclineFriend