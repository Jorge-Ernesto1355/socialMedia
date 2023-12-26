import React from 'react' 
import './Participant.css'
import Image from '../../../../../utilities/Image'
import rem from '../../../../../assets/rem.jpg'
import deleteIcon from './icons/delete.png'
import GroupStore from '../../../../../zustand/GroupStore'
import {AnimatePresence, motion} from 'framer-motion'
const Participant = ({participant = {}}) => {

  const {deleteParticipant} = GroupStore()

  return (
    <AnimatePresence>
    <motion.div  initial={{ scale: 0 }}
    animate={{  scale: 1 }} 
    exit={{scale: 0}}
   className='participant-container' >
        <div className='profile-photo'>
                    <Image rounded={true} src={participant?.imageProfile ?? rem}/>
                </div>
               <div className='participant-information'>
               <p className='participant-name'>{participant?.username}</p>
               <img onClick={()=> deleteParticipant(participant?._id)} src={deleteIcon} alt="delete user" className='delete-participant' />
               </div>

    </motion.div>
    </AnimatePresence>
  )
}

export default Participant