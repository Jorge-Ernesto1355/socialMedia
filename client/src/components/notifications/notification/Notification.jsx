import React from 'react'
import './Notification.css'
import rem from '../../../assets/rem.jpg'

const Notification = ({Notification}) => {


if(!Notification) return null

const {userReceptor, userConnector, message, label} = Notification

  
  return (
    <li className='notification-container'>
        <div>
          <img src={userReceptor?.imageProfile?.url ?? rem} className='noti-img-profile' alt="profile picture" />
        </div>
        <div className='notification-info'>
          <p className='notification-text'>
          <strong className='receptor-username'>{userConnector?.username}</strong>
           {message}
          <strong className='notification-label'>{label}</strong></p>
        </div>
    </li>
  )
}

export default Notification