import React, { Suspense, useState } from 'react'
import './Notifications.css'
import bell from './icons/campana.png'
import Loader from '../../utilities/Loader'
import NotificationModal from './NotificationModal'

const Notifications = () => {

    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='notifications'>
        <img src={bell} alt="notification-icon" className='icon-notification' onClick={()=> setIsOpen((prev)=> !prev)}/>

        {isOpen && (
            <Suspense fallback={<Loader box={'box'}/>}>
            <NotificationModal isOpen={isOpen}/>
           </Suspense>
        )}

    </div>
  )
}

export default Notifications