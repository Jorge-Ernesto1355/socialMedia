import React, { useCallback } from 'react'
import useMutationRequest from '../../../../hooks/useMutationRequest'
import { addFriend } from '../service/users'
import { isYourFriend } from '../../../../utilities/isYourFriend'
import SpinnerLoader from '../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import AuthProvider from '../../../../zustand/AuthProvider'
import userService from '../../../../services/UserService'
import useUserRequest from '../../../../hooks/auth/useUserRequest'
import { useQuery } from 'react-query'
import { useSocket } from '../../../../hooks/useSocket'
import ButtonStars from '../../../buttons/ButtonStarts/ButtonStars'

const Friend = ({ addUser }) => {

    const { userId } = AuthProvider()
    const socket = useSocket()
    const privateRequest = useUserRequest()
    const { mutate, isLoading, isError} = useMutationRequest(addFriend, { name: 'friends' })

    
    const { data: userData } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId, options:['friends'] }));

    const user = userData?.data ?? {};

    const handleMutate = useCallback(() => {
        mutate({
            userId,
            addUser: addUser?._id?.$oid
        })
    }, [])


   

    const isFriend = isYourFriend(user?.friends, addUser?._id?.$oid)


    return (
        <div>

            {/* if isLoading is true only */}
            {isLoading && !isError && <SpinnerLoader />}

            {!isLoading && !isError && (
                <>
                    {isFriend && <p>friend</p>}
                    {!isFriend && (
                        <>
                            <p className='search-add-friend' onClick={() => handleMutate()}>añadir amigo</p>
                        </>
                    )}
                </>
            )}
            <ButtonStars onClick={()=>{
               
                socket?.emit('open-conversation', {to:addUser?.objectID, from:userId})
            }}/>
            {!isLoading && isError && <p>error</p>}
        </div>
    )
}

export default Friend