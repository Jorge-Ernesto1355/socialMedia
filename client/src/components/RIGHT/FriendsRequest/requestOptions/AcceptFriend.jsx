/* eslint-disable react/no-unknown-property */
import React, { useCallback } from 'react'
import './AcceptFriend.css'
import useMutationRequest from '../../../../hooks/useMutationRequest'
import OptionsRequestFriends from './OptionsRequestFriends'
import { useSelector } from 'react-redux'

import LoaderVote from '../../../MIDDLE/post/Votes/LoaderVote'

const AcceptFriend = ({ userRequestFriend }) => {
    const { _id: currentUser } = useSelector(
        (state) => state.user.currentUser.user,
    );

    const { mutate, isLoadingMutation, isError } = useMutationRequest(OptionsRequestFriends, { name: 'requestFriends' })

    const handleMutate = useCallback(() => {
        mutate({
            userRequestFriend,
            userAccept: currentUser,
            accept: true
        }, {
            onSuccess: () => {

            }
        })
    })

    return (
        <button className="Accept-friend-accept" onClick={() => handleMutate()}>
            {isLoadingMutation && <LoaderVote />}
            {!isLoadingMutation && <span>Aceptar</span>}

        </button>
    )
}

export default AcceptFriend