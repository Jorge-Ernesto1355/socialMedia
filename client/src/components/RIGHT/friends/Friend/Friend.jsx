import React from 'react'
import './Friend.css'
import rem from '../../../../assets/rem.jpg'
import menu from '../../icons/points-menu.png'
import Popover from '../../../../hooks/Popover/Popover'
import PopoverFriend from '../popover/PopoverFriend'

const Friend = ({friend}) => {
  return (
    <div className='friend-container'>

        <div className='profile-photo'>
        <img
		      src={friend?.ProfilePicture ? friend?.ProfilePicture : rem}
		      alt="user"
		      />

        </div>

        <div className='friend-information'>
           <h4>{friend?.username}</h4>
           <div className='friend-options'>
             
           </div>
        </div>
        
    </div>
  )
}

export default Friend

export const  TriggerFriends = ()=>{
  return (
    <img src={menu} alt="menu" />
  )
}