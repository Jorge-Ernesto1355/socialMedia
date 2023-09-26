import { variantsMotion } from "../../../../utilities/variantsMotion"
import hide from './icons/ojos-cruzados.png'
import addFriend from './icons/siguiendo.png'
import favorites from './icons/estrella-comentario-alt.png'
import share from './icons/cuota.png'
import { motion } from "framer-motion";
import LoaderEllipsi from "./LoaderEllipsi"
const EllipsiNormalUser = ({isOpen, username = '', isLoading})=>{

  
    return (
      <motion.ul
        variants={variantsMotion}
        initial={{ scale: 0, opacity: 0 }}
        animate={`${isOpen ? "show" : "hide"}`}
        className="ellipsiPost-container"
      >
        <li className="ellipsiPost-item">
          <img src={favorites} alt="" />
          <h4 className="ellipsiPost-text">Save to favorites</h4>
        </li>
        <li className="ellipsiPost-item">
          <img src={addFriend} alt="" />
          <h4 className="ellipsiPost-text">Añadir amigo</h4>
        </li>
        <li className="ellipsiPost-item">
          <img src={share} alt="" />
          <h4 className="ellipsiPost-text">Compartir post</h4>
        </li>
        <li className="ellipsiPost-item">
          <img src={hide} alt="editar post" />
          <h4 className="ellipsiPost-text">Hide post {isLoading ? <LoaderEllipsi/> : `${username}`}</h4>
        </li>
        <li className="ellipsiPost-item">
          <img src={hide} alt="editar post" />
          <h4 className="ellipsiPost-text">Hide all from {isLoading ? <LoaderEllipsi/> : `${username}`}</h4>
        </li>
        
      </motion.ul>
    )
  }
  
  export default EllipsiNormalUser