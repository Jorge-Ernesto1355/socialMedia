
import "./Ellipsis.css";
import { motion } from "framer-motion";
import { variantsMotion } from "../../../../utilities/variantsMotion";
const EllipsisPost = ({ isOpen }) => {
  return (
    <motion.ul
      variants={variantsMotion}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hide"}`}
      className="ellipsiPost-container"
    >
      <li className="ellipsiPost-item">
        <h4 className="ellipsiPost-text">Ocultar comentario</h4>
      </li>
      <li className="ellipsiPost-item">
        <h4 className="ellipsiPost-text">Reportar comentario</h4>
      </li>
      <li className="ellipsiPost-item">
        <h4 className="ellipsiPost-text">Editar comentario</h4>
      </li>
    </motion.ul>
  );
};

export default EllipsisPost;
