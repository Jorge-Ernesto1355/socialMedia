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

const Friend = ({ addUser }) => {

    const { userId } = AuthProvider()
    const socket = useSocket()
    const privateRequest = useUserRequest()
    const { mutate, isLoading, isError, status, error } = useMutationRequest(addFriend, { name: 'friends' })

    console.log(addUser)

    const { data: userData } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId }));

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
    <button onClick={()=> socket?.emit('open-conversation', {to:addUser?.objectID, from:userId})}>message</button>
            {!isLoading && isError && <p>error</p>}
        </div>
    )
}

export default Friend