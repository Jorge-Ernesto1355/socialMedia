import { useEffect, useState } from 'react'

const useHover = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [showComponent, setShowComponent] = useState(false);

  
  
    useEffect(() => {
      let hoverTimeout;
  
      if (isHovered) {
        hoverTimeout = setTimeout(() => {
          setShowComponent(true);
        }, 600); // 1000 milisegundos = 1 segundo
      } else {
        clearTimeout(hoverTimeout);
        setShowComponent(false);
      }
  
      return () => {
        clearTimeout(hoverTimeout);
      };
    }, [isHovered]);

    return {isHovered, hovered:setIsHovered, show:showComponent}
  
}

export default useHover