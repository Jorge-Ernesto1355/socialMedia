import React from 'react'
import './MessageBoxHeader.css'
import rem from '../../../../../assets/rem.jpg'
import cross from '../../icons/simbolo-x.png'
import minimizeIcon from '../../icons/menos.png'
import MenuMessageBox from '../MenuMessageBox/MenuMessageBox'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../hooks/Popover/Tooltip'
import SimpleLineLoader from '../../../../Loaders/SimpleLineLoader'
import Image from '../../../../../utilities/Image'
const MessageBoxHeader = ({ minimize, deleteConversation, conversation, isLoading, user}) => {
   
    return (
        <div className='MessageBox-header-container'>
            <div className='MessageBox-header-info'>
                <div className='profile-photo'>
                    <Image rounded={true} src={rem}/>
                </div>
                <div className='header-username-container'>
                    {isLoading  && <SimpleLineLoader/>}
                    {!isLoading && <> 
                    <h5 className=''>{user?.username}</h5>
                    <p className='online-status'>{user?.status === "Online" ? <>Activo(a) ahora</> : <>Desconectado</>}</p>
                    </>}
                </div>
            </div>
            <div className='MessageBox-header-actions'>
            <Tooltip>
        <TooltipTrigger> <img className='minimize-icon' src={minimizeIcon} alt="minimze" onClick={() => minimize((prev) => !prev)} /></TooltipTrigger>
        <TooltipContent>Minimizar</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>  <img className='cross-icon' src={cross} alt="delete" onClick={()=> deleteConversation(conversation?._id)} /></TooltipTrigger>
        <TooltipContent>Eliminar</TooltipContent>
      </Tooltip>
               
               <MenuMessageBox conversation={conversation}/>
            </div>


        </div>
    )
}

export default MessageBoxHeader