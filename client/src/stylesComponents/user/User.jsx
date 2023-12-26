import React, { useMemo } from 'react'
import './User.css'
import rem from '../../assets/rem.jpg'
import Image from '../../utilities/Image'
import GroupStore from '../../zustand/GroupStore'
const User = ({hit, itemsProps}) => {

const {addParticipant} = GroupStore()


    

 const user = useMemo(()=>{
        return {
            _id: hit?.objectID,
            username: hit?.username,
            imageProfile: hit?.imageProfile?.url
            
        }
 }, [hit.objectID])

  return (
    <div className='user-container' {...itemsProps}>
        <div className='user-information'>
                <div className='profile-photo'>
                    <Image rounded={true} src={hit?.imageProfile?.url ?? rem}/>
                </div>
            <div className='user-profile'>
            <h5 className='user-name'>{hit?.username}</h5>
            <p className='user-description text-muted'>{hit?.description}</p>
            </div>
        </div>
        <div className='user-actions'>
            <p onClick={()=> addParticipant(user)}>Agregar</p>
        </div>
         
    </div>
  )
}

export default User