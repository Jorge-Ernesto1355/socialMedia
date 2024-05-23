
import useUserRequest from "../../../../../hooks/auth/useUserRequest";
import {  deleteCommentMutation, useHideComment } from "./Actions";
import "./Ellipsi.css";


const EllipsisComment = ({isYours, isYourPost , idComment, postId, editComment}) => {

  const privateRequest = useUserRequest()
  const {mutate} = deleteCommentMutation({postId, commentId: idComment})

  const hideComment = useHideComment();
  return (

    <>
    {isYours && (
      <ul
      className="ellipsiComment-container"
    >
      <li className="ellipsiComment-item" onClick={()=> mutate({id: idComment, privateRequest})}>
        <h4 className="ellipsiComment-text">Eliminar comentario</h4>
      </li>
      
      <li className="ellipsiComment-item" onClick={()=> editComment()}>
        <h4 className="ellipsiComment-text">Editar comentario</h4>
      </li>

    </ul>
      
    )}

    {!isYours && isYourPost && (
        <ul
        className="ellipsiComment-container"
      >
        <li className="ellipsiComment-item" onClick={()=> mutate({id: idComment, privateRequest})}>
          <h4 className="ellipsiComment-text">Eliminar comentario</h4>
        </li>
        
        <li className="ellipsiComment-item" onClick={()=> hideComment({commentId: idComment, postId, reported: true})}>
         <h4 className="ellipsiComment-text">reportar comentario</h4>
       </li>
       
  
      </ul>
    )}



    {!isYours && !isYourPost && (
       <ul
       className="ellipsiComment-container"
     >
       <li className="ellipsiComment-item">
         <h4 className="ellipsiComment-text" onClick={()=> hideComment({commentId: idComment, postId})}>ocultar comentario</h4>
       </li>
       
       <li className="ellipsiComment-item">
         <h4 className="ellipsiComment-text" onClick={()=> hideComment({commentId: idComment, postId, reported: true})}>reportar comentario</h4>
       </li>
 
     </ul>
    )}

  
    
    </>

   

   
  );
};

export default EllipsisComment;
