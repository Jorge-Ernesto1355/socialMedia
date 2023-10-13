import React from 'react'
import './User.css'
import rem from '../../../../assets/rem.jpg'

import Friend from './Friend'
const User = ({ hit, itemsProps }) => {


  return (
    <li className='search-user-container' {...itemsProps}>
      <img className='search-user-img' src={hit?.imageProfile?.url ?? rem} alt="" />
      <div className='user-information-container'>
        <h5 className='user-username'>{hit?.username}</h5>
        <Friend addUser={hit} />
      </div>
    </li>
  )
}

export default User