import React, { useState } from 'react'
import './MessageBox.css'
import MessageBoxHeader from './header/MessageBoxHeader'
import MessageBoxBody from './body/MessageBoxBody'
import MessageBoxActions from './actions/MessageBoxActions'
import { motion } from 'framer-motion'
import useUserRequest from '../../../../hooks/auth/useUserRequest'
import { useQuery } from 'react-query'
import userService from '../../../../services/UserService'
import BoxMessagesStore from '../../../../zustand/BoxMessagesStore'
import {toast} from 'react-toastify'
import { variantsMessageBox } from './variants'
import AuthProvider from '../../../../zustand/AuthProvider'


const BoxMessage = ({conversation}) => {
  
    
    const {userId} = AuthProvider()
    const [minimize, setMinimize] = useState(true)
    const privateRequest = useUserRequest()
    const {deleteConversation} = BoxMessagesStore() 
   
    const friendId = conversation.participants.filter((participant)=> participant !==  userId)[0] ?? null


    const { data: userData } = useQuery(["user", friendId], () => userService.getUser({ privateRequest, id:friendId }), {
        onError:()=>{
            toast.error('something went wrong with your friend')
            deleteConversation(conversation?._id)
        }
    });

	const user = userData?.data ?? {};

    return (
        <motion.div animate={`${minimize ? 'show' : 'hidden'}`} variants={variantsMessageBox} className='MessageBox-container'>
            <MessageBoxHeader minimize={setMinimize} conversation={conversation} user={user} />
            <MessageBoxBody conversation={conversation} />
            <MessageBoxActions conversation={conversation} friendId={friendId} userId={userId} />
        </motion.div>
    )
}

export default BoxMessage