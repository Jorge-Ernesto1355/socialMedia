
import useUserRequest from '../../../hooks/auth/useUserRequest'

const useGetPosts = async  ({privateRequest}) => {

    

    
        try {
            return await privateRequest.get(`/post?limit=${3}&page=${1}`)
        } catch (error) {
            return error
        }
    


}

export default useGetPosts