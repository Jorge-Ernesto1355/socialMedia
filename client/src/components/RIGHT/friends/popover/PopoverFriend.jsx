import React from 'react'
import './PopoverFriend.css'
import { useSocket } from '../../../../hooks/useSocket'
import AuthProvider from '../../../../zustand/AuthProvider'
import DeleteFriend from './DeleteFriend'


const PopoverFriend = ({friendId}) => {

        const {userId} = AuthProvider()
        const socket = useSocket()

        const startConversation = ()=>{
            socket?.emit('start-conversation',{to:friendId, from:userId})
        }


  return (
    <ul className='popoverFriend-container'>
        <DeleteFriend friendId={friendId}/>
        <li className='popover-action' onClick={()=> startConversation()} >
            <h5>Message</h5>
            <p className='text-popover-description'>talk with your friend</p>
        </li>

    </ul>
  )
}


export default PopoverFriend