import React, { useEffect, useState } from 'react'

const BlurImageLoader = ({
    preview,
    image,
    alt,
    imageStyleClass,
    divStyleClass,
    bgColor = 'transparent',
...props}) => {
    const [currentImage, setCurrentImage] = useState(preview);
    const [loading, setLoading] = useState(true);
    const fetchImage = (src) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {
          setCurrentImage(loadingImage.src);
          setLoading(false);
        };
      };
      
      useEffect(() => {
        fetchImage(image);
      }, []);




  return (
      <div className={divStyleClass} style={{ overflow: 'hidden',  }} {...props}>
      <img
        style={{
          filter: `${loading ? 'blur(20px)' : ''}`,
          transition: '300ms filter linear',
          width: '100%',
          background: bgColor,
        }}
        src={currentImage}
        alt={alt}
        className={imageStyleClass}
      />
    </div>
  )
}

export default BlurImageLoader