/* eslint-disable no-constant-condition */
import React from 'react'
import Image from '../../../../../utilities/Image'
import rem from '../../../../../assets/rem.jpg'
import './BoxMessageDetais.css'
import userService from '../../../../../services/UserService'
import AuthProvider from '../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import { isYourFriend } from '../../../../../utilities/isYourFriend'
import { useMutation, useQuery } from 'react-query'
import { Button, message } from 'antd'
const BoxMessagesDetails = ({friendUser}) => {
  const {userId} = AuthProvider()
  const privateRequest = useUserRequest()
  const { mutate, isLoading,  isSuccess} = useMutation(['addFriend', friendUser._id], ()=> userService.addFriend({userId, addUserId: friendUser._id, privateRequest}))
  const { data: userData} = useQuery(["usertoFriend", userId], () => userService.getUser({ privateRequest, userId , options: ["friends", "y mas"]}));
 


  
  const handleAddFriend = ()=>{
     mutate({
        userId, 
        addUserId: friendUser._id, 
        privateRequest
    }, {
        onSuccess:()=>{
            message.success("request sended")
        },
        onError: ()=> message.error("Something went wrong")
        
    })
}


const isFriend = isYourFriend(userData?.friends, friendUser?._id)



  return (
    <div className='BoxMessagesDetails-container'>
        <div className="profile-photo">
			<Image src={friendUser?.ProfilePicture ? friendUser?.ProfilePicture : rem} alt="user"/>		
        </div>
        <h5>{friendUser?.username}</h5>
        <p className='details-description'>{isFriend || isSuccess ? <>{friendUser?.username} is your friend on uniVerse</> : <>{friendUser?.username} is not your friend on uniVerse</>}</p>
        {!isSuccess && (
        <div className='BoxMessageDetails-options'>

         {!isFriend &&  <Button type='primary' loading={isLoading} className={`BoxMessageDetails-sendRequest`} onClick={()=> handleAddFriend()}>
           Send
       </Button>}
        <button className='BoxMessageDetails-viewProfile'>View profile</button>
        </div>
        )}
   
    </div>
  )
}

export default BoxMessagesDetails