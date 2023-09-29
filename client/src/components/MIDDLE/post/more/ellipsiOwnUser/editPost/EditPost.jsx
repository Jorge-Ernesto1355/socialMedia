import React from 'react'
import './EditPost.css'
import { useCallbackRequest } from '../../../../../../hooks/useCallbackRequest/useCallbackRequest'
import { getPostService } from '../../../services/post/post.service'
const EditPost = ({postId}) => {
    

    const {data, isLoading, isError} = useCallbackRequest({request:getPostService, id:postId, name:'post'})

   console.log(data)
  return (
    <div>EditPost</div>
  )
}

export default EditPost