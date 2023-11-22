import React from 'react'
import block from '../../icons/bloquear.png'
import { useMutation, useQueryClient } from 'react-query'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import ConversationService from '../../conversationView/services/ConversationService'
import LoaderVote from '../../../../MIDDLE/post/Votes/LoaderVote'
import ComponentStateHandler from '../../../../../hooks/stateManagmentComponent/ComponentStateHandler'
import { useSocket } from '../../../../../hooks/useSocket'
import AuthProvider from '../../../../../zustand/AuthProvider'


const BlockContact = ({conversation}) => {

    const privateRequest = useUserRequest()
    const {userId} = AuthProvider()
    const queryClient = useQueryClient()
    const conversationKey = ['conversation', conversation?._id] 
    const friendId = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
    const socket = useSocket()
    
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: ConversationService.blockContact,
        mutationKey: ['block', conversation?._id],
        onSuccess: () => {
          queryClient.setQueryData(conversationKey, (existingData) => {
           
            const isBlocked = existingData?.data?.block || false;
    
            const updatedData = {
              ...existingData,
              data: {
                ...existingData.data,
                block: !isBlocked,
              },
            }; 
            socket?.emit('block-conversation',{block:!isBlocked, to:friendId})
            
      
            return updatedData;
          });
        },
      });
  


    const handleBlock = ()=>{
        mutate({
            privateRequest, 
            id:conversation?._id
        })
    }

  return (
    <li className='menuMessageBox-item'>
    <img className='menuMessageBox-img' src={block} alt="" />
    <p className='menuMessageBox-text' onClick={()=> handleBlock()}>
        <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<LoaderVote/>} ErrorMessageComponent={<>Error block</>} >
            {conversation?.block ? <>Blocked  contact</> : <>Block Contact</>}
        </ComponentStateHandler>
        
    </p>
</li>
  )
}

export default BlockContact