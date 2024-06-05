import React from 'react'
import './profileContent.css'
import { Avatar, Button, Skeleton } from 'antd'
import {  CameraOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import ModalProfilePicture from '../modalProfilePicture/ModalProfilePicture';
import { useQuery } from 'react-query';
import UserService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll/useInfiniteScroll';
import ModalEditProfile from './modalEditProfile/ModalEditProfile';
const Content = ({userId}) => {

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
             <Avatar className='profile-content-avatar' icon={<UserOutlined />}  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 150, xxl: 150 }} src={user?.imageProfile?.url}/>
               <ModalProfilePicture userId={userId}>
               <span className='profile-flaticon'>
                 <CameraOutlined/>
               </span>
               </ModalProfilePicture>

          </div>
           <div className='profile-content-user-information'>
               {isLoading ? <Skeleton.Input block size='small'/> : <h2>{user?.username}</h2>}
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
        <ModalEditProfile userId={userId}/>
      </div>
    </div>
  )
}

export default Content