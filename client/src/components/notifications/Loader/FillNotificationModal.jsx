import React from 'react'
import NotificationLoader from './NotificationLoader'

const FillNotificationModal = ({isLoading, isError}) => {

    if(!isLoading && !isError) return null
   
  return (
    <>
    {isLoading && !isError &&(
       <>
        <NotificationLoader/>
        <NotificationLoader/>
        <NotificationLoader/>
        <NotificationLoader/>
        <NotificationLoader/>
       </>
    )}
    </>
  )
}

export default FillNotificationModal