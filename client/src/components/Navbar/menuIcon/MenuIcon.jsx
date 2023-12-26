import React from 'react'
import menu from './cuadricula.png'
import Popover from '../../../hooks/Popover/Popover'
import Image from '../../../utilities/Image'
const MenuIcon = () => {
  return (
    <>

        <Popover trigger={<div className='icon-navbar'>
            <Image src={menu}/>
        </div>}> 

        <ul>
            hola buenas tardes
        </ul>

        </Popover>
    </>
  )
}

export default MenuIcon