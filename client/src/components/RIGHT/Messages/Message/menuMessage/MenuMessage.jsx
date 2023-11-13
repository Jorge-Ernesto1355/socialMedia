import React from 'react'
import menu from '../menu.png'
import './menuMessage.css'
import Popover from '../../../../../hooks/Popover/Popover'
import reply from './icons/reply.png'

import copy from './icons/copiar-alt.png'

import LikeMessage from '../../../../Reaction/LikeMessage'
import Reaction from '../../../../Reaction/Reaction'

const MenuMessage = ({isHovered}) => {
  return (

   <div>
    {isHovered &&  (
        <Popover trigger={ <img src={menu} className='menu-message' alt=""/>}>
            <ul className='popover-message'>
                <li className='item-message'><h6 className='popover-text-hour'>Ayer 8:20</h6></li>
                <li className='item-message'>
                <Reaction
                name="reactionsView"
                type={'Post'}
                >
                    <LikeMessage/>
                </Reaction>
          
             
                </li>
                <li className='item-message'>
                    <hp className='popover-text-message'>Reply</hp>
                    <span><img src={reply} alt="reply" className='popover-img-message' /></span>
                </li>
                <li className='item-message'>
                    <hp className='popover-text-message'>Copy</hp>
                    <img src={copy} alt="copy" className='popover-img-message' />
                </li>
                
            </ul>            
        </Popover>
    )} 
   </div>
  
  )
}

export default MenuMessage