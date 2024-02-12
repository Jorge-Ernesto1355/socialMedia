import React from 'react'
import AuthProvider from '../../../../zustand/AuthProvider'
import PostServices from '../services/PostServices'
import { useMutation } from 'react-query'
import useUserRequest from '../../../../hooks/auth/useUserRequest'
import SingleComponent from '../../../../utilities/SingleComponent'

import { Button } from 'antd'

const ButtonSendPost = ({user, postId, text}) => {
    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const {mutate, isLoading, isError, isSuccess} = useMutation({
        mutationKey: ["sharePost", postId], 
        mutationFn: PostServices.sharePostMessage
      })

   
        if(!user) return 
        if(text?.length < 0 ) return 
        
      const handleMutate = ()=>{
        
        mutate({
          postId,
          to:user?._id,
          from:userId, 
          text,   
          privateRequest,
      })
      
      }
      return (
            <SingleComponent
             isLoading={isLoading}
             isError={isError}
             isSuccess={isSuccess}
             loader={<Button type='primary' size='small' className='btn-colored' loading={isLoading}></Button>}
             errorMessage={<Button type="primary" danger size='small'> Error </Button>}
             successMessage={<Button type='primary' size='small' className='btn-colored' >Enviado</Button>
   
            }>
                 
                 <Button type='primary' size='small' className='btn-colored'  onClick={()=> handleMutate()}>
                        Enviar
                 </Button>
            </SingleComponent>
      )
    }


export default ButtonSendPost