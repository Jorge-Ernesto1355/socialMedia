import React from 'react'
import './profileContent.css'
import { Avatar, Button, Flex, Skeleton } from 'antd'
import {  CameraOutlined, EditOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import ModalProfilePicture from '../modalProfilePicture/ModalProfilePicture';
import { useQuery } from 'react-query';
import UserService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll/useInfiniteScroll';
import ModalEditProfile from './modalEditProfile/ModalEditProfile';
import ModalProhibitFooterOptions from './modalProhibitFooterOptions/ModalProhibitFooterOptions';
import AuthProvider from '../../../../zustand/AuthProvider';
const Content = ({userId}) => {


  const {userId: currentUser} = AuthProvider()
  const privateRequest = useUserRequest()
  const { data: user, isLoading} = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId, options: ["friends"] }));

  
 
 
  const { results, isLoading:isLoadingFriend} =
    useInfiniteScroll({
      name: "friends",
      request: UserService.getFriends,
      privateRequest,
      id: userId
    })

  

  return (
    <div className='profile-card-content'>
      <div className='profile-content-information'>
          <div className='profile-content-profilePicture'>
             <Avatar className='profile-content-avatar' icon={<UserOutlined />}  size={{ xs: 140, sm:100, md: 120, lg: 120, xl: 150, xxl: 150 }} src={user?.imageProfile?.url}/>
               <ModalProfilePicture userId={userId}>
                  <span className='profile-flaticon'>
                    <CameraOutlined/>
                  </span>
               </ModalProfilePicture>
          </div>
           <div className='profile-content-user-information'>
               {isLoading ? <Skeleton.Input block size='small'/> : <h3>{user?.username}</h3>}
               {isLoading ? <Skeleton.Input block size='small'/> : <span className='text-muted'>{results?.length} friends</span> }
               {isLoadingFriend ? (
                    <Avatar.Group>
                    <Skeleton.Avatar active={true} size={'middle'} shape={'circle'} />
                    <Skeleton.Avatar active={true} size={'middle'} shape={'circle'} />
                    <Skeleton.Avatar active={true} size={'middle'} shape={'circle'} />
                    <Skeleton.Avatar active={true} size={'middle'} shape={'circle'} />
                    </Avatar.Group>
               ): (
                  <>
                    {results?.map((friend)=> (
                      <Avatar key={friend?._id} src={friend?.imageProfile?.url} icon={<UserOutlined></UserOutlined>}/>
                    ))}
                  </>
               ) }
                
           </div>
      </div>
      <div className='profile-content-options'>
        <Flex vertical gap={10} >
            <ModalEditProfile userId={userId}/>
           {userId === currentUser && <ModalProhibitFooterOptions/>}
        </Flex>
      </div>
    </div>
  )
}

export default Content