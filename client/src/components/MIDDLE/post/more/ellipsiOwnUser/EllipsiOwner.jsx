
import EditPostConfirmationModal from "./editPost/EditPostIconConfirmationModal";
import DeletePost from "./deletePost/DeletePost";
import EditTimeExpiration from "./EditTimeExpiration/EditTimeExpiration";


const EllipsiOwner = ({ handleCloseEllipsi, username = '', isLoading, postId }) => {


  return (
    <ul
      className="ellipsiPost-container"
    >
      <DeletePost postId={postId} />
      <EditPostConfirmationModal postId={postId} handleCloseEllipsi={handleCloseEllipsi} />
      <EditTimeExpiration postId={postId}/>
      
    </ul>
  )
}
export default EllipsiOwner