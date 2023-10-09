
import AuthService from '../../pages/services/AuthServices'
import { useMutation } from 'react-query'
import AuthProvider from '../../zustand/AuthProvider'

export function UseRefreshToken() {

    const Auth = AuthProvider()



    const { isError, mutate } = useMutation({
        mutationFn: AuthService.refreshToken,
        onSuccess: (data) => {

            const refreshToken = data?.data || null
            Auth.setAccessToken(refreshToken)
        }
    })


    if (isError) return null



    return mutate

}

