import React from 'react'
import './Reply.css'
import { useCallbackRequest } from '../../../../../hooks/useCallbackRequest/useCallbackRequest'
import messageService from '../../MessageBox/service/MessageService'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import { useQuery } from 'react-query'
import userService from '../../../../../services/UserService'
import ComponentStateHandler from '../../../../../hooks/stateManagmentComponent/ComponentStateHandler'
import moment from 'moment'
import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader'

const Reply = ({messageId = '', isMyMessage}) => {
   
 const privateRequest = useUserRequest()
 const {data:messageData,isLoading, isError} = useCallbackRequest({request:messageService.getMessage, id:messageId, name:'message', privateRequest})
 
   const message = messageData?.data ?? {}
   const { data: userData } = useQuery(["user", message?.from], () => userService.getUser({ privateRequest, userId:message?.from}),{
    enabled:!!message?.from
   });
   
    const user = userData?.data ?? {};

    const hour =  moment(message.createdAt).format(' HH:mm');

  return (
    <div className={`reply-container ${isMyMessage ? 'from-user'  : 'to-friend'}`}>
       <ComponentStateHandler style={{marginLeft:'5px'}} isLoading={isLoading} isError={isError} Loader={<SpinnerLoader/>} ErrorMessageComponent={<>error reply, we could not find the message</>} >
      <div className='reply-user-hour'>
        <span className='reply-username'>{user?.username}</span>
        <span className='reply-hour'>{hour}</span>
      </div>
        <p className='reply-text'>{message?.text}</p>
       </ComponentStateHandler>
    </div>
  )
}

export default Reply