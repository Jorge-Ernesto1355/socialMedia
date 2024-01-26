import React from 'react'
import './createMenu.css'
import EditIrm -rf node_modules package-lock.jsoncon from './icons/EditIcon'
import StoryIcon from './icons/StoryIcon'
import { Group } from 'iconoir-react';
import EventIcon from './icons/EventIcon'

const CreateMenu = () => {
  return (
    <div className='create-menu-container'>
        <h4 className='social-group-title'>Create</h4>

       <ul className='create-menu-actions-container'>
           <li className='create-menu-portal'>
            <div className='create-menu-circle'>
                <EditIcon/>
            </div>
            <p className='create-menu-description'>Create</p>
           </li>
           <li className='create-menu-portal'>
            <div className='create-menu-circle'>
                <StoryIcon/>
            </div>
            <p className='create-menu-description'>Story</p>
           </li>
           <li className='create-menu-portal'>
            <div className='create-menu-circle'>
                <EventIcon/>
            </div>
                <p className='create-menu-description'>Event</p>
           </li>
           <li className='create-menu-portal'>
            <div className='create-menu-circle'>
                <Group/>
            </div>
                <p className='create-menu-description'>Group</p>
           </li>

       </ul>
            
        
    </div>
  )
}

export default CreateMenu