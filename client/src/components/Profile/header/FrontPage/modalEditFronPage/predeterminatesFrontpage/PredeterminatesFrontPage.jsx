import React from 'react'
import { predeterminatesFrontPages } from './utils/predeterminatesFrontPages'
import AliceCarousel from 'react-alice-carousel'
import './predeterminates.css'
import SpinnerLoader from '../../../../../../stylesComponents/spinnerLoader/SpinnerLoader'
import useUserRequest from '../../../../../../hooks/auth/useUserRequest'
import { useMutation } from 'react-query'
import UserService from '../../../../../../services/UserService'
import { message } from 'antd'

const PredeterminatesFrontPage = ({setImageUrl, userId}) => {

    const responsive = {
        0: { items: 1 },
        268: { items: 2 },
        324: { items: 3 },
        524: { items: 4 },
        
    };

    const privateRequest = useUserRequest()
    const {mutate, isLoading} = useMutation({
        mutationFn: UserService.editCoverPicture, 
        mutationKey: ['editCoverPicture', userId], 
        onSuccess: (data)=> {
            if(!data) return  
            setImageUrl(data.data?.url)
            message.success("photo upladed succefully")
        }, 
        onError: ()=>  message.success("Something went wrong")
    })

    const handleImage = (frontPage)=>{
        mutate({imageObject:frontPage , id: userId, privateRequest})

    }
    



    const items = predeterminatesFrontPages?.map((frontPage)=>(
        <li key={frontPage.id} className='predeterminates-item' onClick={()=> handleImage(frontPage)}>
            <div className="predeterminates-image-container">
                <img src={frontPage?.url} alt="suggested profile picture" className="profile-image" />
                <div className="overlay">
                     {isLoading ? <SpinnerLoader/> :  <p className="overlay-button" >Choose picture</p> }
                </div>
            </div>
        </li>
    ))


  return (
    <div className='predeterminates-container'>
        <AliceCarousel
          mouseTracking
          disableDotsControls
          disableButtonsControls
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
        />
    </div>
  )
}

export default PredeterminatesFrontPage