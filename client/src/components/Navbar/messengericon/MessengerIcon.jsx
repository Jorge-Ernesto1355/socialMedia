import React from 'react'
import Popover from '../../../hooks/Popover/Popover'
import Image from '../../../utilities/Image'
import messengerBlack from './messenger-black.png'
const MessengerIcon = () => {
  return (
    <>

        <Popover trigger={<div className='icon-navbar'>
            <Image src={messengerBlack}/>
        </div>}> 

        <ul>
            hola buenas tardes
        </ul>

        </Popover>
    </>
  )
}

export default MessengerIcon