import React from 'react'
import Image from '../../../utilities/Image'
import bell from './bell-black.png'
import Notifications from '../../notifications/Notifications'
import { Badge, Popover } from 'antd'

    
const NotificationIcon = () => {
  return (
    <>

        <Popover trigger={"click"} content={<Notifications/>}   > 
      
        <Badge count={0} offset={[-12,35 ]} size="small">
            <div className='icon-navbar'>
            <Image src={bell}/>
            </div>
         </Badge>

        </Popover>
    </>
  )
}

export default NotificationIcon