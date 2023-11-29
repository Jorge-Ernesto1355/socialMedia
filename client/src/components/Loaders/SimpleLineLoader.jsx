import React from "react"
import ContentLoader from "react-content-loader"

const SimpleLineLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={120}
    height={15}
    viewBox="0 0 120 15"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="108" y="12" rx="0" ry="0" width="1" height="0" /> 
    <rect x="7" y="6" rx="4" ry="4" width="105" height="8" />
  </ContentLoader>
)

export default SimpleLineLoader