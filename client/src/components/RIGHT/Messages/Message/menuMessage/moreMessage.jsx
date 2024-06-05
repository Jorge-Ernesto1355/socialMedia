import React from 'react'
import Reaction from '../../../../Reaction/Reaction'
import moment from 'moment'
import './menuMessage.css'
import clipboardCopy from 'clipboard-copy';
import BoxMessagesStore from '../../../../../zustand/BoxMessagesStore'
import AuthProvider from '../../../../../zustand/AuthProvider'
import LikePost from '../../../../Reaction/LIkePost'
import ReplyIcon from './icons/ReplyIcon'
import CopyIcon from './icons/CopyIcon'


const MoreMessage = ({message}) => {

  const {MessageReply} = BoxMessagesStore()
  const {userId} = AuthProvider()

  const hour =  moment(message.createdAt).format('HH:mm');

  const handleCopyClick = () => {
    clipboardCopy(message?.text)
      .then(() => {
       
      })
      
  };


  return (
    <ul className='popover-message' >
                <li className='item-message'><h6 className='popover-text-hour'>{hour}</h6></li>
                <li className='item-message'>
                <Reaction
                  variantsOptions={{scale:.7, y:-40, x:-20}}
                  name="message-reactions"
                  id={message?._id}
                  userId={userId}
                  type={'Message'}
                 >
                    <LikePost/>
                </Reaction>
                </li>
               

                <li className='item-message' onClick={()=> MessageReply(message?._id)}>
                    <ReplyIcon/>
                    <hp className='popover-text-message'>Reply</hp>
                </li>
                <li className='item-message'  onClick={()=> handleCopyClick()}>
                    <CopyIcon/>
                    <p className='popover-text-message' >Copy</p>
                </li>
                
            </ul>       
  )
}

export default MoreMessage