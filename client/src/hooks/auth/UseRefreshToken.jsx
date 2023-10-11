import React from 'react'
import { useMutation } from 'react-query'
import AuthService from '../../pages/services/AuthServices'
import AuthProvider from '../../zustand/AuthProvider'
import { useNavigate } from 'react-router-dom'

const UseRefreshToken = () => {

  
    const navigate = useNavigate()
    const Auth = AuthProvider()

    const {mutate} = useMutation({
        mutationFn: AuthService.refreshToken, 
        mutationKey:'refresh',
        onSuccess: (data) => {
            const accessToken = data.data || null
            Auth.setAccessToken(accessToken)
        }, 
        onError:()=>{
            navigate('/login')
        }
    })

    return mutate
}

export default UseRefreshToken