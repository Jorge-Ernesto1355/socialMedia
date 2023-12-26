import React from 'react'
import './Notification.css'
import moment from 'moment'
import rem from '../../../assets/rem.jpg'
import Image from '../../../utilities/Image'
import megafono from './icons/megafono.png'
const Notification = ({Notification}) => {

if(!Notification) return null

const {userReceptor, userConnector, message, label, createdAt} = Notification

const formatedHour = moment(createdAt).format('h:mm A')

  return (
    <li className='notification-container unRead'>
        <div className='notification'>
        <div className="profile-photo">
						<Image src={userReceptor?.ProfilePicture ?? rem}
							alt="user"/>
				</div>
              <div className='notification-label'>
              <Image src={megafono} alt='publish'/>
              </div>
          
        <div className='notification-info'>
          <p className='notification-text'>
          <strong className='receptor-username'>{userConnector?.username}</strong>
           <span className='notification-message'>{message}</span>
           <span className='notification-message'>{label}</span></p>
        </div>
        </div>
        <p className='time-notification'>{formatedHour}</p>
        
    </li>
  )
}

export default Notification