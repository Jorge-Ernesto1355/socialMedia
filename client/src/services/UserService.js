export default class     userService{
    static  async getUser({privateRequest, userId}){
        
        try {
            if(!privateRequest)
              throw new Error('could not load the request')
            return privateRequest?.get(`/users/${userId}`)
        } catch (error) {
            return error
        }
    }

    static async requestFriends({privateRequest, id, limit, page}){
        
 
        try {
            if(!privateRequest)
          throw new Error('could not load the request')
            return  await privateRequest.get(
              `/users/friend/request/all/${id}?limit=${limit}&page=${page}`,
            );
          } catch (error) {
            return error;
          }
    }

    static async acceptFriend ({userId, addUserId, accept, privateRequest}) {
        try {
            if(!privateRequest)
                throw new Error('could not load the request')
             return privateRequest.put(`/users/friend/request/accept?userId=${userId}&addUserId=${addUserId}&accept=${accept}`)
        } catch (error) {
         return error
        }
     }
}