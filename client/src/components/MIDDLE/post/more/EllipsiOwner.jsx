import { motion } from "framer-motion";
import { variantsMotion } from "../../../../utilities/variantsMotion";
import trash from './icons/basura.png'
import editar from './icons/editar.png'
const EllipsiOwner = ({isOpen, username = '' , isLoading})=>{
    return (
      <motion.ul
        variants={variantsMotion}
        initial={{ scale: 0, opacity: 0 }}
        animate={`${isOpen ? "show" : "hide"}`}
        className="ellipsiPost-container"
      >
        <li className="ellipsiPost-item">
          <h4 className="ellipsiPost-text">Delete post</h4>
          <img src={trash} alt="eliminar post" />
        </li>
        <li className="ellipsiPost-item">
          <h4 className="ellipsiPost-text">Editar post</h4>
          <img src={editar} alt="editar post" />
        </li>
      </motion.ul>
    )
  }
export default EllipsiOwner