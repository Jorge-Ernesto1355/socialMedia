
import { motion } from "framer-motion";
import "./Ellipsi.css";
import { variantsMotion } from "../../../../../utilities/variantsMotion";
import { Suspense } from "react";
import Loader from "../../../../../utilities/Loader";

const EllipsisComment = ({ isOpen }) => {
  return (
    <motion.ul
      variants={variantsMotion}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hide"}`}
      className="ellipsiComment-container"
    >
      <Suspense fallback={<Loader />}>
        <li className="ellipsiComment-item">
          <h4 className="ellipsiComment-text">Ocultar comentario</h4>
        </li>
        <li className="ellipsiComment-item">
          <h4 className="ellipsiComment-text">Reportar comentario</h4>
        </li>
        <li className="ellipsiComment-item">
          <h4 className="ellipsiComment-text">Editar comentario</h4>
        </li>
      </Suspense>
    </motion.ul>
  );
};

export default EllipsisComment;
