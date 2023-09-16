import React, {  useCallback, useMemo, useState } from 'react';

import './makeComment.css';
import rem from '../../../../../assets/rem.jpg';
import gallery from '../../../crearPost/icons/gallery.png';
import smile from '../../../crearPost/icons/smile.png';
import GetUser from '../../../../../services/GetUser.service';
import useMutationRequest from '../../../../../hooks/useMutationRequest';
import paperPlaneBlue from '../icons/paperPlaneBlue.png'
import paperPlaneGray from '../icons/paperPlaneGray.png'
import { useQuery } from 'react-query';
import { UserAdapterSucces } from '../../../../Profile/useAdapter';
import AutoComplete from '../../../../Autocomplete/AutoComplete';
import store from '../../../../../hooks/useStore/createStore';

const MakeComment = ({
  id,
  userforDisplay,
  name,
  userId,
  request, 
  componentId
}, ref) => {

  
  
  const mutateRequest = useMutationRequest(request, {id, name})
  
  
  const {data:userData, isLoading, isError} = useQuery(['user', userId], ()=> GetUser(userforDisplay), {
    enabled: userforDisplay ? true : false
  })
  const user = userData?.data?.data ?? UserAdapterSucces() 
  const [comment, setComment] = useState('')
  const CommentCallback = useCallback(()=> {
    console.log(comment)
    // if(!request) return 
    // if(!isError)  mutateRequest.mutate({postId:id, userId, text:comment, componentId})
  }, [comment])
  const isText = useMemo(()=> comment.length, [comment])
console.log(comment)


  return (
    <div >
      {isError && <div>error</div>}
      {!isLoading ?
       <div className='comment-container'>
        <div className="photo-makeComment">
        <img src={rem} alt="" />
      </div>

      <div className="field-write-card">
        <div className="field-write">
          <AutoComplete placeholder={'Escribe algo...'} rows={1} cols={38} handleToComponent={setComment}/>
          <div className="adjuncts">
            <img src={gallery} alt="gallery emoticon" />
            <input
              type="file"
              ref={ref}
              id="fileInput"
              className="input-file-makeComment"
              accept="image/png, image/jpeg, image/jpg, /image.jfif"
            />
            
            <img src={smile} alt="smile emoticon" />
            <button className='comment-button' onClick={()=> CommentCallback() }>
              <img src={isText ? paperPlaneBlue : paperPlaneGray } alt="" />
            </button>
          </div>
        </div>
      </div>

       </div> :  <div>loading</div>}
      
    
     


    </div>
  );
};

export default React.forwardRef(MakeComment)
