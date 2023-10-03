import { motion } from "framer-motion";
import { variantsMotion } from "../../../../../utilities/variantsMotion";
import trash from '../icons/basura.png'
import { DeletePost, EditPostMutation } from "./RequestOptionsOwnUser";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import SpinnerLoader from "../../../../../stylesComponents/spinnerLoader/SpinnerLoader";
import ErrorButton from "../../comments/makeComment/styledComponentes/ErrorButton/ErrorButton";
import EditPostConfirmationModal from "./editPost/EditPostIconConfirmationModal";
const EllipsiOwner = ({ isOpen, handleCloseEllipsi, username = '', isLoading, postId }) => {

  const { _id: currentUser } = useSelector(
    (state) => state.user.currentUser.user,
  );

  const { mutateDelete, isLoadingMutationDelete, isErrorDeletePost, resetDelete } = DeletePost()

  const { mutateEdit, isErrorEditPost, isLoadingMutationEdit } = EditPostMutation()

  const handleDelete = useCallback(() => {

    mutateDelete({
      postId,
      userId: currentUser
    })

  }, [])


  return (
    <motion.ul
      variants={variantsMotion}
      initial={{ scale: 0, opacity: 0 }}
      animate={`${isOpen ? "show" : "hide"}`}
      className="ellipsiPost-container"
    >
      {isLoadingMutationDelete && <SpinnerLoader />}
      {!isLoadingMutationDelete && (
        <>
          <li className="ellipsiPost-item" onClick={() => handleDelete()}>

            <img src={trash} alt="icon delete post" />
            {isErrorDeletePost && <ErrorButton reset={resetDelete} />}
            <h4 className="ellipsiPost-text">Delete post</h4>
          </li>
          <EditPostConfirmationModal postId={postId} handleCloseEllipsi={handleCloseEllipsi} />
        </>
      )}
    </motion.ul>
  )
}
export default EllipsiOwner