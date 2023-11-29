import React, { useState } from 'react';
import { Blurhash } from 'react-blurhash';

const Image = ({ src = '', rounded = false, alt= '', className = ''}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Blurhash
            hash={'LA07HOfleUf,hbe:e;fPf6f6f6fP'} // Aquí debes proporcionar el hash correspondiente a la imagen
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}

    
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', display: isLoading ? 'none' : 'block' , borderRadius: rounded ? '50%' : className}}
        onLoad={handleImageLoad}
      />
  
    </div>
  );
};

export default Image;