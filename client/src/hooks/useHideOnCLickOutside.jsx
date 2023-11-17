import { useState, useEffect, useRef } from 'react';

const useHideOnOutsideClick = (initialState = true) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const toggle = () => {
    setIsVisible((prev) => !prev);
  };

  return { isVisible, elementRef, show, hide, toggle };
};

export default useHideOnOutsideClick;