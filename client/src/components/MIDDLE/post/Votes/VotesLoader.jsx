import React from 'react'
import ContentLoader from 'react-content-loader'

const VotesLoader = () => (
    <ContentLoader 
      speed={2}
      width={400}
      height={100}
      viewBox="0 0 400 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
     
    >
      <rect x="15" y="17" rx="3" ry="3" width="173" height="20" /> 
      <rect x="123" y="86" rx="0" ry="0" width="0" height="1" /> 
      <rect x="16" y="59" rx="0" ry="0" width="173" height="20" /> 
      <rect x="212" y="18" rx="0" ry="0" width="173" height="20" /> 
      <rect x="210" y="59" rx="0" ry="0" width="173" height="20" />
    </ContentLoader>
)

export default VotesLoader