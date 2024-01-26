import React from 'react'
import menu from './cuadricula.png'
import './menu-container.css'

import Image from '../../../utilities/Image'
import SocialMenu from './socialMenu/SocialMenu'
import CreateMenu from './createMenu/CreateMenu'
import { Popover } from 'antd'
const MenuIcon = () => {

  const content = (
    <React.Fragment>
       <section className='menu-container'>
          
          <h3>Menu</h3>
            <div className='menu-container-divider'>   
            <SocialMenu/>
            <CreateMenu/>
            </div>
          </section>
    </React.Fragment>
  )
  return (
    <>

        <Popover trigger={"click"} content={content} color={"#F3F3F3"}> 
        
        <div className='icon-navbar'>
            <Image src={menu}/>
        </div>
       
        </Popover>
    </>
  )
}

export default MenuIcon