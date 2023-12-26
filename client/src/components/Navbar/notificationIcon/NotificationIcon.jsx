import React from 'react'
import Popover from '../../../hooks/Popover/Popover'
import Image from '../../../utilities/Image'
import bell from './bell-black.png'
import Notifications from '../../notifications/Notifications'

    
const NotificationIcon = () => {
  return (
    <>

        <Popover trigger={<div className='icon-navbar'>
            <Image src={bell}/>
        </div>}> 

        <Notifications/>

        </Popover>
    </>
  )
}

export default NotificationIcon