import React from 'react'
import Reaction from '../../../../Reaction/Reaction'
import LikeMessage from '../../../../Reaction/LikeMessage'
import reply from './icons/reply.png'
import moment from 'moment'
import copy from './icons/copiar-alt.png'
import clipboardCopy from 'clipboard-copy';
import BoxMessagesStore from '../../../../../zustand/BoxMessagesStore'
import AuthProvider from '../../../../../zustand/AuthProvider'


const Component = ({message, hovered}) => {

  const {MessageReply} = BoxMessagesStore()
  const {userId} = AuthProvider()

  const hour =  moment(message.createdAt).format('HH:mm');

  const handleCopyClick = () => {
    clipboardCopy(message?.text)
      .then(() => {
       
      })
      
  };


  return (
    <ul className='popover-message' onMouseEnter={()=> hovered(true)} onMouseLeave={()=> hovered(false)}>
                <li className='item-message'><h6 className='popover-text-hour'>{hour}</h6></li>
                <li className='item-message'>
                <Reaction
                  variantsOptions={{scale:.7, y:-40, x:-20}}
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
                <li className='item-message'  onClick={()=> handleCopyClick()}>
                    <p className='popover-text-message' >Copy</p>
                    <img src={copy} alt="copy" className='popover-img-message' />
                </li>
                
            </ul>       
  )
}

export default Component