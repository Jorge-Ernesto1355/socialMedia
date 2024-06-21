import React from 'react'

const SmileIcon = ({...props}) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
        <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z" fill="#1C274C"/>
        <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C"/>
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default SmileIcon