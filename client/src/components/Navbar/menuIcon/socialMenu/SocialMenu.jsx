import React from 'react'
import './social.css'
import { Avatar, Tooltip } from 'antd'
import rem from '../../../../assets/rem.jpg'

const SocialMenu = () => {
  return (
    
        <div className='social-container'>
            <h4>Social</h4>
                 <ul className='social-container-grid' >
            <li className='social-perfil'>
                <h4 className='social-group-title'>Perfil</h4>
                <p>Jorge Ernesto</p>
             
            </li>
            <li className='social-group'>
                <h4 className='social-group-title'>Feed</h4>
                <span className='social-description'>connect with people that share the same interes</span>
            </li>
            <li className='social-friends'>
                <h4 className='social-group-title'>Friends</h4>
                <span className='social-description'>Search friends or people that you meiby know</span>
                <Avatar.Group>
      <Avatar size={'small'} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <a href="https://ant.design">
        <Avatar
        size={'small'}
          style={{
            backgroundColor: '#f56a00',
          }}
        >
          K
        </Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar
        size={'small'}
          style={{
            backgroundColor: '#87d068',
          }}
          icon={rem}
        />
      </Tooltip>
      <Avatar
      size={'small'}
        style={{
          backgroundColor: '#1677ff',
        }}
        icon={rem}
      />
    </Avatar.Group>
            </li>
            <li className='social-feed'>
            <h4 className='social-group-title'>Group</h4>
                <span className='social-description'>Conect with people that share your same interes</span>
                <Avatar.Group>
      <Avatar size={'small'} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <a href="https://ant.design">
        <Avatar
        size={'small'}
          style={{
            backgroundColor: '#f56a00',
          }}
        >
          K
        </Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar
        size={'small'}
          style={{
            backgroundColor: '#87d068',
          }}
          icon={rem}
        />
      </Tooltip>
      <Avatar
      size={'small'}
        style={{
          backgroundColor: '#1677ff',
        }}
        icon={rem}
      />
    </Avatar.Group>
            </li>
            <li className='social-remembers'>
                <h4 className='social-group-title'>Remembers</h4>
                <span className='social-description'>explore your photos, videos and antique publiches in this application</span>
            </li>
            <li className='social-saves'>
            <h4 className='social-group-title'>Saves</h4>
            <span className='social-description'>find application, photos, videos that you save to see them later</span>
            </li>
              </ul>
        </div>



  )
}

export default SocialMenu