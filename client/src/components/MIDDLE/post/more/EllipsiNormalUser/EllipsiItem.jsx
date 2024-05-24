import React from 'react'
import { OptionsMoreObject } from '../optionsMoreObject/OptionsMoreObject'
import AuthProvider from '../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import { Skeleton, message } from 'antd'


const EllipsiItem = ({ postId, title, icon, successMessage, typeItem, ...props}) => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
   
    if (!typeItem || !OptionsMoreObject[typeItem]) {
        return null; 
      }
    // eslint-disable-next-line dot-notation
    const {mutate, isLoadingMutation, isSuccess, isError } = OptionsMoreObject[typeItem]({postId, userId}) 

    if(isSuccess) message.success(`has been ${successMessage}`)

    if(isError) message.error(`something went wrong`)
 
  return (
  <li onClick={()=> mutate({postId, userId, privateRequest, ...props})} className="ellipsiPost-item">
        {icon}
        <div className='ellipsis-body'>
        {isLoadingMutation ? <Skeleton.Input active={isLoadingMutation} size={"small"} /> : <>{title}</>}
        {props?.description}
        </div>
        
   </li>
  )
}

export default EllipsiItem