
import { motion } from "framer-motion";
import "./Ellipsi.css";
import { variantsMotion } from "../../../../../utilities/variantsMotion";

const EllipsisComment = ({ isOpen }) => {
  return (
    <motion.ul
      variants={variantsMotion}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hide"}`}
      className="ellipsiComment-container"
    >

      <li className="ellipsiComment-item">
        <h4 className="ellipsiComment-text">Ocultar comentario</h4>
      </li>
      <li className="ellipsiComment-item">
        <h4 className="ellipsiComment-text">Reportar comentario</h4>
      </li>
      <li className="ellipsiComment-item">
        <h4 className="ellipsiComment-text">Editar comentario</h4>
      </li>

    </motion.ul>
  );
};

export default EllipsisComment;
