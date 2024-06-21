import React, { useState } from 'react'
import { useGeoLocations } from './GeoLocation/useGeoLocations'
import UserService from '../services/UserService'
import { useQuery } from 'react-query'
import AuthProvider from '../zustand/AuthProvider'

const useQueryLocation = () => {
  
  
    const {userId} = AuthProvider()
    const [location, setLocation] = useState({})
    const LonLat = useGeoLocations()
    
    const [infoLocation, setInfoLocation] = useState({
        city: "", 
        state: "", 
        country: "", 
        workAt: ""
    })

    const editInfoLocation = ({name, value})=>{
        if(!name && !value) return 
        setInfoLocation((prev)=> {
            return {...prev, [name]: value}
        })
    }

    const {isLoading} = useQuery(["userLocation", userId], async  ()=> UserService.getUserLocation({latitude:LonLat?.location?.latitude, longitude: LonLat?.location?.longitude}), {
        onSuccess: (data)=>{
            if(!data) return null
            if(!data?.status === "200") return null
        
            const userLocation = {
                countryCode: data.data?.results[0]?.components?.country_code, 
                country: data.data?.results[0]?.components?.country, 
                city: data.data?.results[0]?.components?.county, 
                state: data.data?.results[0]?.components?.state, 
            } 
            setLocation(userLocation)
        }, 
        enabled: !!LonLat.location.latitude && !!LonLat.location.longitude
    })

    return {
        isLoading, 
        infoLocation, 
        location, 
        editInfoLocation, 
        LonLat
    }
}

export default useQueryLocation