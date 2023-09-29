import React, { useEffect } from 'react'
import ReactPortal from './ReactPortal'
import {motion} from 'framer-motion'
import './ConfirmationModal.css'
import { variantsMotion } from '../../utilities/variantsMotion'


 const ConfirmationModal = ({isOpen, children, handleClose}) => {

    useEffect(()=>{
        const closeOnScapeKey = (event)=> event?.key === 'Escape' &&  handleClose()
           
        document.body.addEventListener('keydown',  closeOnScapeKey)
        return ()=>{
            document.body.removeEventListener('keydown', closeOnScapeKey)
        }
    }, [handleClose])

    useEffect(()=>{
         if(isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'relative'
         }

        return ()=>{
            document.body.style.overflow = 'unset'
        }

    }, [isOpen])

    if(!isOpen) return null

  

  return (
    <ReactPortal wrapperId={'react-portal-modal'} closeModal={handleClose}>
        <motion.div initial={{scale:0, opacity:0}} animate={`${isOpen ? 'show' : 'hidden'}`} variants={variantsMotion} className='react-portal-modal-container'>
        {children}
        </motion.div>
    </ReactPortal>
  )
}

export default ConfirmationModal
