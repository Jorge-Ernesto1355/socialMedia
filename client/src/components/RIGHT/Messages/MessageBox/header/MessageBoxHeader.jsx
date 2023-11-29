import React from 'react'
import './MessageBoxHeader.css'
import rem from '../../../../../assets/rem.jpg'
import cross from '../../icons/simbolo-x.png'
import minimizeIcon from '../../icons/menos.png'

import MenuMessageBox from '../MenuMessageBox/MenuMessageBox'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../hooks/Popover/Tooltip'
import userService from '../../../../../services/UserService'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import AuthProvider from '../../../../../zustand/AuthProvider'
import SimpleLineLoader from '../../../../Loaders/SimpleLineLoader'
import Image from '../../../../../utilities/Image'
const MessageBoxHeader = ({ minimize, friend, deleteConversation, conversation}) => {
    const privateRequest = useUserRequest()
    const {userId} = AuthProvider()
    const friendId  = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
    const { data: userData, isLoading} = useQuery(["user", friendId], () => userService.getUser({ privateRequest, userId:friendId }), {
        onError:()=>{
            toast.error('something went wrong with your friend')
            deleteConversation(conversation?._id)
        }
    });
    const user = userData?.data ?? {};


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