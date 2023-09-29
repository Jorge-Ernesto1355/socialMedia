import React from 'react'
import SkeletonPost from './SkePost'
import './PostLoader.css'

const PostLoader = () => {
  return (
    <div className='skeleton-post-container'>
        <SkeletonPost/>
    </div>
  )
}

export default PostLoader