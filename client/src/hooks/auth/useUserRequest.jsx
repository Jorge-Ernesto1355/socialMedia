/* eslint-disable dot-notation */
import { useEffect } from 'react'

import AuthProvider from '../../zustand/AuthProvider'
import { userRequest } from '../../utilities/requestMethod'

import { useMutation } from 'react-query'
import AuthService from '../../pages/services/AuthServices'

const useUserRequest = () => {
    /**
     * Custom hook to make HTTP requests with axios.
     * Handles intercepting requests and responses,
     * and also handles refreshing the access token if it has expired.
     *
     * @returns {object} - The userRequest instance of axios.
     */

    const Auth = AuthProvider()

    const { mutate: refresh } = useMutation({
        mutationFn: AuthService.refreshToken,
        onSuccess: (data) => {
            const accessToken = data.data || null
            Auth.setAccessToken(accessToken)
        }
    })

    useEffect(() => {
        const requestIntercept = userRequest.interceptors.request.use(
            config => {

                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${Auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseInterceptor = userRequest.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const refreshToken = Auth.getRefreshToken() || null
                    refresh(refreshToken)

                    if (Auth.accessToken) {
                        prevRequest.headers['Authorization'] = `Bearer ${Auth.accessToken}`
                    }
                    return userRequest(prevRequest)
                } else if (error?.response?.status === 404) {
                    console.log('error 404')
                } else if (error?.response?.status === 500) {
                    console.log('error 500')
                } else {
                    console.log('error ')
                }

                return Promise.reject(error)

            }
        )

        return () => {
            userRequest.interceptors.response.eject(responseInterceptor)
            userRequest.interceptors.request.eject(requestIntercept)
        }
    }, [Auth, refresh])

    return userRequest
}

export default useUserRequest