import React, { useCallback } from 'react'
import useMutationRequest from '../../../../hooks/useMutationRequest'
import { addFriend } from '../service/users'
import { isYourFriend } from '../../../../utilities/isYourFriend'
import SpinnerLoader from '../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import AuthProvider from '../../../../zustand/AuthProvider'
import userService from '../../../../services/UserService'
import useUserRequest from '../../../../hooks/auth/useUserRequest'

import { useMutation, useQuery } from 'react-query'
import { useSocket } from '../../../../hooks/useSocket'
import ButtonStars from '../../../buttons/ButtonStarts/ButtonStars'
import { message } from 'antd'

const Friend = ({ addUser }) => {

    const { userId } = AuthProvider()
    const socket = useSocket()
    const privateRequest = useUserRequest()
    const { mutate, isLoading, isError, isSuccess} = useMutation(['addFriend', addUser], ()=> userService.addFriend({userId, addUserId: addUser.objectID, privateRequest}))

 
    const { data: userData} = useQuery(["usertoFriend", userId], () => userService.getUser({ privateRequest, userId , options: ["friends"]}));
 


    const handleMutate = useCallback(() => {
        mutate({
            userId,
            addUser: addUser?.objectID
        },{
            onError: ()=> message.error("Something went wrong"), 
            onSuccess: ()=> message.success("request sended")
        })
    }, [])

    const isFriend = isYourFriend(userData?.friends, addUser?.objectID)
       


    return (
        <div>
            {isLoading && !isError && <SpinnerLoader />}

            {!isLoading && !isError && (
                <>
                    {isFriend && <p className='search-add-friend'>friend</p>}
                    {!isFriend && (
                        <>
                            {isSuccess ? <p className='search-add-friend'>Request sended</p> :  <p className='search-add-friend' onClick={() => handleMutate()}>Añadir amigo</p> }
                        </>
                    )}
                </>
            )}
            <ButtonStars onClick={()=>{
                socket?.emit('open-conversation', {to:addUser?.objectID, from:userId})
            }}/>
            
        </div>
    )
}

export default Friend