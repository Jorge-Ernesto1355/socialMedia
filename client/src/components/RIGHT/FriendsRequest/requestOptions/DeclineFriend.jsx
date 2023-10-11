import React, { useCallback } from 'react'
import './DeclineFriend.css'
import useMutationRequest from '../../../../hooks/useMutationRequest';
import { useSelector } from 'react-redux';

import OptionsRequestFriends from './OptionsRequestFriends';
import LoaderVote from '../../../MIDDLE/post/Votes/LoaderVote';
const DeclineFriend = ({ userRequestFriend }) => {

    const { _id: currentUser } = useSelector(
        (state) => state.user.currentUser.user,
    );

    const { mutate, isLoadingMutation, isError } = useMutationRequest(OptionsRequestFriends, { name: 'requestFriends' })

    const handleMutate = useCallback(() => {
        mutate({
            userRequestFriend,
            userAccept: currentUser,
            accept: true
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