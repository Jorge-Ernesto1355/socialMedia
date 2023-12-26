/* eslint-disable array-callback-return */
import React, { useEffect } from 'react'
import './EditPost.css'
import { useCallbackRequest } from '../../../../../../hooks/useCallbackRequest/useCallbackRequest'
import { getPostService } from '../../../services/post/post.service'
import Post from '../../../post/Post'
import Loader from '../../../../../../utilities/Loader'
import close from '../../../../../../assets/cross.png'
import ButtonEditPost from './inputEditPost/buttonEditPost/ButtonEditPost'

import AutoComplete from '../../../../../Autocomplete/AutoComplete'
import { useStore } from '../../../../../../hooks/useStore/useStore'


const EditPost = ({ postId, handleClose }) => {


  const { data, isLoading, isError } = useCallbackRequest({ request: getPostService, id: postId, name: 'post' })
  const { store, get, set } = useStore()
  const post = data?.data ?? {}

  

  useEffect(() => {
    set(post?.description)
  }, [])

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {!isLoading && !isError && (
        <div className='edit-post-container'>
          <button className='edit-post-button-close' onClick={() => handleClose(false)}>
            <img src={close} alt="close editpost" />
          </button>

          <Post post={post} notShowComments={true} editing={get} simple={true} />

          <div className='edit-options-container'>
            {store && (
              <AutoComplete
                placeholder={"Edit your post"}
                rows={1}
                cols={40}
                ref={store}
                set={set}
                stateValue={get}
                initialValue={post?.description}
                style='input-wrapper'
              />
            )}
            <ButtonEditPost handleClose={handleClose} get={get} postId={postId} />
          </div>

        </div>
      )}
    </>
  )
}

export default EditPost