
import { userRequest } from '../../../../utilities/requestMethod'

const OptionsRequestFriends = ({userAccept, userRequestFriend, accept}) => {
   try {
        return userRequest.put(`/users/friend/request/accept?userAccept=${userAccept}&userWaiting=${userRequestFriend}&accept=${accept}`)
   } catch (error) {
    return error
   }
}

export default OptionsRequestFriends