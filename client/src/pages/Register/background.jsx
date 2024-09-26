import React from 'react';

const Background = () => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: -1,  // Cambiado de -10 a -1
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
      backgroundImage: `linear-gradient(to right, rgba(128, 128, 128, 0.04) 1px, transparent 1px), 
                        linear-gradient(to bottom, rgba(128, 128, 128, 0.04) 1px, transparent 1px)`,
      backgroundSize: '14px 24px',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        margin: 'auto',
        height: '310px',
        width: '310px',
        borderRadius: '50%',
        backgroundColor: 'rgba(245, 0, 245, 0.5)', // fuchsia with some opacity
        opacity: 0.2,
        filter: 'blur(100px)',
      }}></div>
    </div>
  );
}

export default Background;
