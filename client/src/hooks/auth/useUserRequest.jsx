/* eslint-disable dot-notation */


import AuthProvider from '../../zustand/AuthProvider'
import { userRequest } from '../../utilities/requestMethod'
import UseRefreshToken from './UseRefreshToken'
import { useEffect } from 'react'

const useUserRequest = () => {
    /**
     * Custom hook to make HTTP requests with axios.
     * Handles intercepting requests and responses,
     * and also handles refreshing the access token if it has expired.
     *
     * @returns {object} - The userRequest instance of axios.
     */

    const Auth = AuthProvider()
    const mutateRefresh = UseRefreshToken()

      useEffect(()=>{

        userRequest.interceptors.request.use(
            config => {

                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${Auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

         userRequest.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const refreshToken = Auth.getRefreshToken() || null
                    mutateRefresh(refreshToken)
                    if (Auth.accessToken) {
                        prevRequest.headers['Authorization'] = `Bearer ${Auth.accessToken}`
                    }
                    return userRequest(prevRequest)
                } 

                return Promise.reject(error)

            }
        )

        return ()=>{
            userRequest.interceptors.response.eject()
            userRequest.interceptors.request.eject()
        }

      }, [Auth, mutateRefresh])

    return userRequest
}

export default useUserRequest