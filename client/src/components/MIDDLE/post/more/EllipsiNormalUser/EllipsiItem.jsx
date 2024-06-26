import React from 'react'
import { OptionsMoreObject } from '../optionsMoreObject/OptionsMoreObject'
import AuthProvider from '../../../../../zustand/AuthProvider'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'

import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import { message } from 'antd'


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
       <div className='ellipsi-body-item'>
       {icon}
        <div className='ellipsis-body'>
         {title}
         {isLoadingMutation ? <SpinnerLoader/> : <>{props?.description}</>}   
        </div>
       </div>
       
        
   </li>
  )
}

export default EllipsiItem