import { PauseOutlined, PlayCircleFilled } from '@ant-design/icons';
import React, { useRef, useState } from 'react'

const Video = ({src, }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
  
    const handleVideoClick = () => {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 1000); // Oculta el icono después de 1 segundo
    };
    
  return (
    < >
    <video
      onClick={()=> handleVideoClick()}
      className="story-carousel-video"
      src={src}
      ref={videoRef}
      style={{ cursor: 'pointer' }}
    />
    {showIcon && (
      <div className={`video-icon ${showIcon ? 'fade-in-out' : ''}`}>
        {isPlaying ? <PauseOutlined   /> : <PlayCircleFilled />}
      </div>
    )}
  </>
  )
}

export default Video