/* eslint-disable no-constant-condition */
import React from 'react'
import Image from '../../../../../utilities/Image'
import rem from '../../../../../assets/rem.jpg'
import './BoxMessageDetais.css'
import useMutationRequest from '../../../../../hooks/useMutationRequest'
import userService from '../../../../../services/UserService'
import AuthProvider from '../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader'

import HandlerStateButton from '../../../../../utilities/auth/HandlerStateButton'
import { ToastContainer, toast } from 'react-toastify'
import { isYourFriend } from '../../../../../utilities/isYourFriend'
import { useQuery } from 'react-query'
const BoxMessagesDetails = ({friendUser}) => {
  const {userId} = AuthProvider()
  const privateRequest = useUserRequest()
  const {mutate, isLoadingMutation, isError, isSuccess}= useMutationRequest(userService.addFriend, {name:'addFriend'})
  const { data: userData } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId, options:['friends'] }));

    const user = userData?.data ?? {};

  const handleAddFriend = ()=>{
     mutate({
        userId, 
        addUserId: friendUser._id, 
        privateRequest
    }, {
        onSuccess:(data)=>{
            if(data?.response?.status === 500){
               toast.error('Ups... something went wrong')
            }
        
        },
        
    })
}

const isFriend = isYourFriend(user?.friends, friendUser?._id)



  return (
    <div className='BoxMessagesDetails-container'>
        <div className="profile-photo">
			<Image src={friendUser?.ProfilePicture ? friendUser?.ProfilePicture : rem} alt="user"/>		
        </div>
        <h5>{friendUser?.username}</h5>
        <p className='details-description'>{isFriend ? <>{friendUser?.username} is your friend on uniVerse</> : <>{friendUser?.username} is not your friend on uniVerse</>}</p>
        <div className='BoxMessageDetails-options'>
         {!isFriend &&  <button className={`BoxMessageDetails-sendRequest ${isError && 'errorFriendRequest'}`} onClick={()=> handleAddFriend()}>
           <HandlerStateButton text={'send Request'} isLoading={isLoadingMutation} isError={isError} isSuccess={isSuccess} LoadingMessage={<SpinnerLoader/>} ErrorMessage={<>Error</>} SuccessMessage={'sended request'} />
       </button>}
        <button className='BoxMessageDetails-viewProfile'>View profile</button>
        </div>
    <ToastContainer/>   
    </div>
  )
}

export default BoxMessagesDetails