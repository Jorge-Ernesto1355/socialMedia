import React from 'react'
import './filterNotification.css'
const FiltersNotification = () => {
  return (
        <ul className='filters-container'>
            <li className='filters-seen active'><p>Todas</p></li>
            <li className='filters-seen'><p>Not seen</p></li>
        </ul>
  )
}

export default FiltersNotification