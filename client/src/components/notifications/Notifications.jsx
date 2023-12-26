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
      <p className='notification-seeAll' >Ver todo</p>
   </div>
    <InfiniteScroll 
    dataLength={results.length}
    hasMore={hasNextPage || isLoading}
    loader={<NotificationLoader/>}
    next={() => fetchNextPage()}
    >
    <FillNotificationModal isError={isError} isLoading={isLoading}/>
     {results?.map((notification)=> (
       <Notification key={`notifiation-key=${notification?._id}`} Notification={notification}/>
       ))}
    </InfiniteScroll>
      
    </ul>
  )
}

export default Notifications