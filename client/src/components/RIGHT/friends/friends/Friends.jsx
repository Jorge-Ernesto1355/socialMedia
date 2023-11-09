import React from 'react'
import './Friends.css'
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll/useInfiniteScroll'
import userService from '../../../../services/UserService'
import useUserRequest from '../../../../hooks/auth/useUserRequest'
import AuthProvider from '../../../../zustand/AuthProvider'
import Friend from '../Friend/Friend'
import ComponentStateHandler from '../../../../hooks/stateManagmentComponent/ComponentStateHandler'
import Loader from '../../../../utilities/Loader'
import { ToastContainer } from "react-toastify";
const Friends = () => {
    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()

    const {results, isLoading, isError} = useInfiniteScroll({request:userService.friends, id:userId, privateRequest, name:"friends"})
    
  return (
    <ul>
    <ComponentStateHandler Loader={<Loader />} isError={isError} isLoading={isLoading} ErrorMessageComponent={<div/>} items={results}>
       
    {results?.map((friend)=>(
        <Friend key={`friend-key=${friend?._id}`} friend={friend}/>
    ))}
      </ComponentStateHandler>
      <ToastContainer/>
    </ul>
  )
}

export default Friends