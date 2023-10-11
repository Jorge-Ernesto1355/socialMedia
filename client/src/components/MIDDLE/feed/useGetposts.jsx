
import useUserRequest from '../../../hooks/auth/useUserRequest'

const useGetPosts = (props) => {

    const userRequest = useUserRequest()

    const request = async () => {
        try {
            return await userRequest.get(`/post?limit=${3}&page=${1}`)
        } catch (error) {
            return error
        }
    }

    return request
}

export default useGetPosts