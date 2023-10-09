import React from "react"
import ContentLoader from "react-content-loader"

const NotificationLoader = (props) => (
    <ContentLoader 
    speed={2}
    width={190}
    height={50}
    viewBox="0 0 190     50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="20" cy="23" r="20" /> 
    <rect x="108" y="12" rx="0" ry="0" width="1" height="0" /> 
    <rect x="58" y="28" rx="3" ry="3" width="126" height="6" /> 
    <rect x="48" y="10" rx="3" ry="3" width="137" height="6" />
  </ContentLoader>
)

export default NotificationLoader