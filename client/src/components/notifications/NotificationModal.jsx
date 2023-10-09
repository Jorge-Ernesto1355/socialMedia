import React from 'react'
import {motion} from 'framer-motion'

import { variantsNotification } from './variants'
import { useSelector } from 'react-redux'
import './NotificationModal.css'
import { NotificationService } from './services/notificationsService'
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll'
import InfiniteScroll from 'react-infinite-scroll-component'
import NotificationLoader from './Loader/NotificationLoader'
import FillNotificationModal from './Loader/FillNotificationModal'
import Notification from './notification/Notification'



const NotificationModal = ({isOpen}) => {

    const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);
    const {results, isLoading, isError, fetchNextPage, hasNextPage} = useInfiniteScroll({request: NotificationService.getAll, name:'notification', id:currentUser})

console.log(results)

  return (
    <InfiniteScroll 
    dataLength={results.length}
      hasMore={hasNextPage || isLoading}
      loader={<NotificationLoader/>}
      next={() => fetchNextPage()}
    >
    <motion.ul
      variants={variantsNotification}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hidden"}`}
      className="notification-modal"
    >
    <FillNotificationModal isError={isError} isLoading={isLoading}/>
     {results?.map((notification)=> (
        <Notification key={`notifiation-key=${notification?._id}`} Notification={notification}/>
     ))}
    </motion.ul>
    </InfiniteScroll>
  )
}

export default NotificationModal