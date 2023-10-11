import axios from "axios"

const { publicRequest, BASE_URL } = require("../../utilities/requestMethod")


class AuthService {
    static async Register(user){
        try {
            
            return publicRequest.post('/auth/register', user)
        } catch (error) {
             return error
        }
    }

    static async Login(user){
        try {
            return publicRequest.post('/auth/login', user)
        } catch (error) {
            return error
        }
    }

    static async refreshToken(refresh){

        const config = {
            headers:{
              "Authorization": `Bearer ${refresh}`,
            }
          };
        try {
            return axios.put(BASE_URL+'/auth/refresh', {}, config)
        } catch (error) {
            return error
        }
    }

    static async logOut(refresh){
        const config = {
            headers:{
              "Authorization": `Bearer ${refresh}`,
            }
          };

        try {
            return axios.put(BASE_URL + '/auth/logout', {}, config)
        } catch (error) {
            return error
        }
    }
}

export default AuthService