import React from 'react'
import './UserTagged.css'
import { useCallbackRequest } from '../../../../../hooks/useCallbackRequest/useCallbackRequest'
import userService from '../../../../../services/UserService'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import ComponentStateHandler from '../../../../../hooks/stateManagmentComponent/ComponentStateHandler'

import rem from '../../../../../assets/rem.jpg'
import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader'
const UsersTagged = ({postId}) => {
    const privateRequest = useUserRequest()

    const {data:usersData, isLoading, isError} = useCallbackRequest({request:userService.usersTagged, name:'usersTagged', id:postId, privateRequest })

    const users = usersData?.data ?? []      
  return (
    <div className='usersTagged-container'>
      
      <h5>users</h5>
        <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<SpinnerLoader/>} ErrorMessageComponent={<div>error</div>}>
          {
            <ul className='imageProfiles-container'>
              {!!users && users.map((user)=>(
               <div key={`imageProfile-key=${user?._id}`} className='usersTagged-imageProfile'>
               <img
               
							src={user?.ProfilePicture ? user?.ProfilePicture : rem}
							alt="user"
             
						/>
               </div>
              ))}
            </ul>
          }
        </ComponentStateHandler>      
    </div>
  )
}

export default UsersTagged