import React from 'react'
import './MessageBoxHeader.css'
import rem from '../../../../../assets/rem.jpg'
import cross from '../../icons/simbolo-x.png'
import minimizeIcon from '../../icons/menos.png'

import MenuMessageBox from '../MenuMessageBox/MenuMessageBox'
const MessageBoxHeader = ({ minimize, friend, deleteConversation, conversation}) => {
    return (
        <div className='MessageBox-header-container'>
            <div className='MessageBox-header-info'>
                <div>
                    <img className='profile-photo' src={rem} alt="profile info " />
                </div>
                <div className='header-username-container'>
                    <h5 className=''>{friend.username}</h5>
                    <p className='online-status'>{friend?.status === "Online" ? <>Activo(a) ahora</> : <>Desconectado</>}</p>
                </div>
            </div>
            <div className='MessageBox-header-actions'>
                <img className='minimize-icon' src={minimizeIcon} alt="minimze" onClick={() => minimize((prev) => !prev)} />
                <img className='cross-icon' src={cross} alt="delete" onClick={()=> deleteConversation(conversation?._id)} />
               <MenuMessageBox conversation={conversation}/>
            </div>


        </div>
    )
}

export default MessageBoxHeader