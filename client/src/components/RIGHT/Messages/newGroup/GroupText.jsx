import React, { Suspense, useState } from 'react'
import ConfirmationModal from '../../../modal/ConfirmationModal'
import Group from './Group'
import Loader from '../../../../utilities/Loader'

const GroupText = () => {
    const [isOpen, setIsOpen] = useState(false)

    

  return (
    <>

    <span className="conversation-newGroup" style={{cursor:'pointer'}} onClick={()=> setIsOpen(true)}>New group</span>
    {isOpen && (
      <Suspense fallback={<Loader/>}>
         <ConfirmationModal isOpen={isOpen} handleClose={setIsOpen} >
           <Group
         />
        </ConfirmationModal>
    </Suspense>
  )}
    </>
  )
}

export default GroupText