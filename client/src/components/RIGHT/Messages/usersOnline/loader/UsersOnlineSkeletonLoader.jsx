import React from 'react'
import ContentLoader from 'react-content-loader'
const UsersOnlineSkeletonLoader = () => {
  return (
    <ContentLoader
    width={330}
    height={55}
 
    viewBox="0 0 600 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <circle cx="40" cy="38" r="40" />
   
    <circle cx="167" cy="38" r="40" />
   
    <circle cx="278" cy="38" r="40" />

    <circle cx="390" cy="38" r="40" />
 
    <circle cx="500" cy="38" r="40" />
 
  </ContentLoader>
  )
}

export default UsersOnlineSkeletonLoader