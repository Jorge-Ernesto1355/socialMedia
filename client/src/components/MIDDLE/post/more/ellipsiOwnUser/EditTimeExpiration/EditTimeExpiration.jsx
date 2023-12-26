import React from 'react'
import Popover from '../../../../../../hooks/Popover/Popover'
import timer from '../../../../crearPost/Difusion/icons/watch.png'
import AuthProvider from '../../../../../../zustand/AuthProvider'
import PostServices from '../../../services/PostServices'
import useUserRequest from '../../../../../../hooks/auth/useUserRequest'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { ObjectErrosName } from '../../../../../../utilities/ObjectErrorsName'
import { AxiosError } from 'axios'
import Loader from '../../../../../../utilities/Loader'
const EditTimeExpiration = ({postId}) => {

  const {userId} = AuthProvider()
  const privateRequest = useUserRequest()
  const {mutateAsync, isLoading} = useMutation({
    mutationFn: PostServices.editTimeExpiration, 
    mutationKey:['timeExpiration',postId], 
    onSuccess:(data)=>{
        
      if(data instanceof Error || data instanceof AxiosError) return toast.error(ObjectErrosName.wrong)
      toast.success("updated time Expiration succefully")

    }, 
    
  })


    const handleEditTimeExpiration = async  (time)=>{
   
     await mutateAsync({
      privateRequest,
         userId,
         postId, 
         timeExpiration: time
       })
    
   
    }

   
  return (
    <li className='ellipsiPost-item'>
       <Popover trigger={
        <div>
        <div className='editPost-content'>
        <img src={timer} alt="editar post" />
        <h6awaw className="ellipsiPost-text">Time</h6awaw>
        </div>
        <p className='ellipsiPost-description'>edit time Expiration from post</p>
        </div>
        }>
           <ul className='expirePost-container'>
        
           {isLoading ? <div style={{margin: '2rem'}}><Loader center={true}/></div> : (
            <>

              <li className='expirePost-item'>
                <p className='expirePost-text' onClick={()=> handleEditTimeExpiration(18000)} >5 Horas</p>
            </li>
            <li className='expirePost-item'>
                <p className='expirePost-text' onClick={()=> handleEditTimeExpiration(43200)} >12 Horas</p>
            </li>
            <li className='expirePost-item' >
                <p className='expirePost-text' onClick={()=> handleEditTimeExpiration(86400)} >24 Horas</p>
            </li>
            <li className='expirePost-item'>
                <p className='expirePost-text' onClick={()=> handleEditTimeExpiration()}>Always</p>
            </li>   
            </>
           )}
            
          </ul>
        </Popover>
    </li>
  )
}

export default EditTimeExpiration