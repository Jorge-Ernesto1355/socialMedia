import { useEffect, useState } from 'react';

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    let hoverTimeout;

    const handleMouseEnter = () => {
      hoverTimeout = setTimeout(() => {
        setShowComponent(true);
      }, 600); // 1000 milisegundos = 1 segundo
    };

    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout);
      setShowComponent(false);
    };

    const cleanup = () => {
      clearTimeout(hoverTimeout);
    };

    if (isHovered) {
      handleMouseEnter();
    } else {
      handleMouseLeave();
    }

    return cleanup;
  }, [isHovered]);

  return {
    isHovered,
    hovered: setIsHovered,
    show: showComponent,
  };
};

export default useHover;