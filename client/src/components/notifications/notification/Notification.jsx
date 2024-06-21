import React from 'react'
import './Notification.css'
import moment from 'moment'
import { Avatar, Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Paragraph from 'antd/es/typography/Paragraph'

const { Text} = Typography;
const Notification = ({Notification}) => {

if(!Notification) return null

const {receiver, sender, message, containerId, createdAt} = Notification

const formatedHour = moment(createdAt).format('h:mm A')

  return (
    <li className='notification-container unRead'>
        <div className='notification'>
				<Avatar size={40} src={receiver?.imageProfile?.url} icon={<UserOutlined/>} style={{marginRight: "1rem"}}/>
		
       <Flex className='notification-text'>
        <Paragraph >
           <Text strong style={{marginRight: ".2rem"}}>{sender?.username}</Text>
           <Text style={{marginRight: ".2rem"}} >{message}:</Text>
           <Text style={{marginRight: ".2rem"}}>{containerId?.description || containerId?.comment?.text}</Text>
        </Paragraph>
       </Flex>
       
        </div>
        <Text className='time-notification'>{formatedHour}</Text>
        
    </li>
  )
}

export default Notification