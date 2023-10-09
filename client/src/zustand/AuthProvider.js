import { create } from "zustand";

const AuthProvider = create((set, get)=> ({
  isAuthenticated:false, 
  accessToken:null, 
  refreshToken: null, 
  getRefreshToken: ()=>{
    if(get().refreshToken) return get().refreshToken
    const token = localStorage.getItem('token') || null
   
    if(token){
        const refresh = JSON.parse(token)
      
        return refresh

    }
    return null
    
  }, 
  saveUser: (userData) => {
    set({accessToken: userData.accessToken})
    set({refreshToken: userData.refreshToken})
    localStorage.setItem("token", JSON.stringify(userData.refreshToken))
  }, 
  setRefreshToken: (refreshToken)=> set({refreshToken}),
  setAccessToken:(accessToken) => set({accessToken})
 
}))

export default AuthProvider