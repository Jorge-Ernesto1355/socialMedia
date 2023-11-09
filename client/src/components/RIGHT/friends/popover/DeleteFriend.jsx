import React, { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import userService from '../../../../services/UserService'
import AuthProvider from '../../../../zustand/AuthProvider'
import useUserRequest from '../../../../hooks/auth/useUserRequest'
import SpinnerLoader from '../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import { toast } from 'react-toastify';

const DeleteFriend = ({friendId}) => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useMutation({
        mutationKey:['friend-delete', friendId], 
        mutationFn:userService.deleteFriend, 
        onSuccess:async ()=>{
            
            await queryClient.invalidateQueries(['friends'])
            toast.success('has eliminado a tu amigo')
        }, 
        onError:()=>{
            toast.error('something went wrong with your friend')
        }
    })

    const handleMutate = useCallback(()=>{
        mutate({friendId, userId, privateRequest})

    }, [friendId, userId])


  return ( 
    <li className='popover-action'  onClick={()=> handleMutate()}>
           {
            isLoading && <SpinnerLoader/>
           }
           {!isLoading && (
            <>
            <h5>Delete friend</h5>
           <p className='text-popover-description'>delete your precited friend</p>
            </>
           )}
        </li>
  )
}

export default DeleteFriend