import React, { useCallback, useEffect } from 'react'
import Image from '../../../../utilities/Image'
import './UsersOnline.css'
import AliceCarousel from 'react-alice-carousel';
import rem from '../../../../assets/rem.jpg'
import 'react-alice-carousel/lib/alice-carousel.css';
import userService from '../../../../services/UserService';
import AuthProvider from '../../../../zustand/AuthProvider';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import UsersOnlineSkeletonLoader from './loader/UsersOnlineSkeletonLoader';
import ComponentStateHandler from '../../../../hooks/stateManagmentComponent/ComponentStateHandler';
import { responsive } from './utils/responsive';
import { useSocket } from '../../../../hooks/useSocket';
import { useQueryClient } from 'react-query';
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest';
import { Col, Statistic } from 'antd';

const UsersOnline = () => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const socket = useSocket()
    const queryClient = useQueryClient()
    const onlineQuery = ['usersOnline', userId]
    const {data, isLoading, isError} = useCallbackRequest({request:userService.usersOnline, name:"usersOnline", id:userId?.toString(), privateRequest})

    const handleSocket = (friendId) => () => socket?.emit('open-conversation', {to:friendId, from:userId})
    
    
   
    const items = data?.map((user)=>(
        
        <li key={user?._id} className='usersOnline-item' onClick={handleSocket(user?._id)}>
            <div className='profile-photo'>
                <Image src={user?.imageProfile?.url ? user?.imageProfile?.url : rem }/>
            </div>
            
        </li>
    ))

    const usersOnline = useCallback( async (user)=>{

        await queryClient.cancelQueries(onlineQuery)
    
         queryClient.setQueryData(['usersOnline', userId], (usersOnline)=>{
            
             const dataDocs = usersOnline?.pages[0]?.data?.docs ?? []
             const exist = dataDocs.find((userOnline)=> userOnline._id === user?._id)
             if(exist) return usersOnline
             const newDocs = [...dataDocs, user]
             const {docs, ...restData}  = usersOnline.pages[0].data
           
            return {
                pages: [
                   {
                    data:{
                        docs:newDocs, 
                        ...restData
                    }
                   }
                ]
            }
        })

    }, [socket])

    const usersDisconet = useCallback(async (user)=>{

        await queryClient.cancelQueries(onlineQuery)
    
         queryClient.setQueryData(['usersOnline', userId], (usersOnline)=>{
            
             const dataDocs = usersOnline?.pages[0]?.data?.docs ?? []
             const exist = dataDocs.find((userOnline)=> userOnline._id === user?._id)
             const {docs, ...restData}  = usersOnline.pages[0].data
             
             if(exist) {
                return {
                    pages: [
                       {
                        data:{
                            docs: dataDocs.filter((userOnline) => userOnline?._id !== user?._id) ?? [], 
                            ...restData
                        }
                       }
                    ]
                }
             }
             if(!exist) return usersOnline
            
        })

    }, [socket])

    useEffect(()=>{

        socket?.on('user-online', usersOnline)
        socket?.on('user-disconect',usersDisconet )

        return ()=>{
            socket?.off('userOnline')
            socket?.off('user-disconect')
        }
    }, [socket, usersOnline])




  return (
    <div className='usersOnline-container'>
       
        <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<UsersOnlineSkeletonLoader/>} ErrorMessageComponent={<p className='text-muted' >erro users</p>} items={data} >
        <Col span={12}>
      <Statistic title="Active Users" value={data?.length} />
    </Col>
        {data?.length <= 0 && <p className='usersOnline-description'>no Contacts online</p>}
       
        <AliceCarousel
         mouseTracking
        disableDotsControls
        disableButtonsControls
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        />
        </ComponentStateHandler>
    </div>

  )
}

export default UsersOnline