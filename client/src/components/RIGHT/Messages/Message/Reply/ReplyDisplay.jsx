import React from 'react'
import './replyDisplay.css'
import {useQuery} from 'react-query'
import userService from '../../../../../services/UserService';
import useUserRequest from '../../../../../hooks/auth/useUserRequest';
import { useCallbackRequest } from '../../../../../hooks/useCallbackRequest/useCallbackRequest';
import messageService from '../../MessageBox/service/MessageService';
import ComponentStateHandler from '../../../../../hooks/stateManagmentComponent/ComponentStateHandler';
import Loader from '../../../../../utilities/Loader';
const ReplyDisplay = ({messageId, isMyMessage}) => {


    const privateRequest = useUserRequest()
    const {data:messageData,isLoading, isError} = useCallbackRequest({request:messageService.getMessage, id:messageId, name:'message', privateRequest})
    
      const message = messageData?.data ?? {}
      const { data: userData } = useQuery(["user", message?.from], () => userService.getUser({ privateRequest, userId:message?.from}),{
       enabled:!!message?.from
      });
      
       const user = userData?.data ?? {};
   
    

  return (
    <div className='reply-display-container'>

       <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<Loader/>} ErrorMessageComponent={<>Error reply</>} >
       <p className='reply-display-username'>{user?.username}</p>
        <p className='reply-display-text'>{message?.text}</p>
       </ComponentStateHandler>
    </div>
  )
}

export default ReplyDisplay