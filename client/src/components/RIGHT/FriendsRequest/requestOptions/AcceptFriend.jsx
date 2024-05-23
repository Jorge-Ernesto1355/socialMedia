/* eslint-disable react/no-unknown-property */
import React, { useCallback } from 'react'
import './AcceptFriend.css'
import useMutationRequest from '../../../../hooks/useMutationRequest'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderVote from '../../../MIDDLE/post/Votes/LoaderVote'
import userService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import { message } from 'antd';
import { useMutation } from 'react-query';
import { AcceptFriendMutation } from './requestOptions';


const AcceptFriend = ({ userRequestFriend, currentUser,  acceptUser }) => {

    const privateRequest = useUserRequest()
    

    const handleMutate = useCallback(() => {
        acceptUser({
            addUserId: userRequestFriend,
            userId: currentUser,
            accept: true,
            privateRequest
        })
    },[])

    return (
        <>
            <button className="Accept-friend-accept" onClick={() => handleMutate()}>
                
                 <span>Aceptar</span>

            </button>

        </>
    )
}

export default AcceptFriend