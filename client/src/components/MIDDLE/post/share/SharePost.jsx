import React from 'react'
import share from '../actionsPost/icons/share.png'
import Popover from '../../../../hooks/Popover/Popover'
import copy from '../../../RIGHT/messages/Message/menuMessage/icons/copiar-alt.png'
import sharePost from './icons/sharePost.png'
import users from './icons/usuarios.png'
const SharePost = () => {
  return (
    <Popover trigger={
       <div>
      <img className="icon" src={share} alt="" />
      <span className="interaction-button-text">Compartir</span>
    </div>
  }>

<ul className='menuMessageBox-container'>
            <li className='menuMessageBox-item'>
                <img  className='menuMessageBox-img' src={copy} alt="" />
                <p className='menuMessageBox-text'>Copy the link</p>
            </li>
            <li className='menuMessageBox-item'>
                <img className='menuMessageBox-img' src={users} alt="" />
                <p className='menuMessageBox-text'>Compartirlo con un amigo</p>
            </li>
            <li className='menuMessageBox-item' >
                <img className='menuMessageBox-img' src={sharePost} alt="" />
                <p className='menuMessageBox-text'>Compartirlo en tu post</p>
            </li>
           
            
          </ul>

    </Popover>
      
  )
}

export default SharePost