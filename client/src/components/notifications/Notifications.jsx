import React from 'react'

import './NotificationModal.css'
import { NotificationService } from './services/notificationsService'
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll'
import InfiniteScroll from 'react-infinite-scroll-component'
import NotificationLoader from './Loader/NotificationLoader'
import FillNotificationModal from './Loader/FillNotificationModal'
import Notification from './notification/Notification'
import AuthProvider from '../../zustand/AuthProvider'
import FiltersNotification from './filtersNotifications/FiltersNotification'
import OptionsNotifications from './OptionsNotifications'
import useUserRequest from '../../hooks/auth/useUserRequest'
import ComponentStateHandler from '../../hooks/stateManagmentComponent/ComponentStateHandler'
import EmptyMessage from './EmptyMessage'
import { Button } from 'antd'
import { Link } from 'react-router-dom'




const Notifications = () => {
    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const {results, isLoading, isError, fetchNextPage, hasNextPage} = useInfiniteScroll({request: NotificationService.getAll, name:'notification', id:userId, privateRequest})
  return (
   <ul  
     className="notification-modal"
     >
   <div className='notifications-header'>
   <h3>Notifications</h3>
    <OptionsNotifications/>
   </div>
   <FiltersNotification/>
   <div className='notifications-info'>
      <h6 className='notifications-new'>Nuevas</h6>
      <Link to={`notifications/${userId}`}>
        <Button type='link' className='notification-seeAll' >Ver todo</Button>
      </Link>
   </div>
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
      
    </ul>
  )
}

export default Notifications