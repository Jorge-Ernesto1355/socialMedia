import React from 'react'
import './MessageBoxHeader.css'
import rem from '../../../../../assets/rem.jpg'
import cross from '../../icons/cross.png'
import minimizeIcon from '../../icons/minimize.png'
const MessageBoxHeader = ({ minimize }) => {
    return (
        <div className='MessageBox-header-container'>
            <div className='MessageBox-header-info'>
                <div>
                    <img className='profile-photo' src={rem} alt="profile info " />
                </div>
                <div className='header-username-container'>
                    <h5 className=''>Jorge Ernesto</h5>
                    <p className='online-status'>Activo(a) ahora</p>
                </div>
            </div>
            <div className='MessageBox-header-actions'>
                <img className='minimize-icon' src={minimizeIcon} alt="minimze" onClick={() => minimize((prev) => !prev)} />
                <img className='cross-icon' src={cross} alt="delete" />
            </div>


        </div>
    )
}

export default MessageBoxHeader