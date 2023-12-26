import React from 'react'
import Popover from '../../hooks/Popover/Popover'
import menu from './icons/menu.png'
import Image from '../../utilities/Image'
const OptionsNotifications = () => {
  return (
    <div style={{width:'20px',height:'20px'}}>
            <Popover trigger={<Image src={menu} alt='menu' />}>
              <ul>
             hola ptos
             </ul>

        </Popover>
    </div>
   
  )
}

export default OptionsNotifications