import React, { useEffect, useState } from 'react'
import './MessageBox.css'
import MessageBoxHeader from './header/MessageBoxHeader'
import MessageBoxBody from './body/MessageBoxBody'
import MessageBoxActions from './actions/MessageBoxActions'
import { motion } from 'framer-motion'
import useUserRequest from '../../../../hooks/auth/useUserRequest'

import BoxMessagesStore from '../../../../zustand/BoxMessagesStore'

import { variantsMessageBox } from './variants'
import AuthProvider from '../../../../zustand/AuthProvider'
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest'
import ConversationService from '../conversationView/services/ConversationService'
import ComponentStateHandler from '../../../../hooks/stateManagmentComponent/ComponentStateHandler'
import SpinnerLoader from '../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import { useSocket } from '../../../../hooks/useSocket'
import { useQuery } from 'react-query'
import userService from '../../../../services/UserService'
import { toast } from 'react-toastify'


const BoxMessage = ({conversationId}) => {
  
    const {userId} = AuthProvider()
    const socket = useSocket()
    const [minimize, setMinimize] = useState(true)
    const privateRequest = useUserRequest()
    const {deleteConversation} = BoxMessagesStore() 
    const {data:conversationData, isLoading:isLoadingConversation, isError:isErrorConversation} = useCallbackRequest({request:ConversationService.Conversation, name:"conversation", id:conversationId, privateRequest})
    const conversation = conversationData?.data ?? {}
    const friendId = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
    const { data: user, isLoading} = useQuery(["user", friendId], () => userService.getUser({ privateRequest, userId:friendId }), {
        onError:()=>{
            toast.error('something went wrong with your friend')
            deleteConversation(conversation?._id)
        }
    });
 
   
    
    useEffect(()=>{
        socket?.emit('readMessage', {conversationId, to:friendId, userId})
        return ()=> socket?.off('readMessage')
    }, [socket]) 

   
    return (
        <motion.div animate={`${minimize ? 'show' : 'hidden'}`} variants={variantsMessageBox} className='MessageBox-container'>
            <ComponentStateHandler isLoading={isLoadingConversation} isError={isErrorConversation} Loader={<SpinnerLoader/>}  ErrorMessageComponent={<>errro Conversation</>} >
            <MessageBoxHeader minimize={setMinimize} deleteConversation={deleteConversation} conversation={conversation} isLoading={isLoading} user={user} />
            <MessageBoxBody conversation={conversation} friendUser={user} />
            <MessageBoxActions conversation={conversation} userId={userId} />
            </ComponentStateHandler>
            
        </motion.div>
    )
}

export default BoxMessage