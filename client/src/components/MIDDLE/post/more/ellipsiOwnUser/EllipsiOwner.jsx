import { motion } from "framer-motion";
import { variantsMotion } from "../../../../../utilities/variantsMotion";
import EditPostConfirmationModal from "./editPost/EditPostIconConfirmationModal";
import DeletePost from "./deletePost/DeletePost";


const EllipsiOwner = ({ isOpen, handleCloseEllipsi, username = '', isLoading, postId }) => {


  return (
    <motion.ul
      variants={variantsMotion}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hide"}`}
      className="ellipsiPost-container"
    >
      <DeletePost postId={postId} />
      <EditPostConfirmationModal postId={postId} handleCloseEllipsi={handleCloseEllipsi} />

    </motion.ul>
  )
}
export default EllipsiOwner