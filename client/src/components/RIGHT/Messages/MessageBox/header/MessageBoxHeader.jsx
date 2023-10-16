import React from 'react'
import './MessageBoxHeader.css'
import rem from '../../../../../assets/rem.jpg'
import cross from '../../../../../assets/cross.png'
import minimize from '../../icons/minimize.png'
const MessageBoxHeader = () => {
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
                <img className='minimize-icon' src={minimize} alt="" />
                <img className='cross-icon' src={cross} alt="" />
            </div>


        </div>
    )
}

export default MessageBoxHeader