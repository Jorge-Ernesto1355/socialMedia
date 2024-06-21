import React from 'react'
import './NotificationsPage.css'
import { Typography } from 'antd';
import NotificationLoader from '../../components/notifications/Loader/NotificationLoader';
import Notification from '../../components/notifications/notification/Notification';
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll';
import { NotificationService } from '../../components/notifications/services/notificationsService';
import useUserRequest from '../../hooks/auth/useUserRequest';
import AuthProvider from '../../zustand/AuthProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import ComponentStateHandler from '../../hooks/stateManagmentComponent/ComponentStateHandler';
import FillNotificationModal from '../../components/notifications/Loader/FillNotificationModal';
import EmptyMessage from '../../components/notifications/EmptyMessage';


const { Text, Title} = Typography;
const NotificationsPage = () => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const {results, isLoading, isError, fetchNextPage, hasNextPage} = useInfiniteScroll({request: NotificationService.getAll, name:'notification', id:userId, privateRequest})
  return (
    <div className='notificationPage-container'>
            <div className='notificationPage-float'>
                <Title level={4}>Notifications</Title>
                <InfiniteScroll
                    dataLength={results.length}
                    hasMore={hasNextPage || isLoading}
                    loader={<NotificationLoader/>}
                    next={() => fetchNextPage()}
                    >
                    <ComponentStateHandler isLoading={isLoading} isError={isError} ErrorComponent={<>error notifications</>} Loader={<FillNotificationModal/>} items={results} EmptyMessage={<EmptyMessage/>}>
                    {results?.map((notification)=> (
                    <Notification key={`notifiation-key=${notification?._id}`} Notification={notification}/>
                    ))}
                    </ComponentStateHandler>
                </InfiniteScroll>
            </div>
    </div>
  )
}

export default NotificationsPage