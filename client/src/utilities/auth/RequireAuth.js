import {useLocation , Navigate, Outlet }  from 'react-router-dom'
import AuthProvider from '../../zustand/AuthProvider'

const RequireAuth = ()=>{
    const {} = AuthProvider
    const location = useLocation()

    return {
        auth?.user
    }
}