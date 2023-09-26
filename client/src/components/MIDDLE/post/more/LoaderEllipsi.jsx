import ContentLoader from "react-content-loader"
const LoaderEllipsi = (props) => (
    <ContentLoader 
      speed={2}
      width={25}
      height={20}
      viewBox="0 0 25 20"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="3" y="16" rx="3" ry="3" width="37" height="3" />
    </ContentLoader>
  )

  export default LoaderEllipsi