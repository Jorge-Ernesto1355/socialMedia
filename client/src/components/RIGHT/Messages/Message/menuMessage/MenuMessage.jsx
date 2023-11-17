import React, { Suspense, lazy } from 'react'
import menu from '../menu.png'
import './menuMessage.css'
import Popover from '../../../../../hooks/Popover/Popover'
import Loader from '../../../../../utilities/Loader'

const MoreMessage = lazy(()=> import('./moreMessage'))

const MenuMessage = ({isHovered, message, hovered}) => {
  return (

   <div>
    {isHovered &&  (
        <Popover trigger={ <img src={menu} className='menu-message' alt=""/>}>
           <Suspense fallback={<Loader/>}>
              <MoreMessage message={message} hovered={hovered}/>
            </Suspense>  
        </Popover>
    )} 
   </div>
  
  )
}

export default MenuMessage