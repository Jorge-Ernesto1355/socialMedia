import React, { useEffect, useState } from 'react'
import { useRefreshToken } from '../../hooks/auth/useRefreshToken'
import AuthProvider from '../../zustand/AuthProvider'
import SpinnerLoader from '../../stylesComponents/spinnerLoader/SpinnerLoader'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthService from '../../pages/services/AuthServices'
import { useMutation } from 'react-query'

const PersitsLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    
    const Auth = AuthProvider()
    const navigate = useNavigate()

    const { mutate: refresh } = useMutation({
        mutationFn: AuthService.refreshToken, 
        onSuccess:(data)=>{
            const accessToken = data.data || null
            Auth.setAccessToken(accessToken)
        }, 
        onError:()=>{
            navigate('/login')
        }
    })

    useEffect(()=>{

        let isMounted = true
        const verifyRefreshToken =  ()=>{
            
            try {
                const refreshToken = Auth.getRefreshToken()
                
                refresh(refreshToken)
            } catch (error) {
               
                setIsLoading(false)
            }finally{
               isMounted && setIsLoading(false)
            }
        }

        !Auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    
        return () => {
            isMounted = false
        }

    }, [])

    useEffect(()=>{
        
        console.log(`at: ${JSON.stringify(Auth?.accessToken)}`)
    }, [isLoading])



  return (
    <>
       {!Auth.persits ? <Outlet/> :  (
        <>
            {isLoading ? <SpinnerLoader/> : <Outlet/>}
        </>
       ) }
    </>
  )
}

export default PersitsLogin