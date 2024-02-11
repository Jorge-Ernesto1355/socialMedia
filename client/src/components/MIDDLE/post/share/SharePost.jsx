import React from 'react'
import share from '../actionsPost/icons/share.png'
import copy from '../../../RIGHT/messages/Message/menuMessage/icons/copiar-alt.png'
import sharePost from './icons/sharePost.png'
import users from './icons/usuarios.png'
import { Popover, message } from 'antd'
import CopyBoard from 'copy-to-clipboard';
import './sharePost.css'
import SendToFriend from './SendToFriend'


const SharePost = ({postId, userId}) => {

  

  
  const copyFunction = (text) => {
    CopyBoard(text)
    message.success("copied correctly")
  }

  const content = (
    <ul className='sharePost-container'>
            <li className='menuMessageBox-item' onClick={()=> copyFunction(postId)}>
                <img  className='menuMessageBox-img' src={copy} alt="" />
                <p className='menuMessageBox-text'>Copy the link</p>
            </li>
            <SendToFriend postId={postId}/>
            <li className='menuMessageBox-item' >
                <img className='menuMessageBox-img' src={sharePost} alt="" />
                <p className='menuMessageBox-text'>Compartirlo en tu feed</p>
            </li>
           
            
          </ul>
  )
  return (
    <Popover trigger={"click"} content={content}>
     <div>
      <img className="icon" src={share} alt="" />
      <span className="interaction-button-text">Compartir</span>
    </div>
    </Popover>
      
  )
}

export default SharePost