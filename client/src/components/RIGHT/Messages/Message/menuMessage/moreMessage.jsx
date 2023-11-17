import React from 'react'
import Reaction from '../../../../Reaction/Reaction'
import LikeMessage from '../../../../Reaction/LikeMessage'
import reply from './icons/reply.png'

import copy from './icons/copiar-alt.png'
import BoxMessagesStore from '../../../../../zustand/BoxMessagesStore'
import AuthService from '../../../../../pages/services/AuthServices'
import AuthProvider from '../../../../../zustand/AuthProvider'
import messageService from '../../MessageBox/service/MessageService'
const Component = ({message, hovered}) => {

  const {MessageReply} = BoxMessagesStore()
  const {userId} = AuthProvider()


  return (
    <ul className='popover-message' onMouseLeave={()=> hovered(false)}>
                <li className='item-message'><h6 className='popover-text-hour'>Ayer 8:20</h6></li>
                <li className='item-message'>
                <Reaction
                  name="message-reactions"
                  id={message?._id}
                  userId={userId}
                  type={'Message'}
                >
                    <LikeMessage/>
                </Reaction>
          
             
                </li>
                <li className='item-message' onClick={()=> MessageReply(message?._id)}>
                    <hp className='popover-text-message'>Reply</hp>
                    <span><img src={reply} alt="reply" className='popover-img-message' /></span>
                </li>
                <li className='item-message'>
                    <p className='popover-text-message'>Copy</p>
                    <img src={copy} alt="copy" className='popover-img-message' />
                </li>
                
            </ul>       
  )
}

export default Component