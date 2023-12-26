import React from 'react'
import Participant from './Participant'
import './Participants.css'
import GroupStore from '../../../../../zustand/GroupStore'

const Participants = () => {

    const {getParticipants} = GroupStore()
   
  return (
    <div>
       <h4 className='group-title-participant'>Participants</h4>
       {getParticipants()?.length <= 0 ? <p className='text-muted no-pa'>there is no any participant yet</p> : (
         <ul className='participants-container'>
         {!!getParticipants && getParticipants()?.map((participant => (
             <Participant key={`participant-key=${participant?._id}`} participant={participant}  />
         )))}
         
        </ul>
       )}
    </div>
  )
}

export default Participants