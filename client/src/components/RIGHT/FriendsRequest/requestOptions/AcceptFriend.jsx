/* eslint-disable react/no-unknown-property */
import React, { useCallback } from 'react'
import './AcceptFriend.css'
import useMutationRequest from '../../../../hooks/useMutationRequest'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderVote from '../../../MIDDLE/post/Votes/LoaderVote'
import userService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';


const AcceptFriend = ({ userRequestFriend, currentUser }) => {

    const privateRequest = useUserRequest()
    const { mutate, isLoadingMutation, isError } = useMutationRequest(userService.acceptFriend, { name: 'requestFriends' },)

    const handleMutate = useCallback(() => {
        mutate({
            addUserId: userRequestFriend,
            userId: currentUser,
            accept: true,
            privateRequest
        }, {
            onSuccess: () => {
                toast.success('New friend added')
            },
            onError: (data) => {
                console.log(data)
                toast.error('Something went wrong')
            }
        })
    })

    return (
        <>
            <button className="Accept-friend-accept" onClick={() => handleMutate()}>
                {isLoadingMutation && <LoaderVote />}
                {!isLoadingMutation && <span>Aceptar</span>}

            </button>

        </>
    )
}

export default AcceptFriend