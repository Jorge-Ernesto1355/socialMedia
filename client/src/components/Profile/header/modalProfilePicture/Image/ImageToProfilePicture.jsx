import React from 'react'
import { useMutation } from 'react-query'
import UserService from '../../../../../services/UserService'
import { message } from 'antd'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import SpinnerLoader from '../../../../../stylesComponents/spinnerLoader/SpinnerLoader'

const ImageToProfilePicture = ({img, setImageUrl, userId}) => {

    const privateRequest = useUserRequest()
    const {mutate, isLoading} = useMutation({
        mutationFn: UserService.editProfilePicture, 
        mutationKey: ['editProfile'], 
        onSuccess: (data)=> {
            if(!data) return  
            setImageUrl(data.data?.url)
            message.success("photo upladed succefully")
        }, 
        onError: ()=>  message.success("Something went wrong")
    })

    const handleImage = ()=>{
        mutate({imageObject: img, id: userId, privateRequest})
        
    }

  
    
  return (
    <li className="modal-profile-photo" onClick={()=> handleImage()}>
     <div className="image-container">
        <img src={img?.url} alt="suggested profile picture" className="profile-image" />
        <div className="overlay">
          {isLoading ? <SpinnerLoader center={true}/> :   <p className="overlay-button" >Choose picture</p> }
        </div>
      </div>
      
    </li>
  )
}

export default ImageToProfilePicture