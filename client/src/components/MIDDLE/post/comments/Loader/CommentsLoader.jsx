import React from "react"
import ContentLoader from "react-content-loader"

const CommentsLoader = (props) => (
  <ContentLoader
    speed={2}
    width={200}
    height={105}
    viewBox="0 0 200 105"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="29" cy="24" r="20" />
    <rect x="108" y="12" rx="0" ry="0" width="1" height="0" />
    <rect x="62" y="7" rx="8" ry="8" width="126" height="32" />
    <circle cx="29" cy="83" r="20" />
    <rect x="62" y="65" rx="8" ry="8" width="126" height="32" />
  </ContentLoader>
)

export default CommentsLoader