import React from 'react'
import './DifucionModal.css'
import {motion } from 'framer-motion'
import { variantsMotion } from '../../../../utilities/variantsMotion'
import global from './icons/globo.png'
import friends from './icons/usuarios-alt.png'
import candado from './icons/cerrar.png'
import CreatePostStore from '../../../../zustand/CreatePostStore'

const OPTIONS_DIFUSION = {
    OnlyYou:'Only you', 
    Friends:'Friends', 
    Public:'Public'
}
const DifusionModal = ({ isOpen, closeModal}) => {

    const {setDifusion} = CreatePostStore()
    const HandleDifusion = (difusion) =>{
        setDifusion(difusion)
        closeModal(false)
    } 
  return (
    <motion.ul
      variants={variantsMotion}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hide"}`}
      className="ellipsi-createPost-container"
    >
      <li className="ellipsi-createPost-item">
        <h4 className="ellipsiPost-text" onClick={()=> HandleDifusion(OPTIONS_DIFUSION.OnlyYou)}  >Only me</h4>
        <img src={friends} alt="" />
      </li>
      <li className="ellipsi-createPost-item" onClick={()=> HandleDifusion(OPTIONS_DIFUSION.Public)}>
        <h4 className="ellipsiPost-text">Public</h4>
        <img src={global}></img>
      </li>
      <li className="ellipsi-createPost-item" onClick={()=> HandleDifusion(OPTIONS_DIFUSION.Friends)} >
        <h4 className="ellipsiPost-text">Friends</h4>
        <img src={candado} alt="" />
      </li>
    </motion.ul>
  )
}

export default DifusionModal