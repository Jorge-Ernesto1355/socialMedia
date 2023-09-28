import React from 'react'
import './blurLoader.css'
const BlueLoader = ({ children }) => {
  return (
    <div className='blurLoader-container'>
      {children}
    </div>
  )
}

export default BlueLoader