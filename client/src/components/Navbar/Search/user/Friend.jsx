import React, { useCallback } from 'react'
import useMutationRequest from '../../../../hooks/useMutationRequest'
import { addFriend } from '../service/users'
import { useSelector } from 'react-redux'
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest'
import GetUser from '../../../../services/GetUser.service'
import { isYourFriend } from '../../../../utilities/isYourFriend'
import Loader from '../../../../utilities/Loader'
import SpinnerLoader from '../../../../stylesComponents/spinnerLoader/SpinnerLoader'

const Friend = ({addUser}) => {

    const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);
    const {mutate, isLoading, isError,status, error} = useMutationRequest(addFriend, {name:'friends'})

    const { data: userData } = useCallbackRequest({request:GetUser, id:currentUser, name:'user'})

	const user = userData?.data?.data ?? {};

    const handleMutate = useCallback(()=>{
            mutate({
                userId:currentUser, 
                addUser: addUser?._id?.$oid
            })
    }, [])
    
    const isFriend = isYourFriend(user?.friends, addUser?._id?.$oid)

console.log({error})
  return (
    <div>

        {/* if isLoading is true only */}
        {isLoading && !isError && <SpinnerLoader/>}
        
        {!isLoading && !isError && (
            <>
            {isFriend && <p>friend</p>}
            {!isFriend && (
            <>
            <p className='search-add-friend' onClick={( )=> handleMutate()}>añadir amigo</p>
            </>
             )}
            </>
        )}

        {!isLoading && isError && <p>error</p>}
    </div>
  )
}

export default Friend