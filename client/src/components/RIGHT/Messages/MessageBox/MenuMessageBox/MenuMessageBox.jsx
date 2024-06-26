import React from 'react'

import menu from '../../icons/menu.png'
import call from '../../icons/llamada-telefonica.png'
import camara from '../../icons/camara.png'

import messenger from '../../icons/mensajero.png'
import user from '../../icons/usuario.png'
import './menuMessageBox.css'
import BlockContact from './BlockContact'
import { useSocket } from '../../../../../hooks/useSocket'
import AuthProvider from '../../../../../zustand/AuthProvider'
import { Popover } from 'antd'


const MenuMessageBox = ({conversation}) => {

  const socket = useSocket()
  const {userId} = AuthProvider()
  
  const content = (
    <ul className='menuMessageBox-container'>
            <li className='menuMessageBox-item'>
                <img  className='menuMessageBox-img' src={messenger} alt="" />
                <p className='menuMessageBox-text'>Abrir en Messenger</p>
            </li>
            <li className='menuMessageBox-item'>
                <img className='menuMessageBox-img' src={user} alt="" />
                <p className='menuMessageBox-text'>View Profile</p>
            </li>
            <li className='menuMessageBox-item' onClick={()=> socket?.emit('joinRoom', {to:userId, room:1})}>
                <img className='menuMessageBox-img' src={call} alt="" />
                <p className='menuMessageBox-text'>Start call</p>
            </li>
            <li className='menuMessageBox-item'>
                <img className='menuMessageBox-img' src={camara} alt="" />
                <p className='menuMessageBox-text'>Start video call</p>
            </li>
            <BlockContact conversation={conversation}/>
          </ul>
  )
  
  return (
    
        <Popover trigger={"click"} content={content}>
            <img src={menu} className='menu-message' alt="more"/>
        </Popover>
    
   
  )
}

export default MenuMessageBox