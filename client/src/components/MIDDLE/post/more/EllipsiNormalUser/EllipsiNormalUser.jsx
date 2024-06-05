
import hide from '../icons/ojos-cruzados.png'

import LoaderEllipsi from "../LoaderEllipsi"
import FavoritesIcon from '../icons/favoriteIcon/FavoritesIcon'
import EllipsiItem from './EllipsiItem'
import ReportIcon from '../icons/ReportIcon'
import HideIcon from '../icons/HideIcon/HideIcon'
import UnFollowIcon from '../icons/UnFollowIcon'
import TranslateIcon from '../icons/TranslateIcon'

export const OptionsMoreObject = {
  saveToFavorites: "saveToFavorites", 
  HidePost: "HidePost", 
  hideAll: "hideAll", 
  report: "report", 
  unFollow: "unFollow", 
  translate: "translate"
}

const EllipsiNormalUser = ({ username = '', isLoading, postId, postUserId})=>{



  
    return (
      <ul
        className="ellipsiPost-container"
      >
        <EllipsiItem 
         typeItem={OptionsMoreObject.saveToFavorites}
         postId={postId} 
         description={<span style={{fontSize: "x-small"}}>Add to your saved elements</span>}
         title={<h4  className="ellipsiPost-text">Save to favorites</h4>} 
         icon={ <FavoritesIcon/>} 
         successMessage={"saved to favorites"}/>

        <EllipsiItem
          typeItem={OptionsMoreObject.HidePost} 
          description={<span style={{fontSize: "x-small"}}>Wath less publication like this</span>}
          postId={postId} title={<h4 className="ellipsiPost-text">Hide Publication </h4>}
          icon={<img style={{width: "20px", height: "20px"}} src={hide} alt="editar post" />}
          successMessage={"hidden"}/>

        <EllipsiItem
         typeItem={OptionsMoreObject.hideAll}
         postId={postId}
         userIdToHide={postUserId}
         description={<span style={{fontSize: "x-small"}}>you will not wacht any publication of  anymore</span>}
         icon={<img style={{width: "20px", height: "20px"}} src={hide} alt="editar post" />}
         title={ <h4 className="ellipsiPost-text">Hide all  publications  </h4>}/>

        <EllipsiItem
         typeItem={OptionsMoreObject.report}
         postId={postId}
         description={<span style={{fontSize: "x-small"}}>will not notice to this</span>}
         icon={<ReportIcon/>}
         title={ <h4 className="ellipsiPost-text">Report publication </h4>}/> 

        <EllipsiItem
         typeItem={OptionsMoreObject.unFollow}
         postId={postId}
         friendId={postUserId}
         description={<span style={{fontSize: "x-small"}}>not be her/his friend anymore</span>}
         icon={<UnFollowIcon></UnFollowIcon>}
         title={ <h4 className="ellipsiPost-text">UnFollow</h4>}/> 

         <EllipsiItem
         typeItem={OptionsMoreObject.translate}
         postId={postId}
         friendId={postUserId}
         description={<span style={{fontSize: "x-small"}}>traduce the text of spanish to ingles or viceversa</span>}
         icon={<TranslateIcon></TranslateIcon>}
         title={ <h4 className="ellipsiPost-text">Traduce</h4>}/> 

        
      </ul>
    )
  }
  
  export default EllipsiNormalUser