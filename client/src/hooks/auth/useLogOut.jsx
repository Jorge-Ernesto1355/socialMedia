
import { useMutation } from 'react-query'
import AuthService from '../../pages/services/AuthServices'


const useLogOut = () => {

    const { mutate } = useMutation({
        mutationFn: AuthService.logOut,
        mutationKey: 'logout',
    })


    return { mutateSignOut: mutate }

}

export default useLogOut