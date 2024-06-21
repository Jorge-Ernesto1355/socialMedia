import React from 'react'
import './MessageBoxHeader.css'
import rem from '../../../../../assets/rem.jpg'
import cross from '../../icons/simbolo-x.png'
import minimizeIcon from '../../icons/menos.png'
import MenuMessageBox from '../MenuMessageBox/MenuMessageBox'

import SimpleLineLoader from '../../../../Loaders/SimpleLineLoader'
import Image from '../../../../../utilities/Image'
import { Avatar, Badge, Tooltip, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Text, Title} = Typography;
const MessageBoxHeader = ({ minimize, deleteConversation, conversation, isLoading, user}) => {
   
    return (
        <div className='MessageBox-header-container'>
            <div className='MessageBox-header-info'>
                
                <Badge status='success' dot={true} offset={[-10, 45]} size={20} style={{width: "9px", height: "9px"}}>
                      <Avatar  src={user?.imageProfile?.url} icon={<UserOutlined/>} size={50} alt="user"/>
                </Badge>
                
                <div className='header-username-container'>
                    {isLoading  && <SimpleLineLoader/>}
                    {!isLoading && <> 
                    <Title level={5} style={{marginBottom: 0}}>{user?.username}</Title>
                    <Text type='secondary'>{user?.status === "Online" ? <>Activo(a) ahora</> : <>Desconectado</>}</Text>
                    </>}
                </div>
            </div>
            <div className='MessageBox-header-actions'>
            
         
        <Tooltip title={'minimize'}>
           <img className='minimize-icon' src={minimizeIcon} alt="minimze" onClick={() => minimize((prev) => !prev)} />
        </Tooltip>

        <Tooltip title={"close window"}>
                <img className='cross-icon' src={cross} alt="delete" onClick={()=> deleteConversation(conversation?._id)} />
        </Tooltip>
            <MenuMessageBox conversation={conversation}/>
            </div>


        </div>
    )
}

export default MessageBoxHeader