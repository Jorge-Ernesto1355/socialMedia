
import EditPostConfirmationModal from "./editPost/EditPostIconConfirmationModal";
import DeletePost from "./deletePost/DeletePost";
import EditTimeExpiration from "./EditTimeExpiration/EditTimeExpiration";
import Favorites from "./favorites/Favorites";
import Reports from "./reports/Reports";


const EllipsiOwner = ({ handleCloseEllipsi,  postId, favoriteLength , reportsLength}) => {


  return (
    <ul
      className="ellipsiPost-container"
    >
      <DeletePost postId={postId} />
      <EditPostConfirmationModal postId={postId} handleCloseEllipsi={handleCloseEllipsi} />
      <EditTimeExpiration postId={postId}/>
      <Favorites postId={postId} favoriteLength={favoriteLength}/>
      <Reports reportsLength={reportsLength}/>
    </ul>
  )
}
export default EllipsiOwner