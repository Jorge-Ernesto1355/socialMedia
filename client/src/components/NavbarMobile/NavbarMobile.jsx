import { BellOutlined, HomeOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Avatar, Flex, Segmented, Skeleton, Typography } from 'antd'
import React from 'react'
import './NavbarMobile.css'
import BellIcon from './icons/BellIcon';
import HomeIcon from './icons/HomeIcon';
import Group from './icons/Group';
import MessengerIcon from '../Navbar/messengericon/MessengerIcon';
import ConversationsIcon from './icons/ConversationsIcon';
import { objectNavbar } from './utils/objetNavbar';
import AuthProvider from '../../zustand/AuthProvider';
import UserService from '../../services/UserService';
import { useQuery } from 'react-query';
import useUserRequest from '../../hooks/auth/useUserRequest';
import { Link } from 'react-router-dom';
const { Text, Title} = Typography;
const NavbarMobile = () => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const { data: user, isLoading: isLoadingUser } = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId }));



    const options = [
        {
          label: (
            <li className='navbar-mobile-item active'>
                 <span className='navbar-mobile-icon'> 

                        {isLoadingUser && <Skeleton.Avatar active />}
                        {!isLoadingUser && <Avatar icon={<UserOutlined/>} src={user?.imageProfile?.url} />}
                 </span>
                 <Text type='secondary' className='navbar-mobile-text'>Profile</Text>
            </li>
          ),
          link: `profile/${userId}`,
          value: objectNavbar.profile,
        },
        {
            label: (
                <li className='navbar-mobile-item'>
                     <span className='navbar-mobile-icon'><BellIcon/></span>
                     <Text type='secondary' className='navbar-mobile-text'>Notifications</Text>
                </li>
              ),
              link: `notifications/${userId}`,
              value: objectNavbar.notifications,
          },
          {
            label: (
                <li className='navbar-mobile-item' >
                    <span className='navbar-mobile-icon'><HomeIcon/></span>
                    <Text type='secondary' className='navbar-mobile-text'>Home</Text>
                </li>
              ),
              link: "/",
              value: objectNavbar.home,
          },
          {
            label: (
              <li  className='navbar-mobile-item'>
                   <span className='navbar-mobile-icon'><Group></Group></span>
                    <Text type='secondary' className='navbar-mobile-text'>Friends</Text>
              </li>
            ),
            link: `friends/${userId}`,
            value: objectNavbar.friends,
          },
          {
            label: (
              <li  className='navbar-mobile-item'>
                    <span className='navbar-mobile-icon'><ConversationsIcon/></span>
                    <Text type='secondary' className='navbar-mobile-text'>Messenger</Text>
              </li>
            ),
            link: `conversations/${userId}`,
            value: objectNavbar.conversation,
          },
      ] 
    
     
  return (
   
     <ul className='navbar-mobile-container'>
            {options.map(({label, value, link})=> (
                <>
                    <Link style={{width: "100%", height: "100%"}} to={link} key={value}>
                     {React.cloneElement(label, {key: value})}
                    </Link>
                </>
            ))}
           
     </ul>
   
  
  )
}

export default NavbarMobile