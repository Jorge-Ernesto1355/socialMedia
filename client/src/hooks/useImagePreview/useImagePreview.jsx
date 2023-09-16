import  { useCallback, useEffect, useRef } from 'react'

function isRefLinkedToImg(ref) {
  // verificar si ref está vinculada a un elemento de imagen (img)
  return ref && ref.current && ref.current instanceof HTMLImageElement;
}

function isFileInputRef(ref) {
  // verificar si ref es una referencia a un input de tipo archivo
  return ref && ref.current && ref.current instanceof HTMLInputElement && ref.current.type === 'file';
}


const UseImagePreview = () => {

  const elementRef = useRef(null);
  const fileInputRef = useRef(null);

  const clearImagePreview = useCallback(()=> {
      if (isRefLinkedToImg(elementRef)) {
        elementRef.current.src = null;
      }
    
  },[])
  

  const handleFileInputChange = () => {
    const file = fileInputRef.current.files[0] ?? null;

    if (!file) return undefined;

    if (!file.type.startsWith('image/')) {
      elementRef.current.src = null
      return 
    };

    const reader = new FileReader();
    reader.onerror = (error) => undefined;

    if(typeof reader.readAsDataURL === 'function'){

      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      if (!isRefLinkedToImg(elementRef)) return undefined;
      if (elementRef.current && reader.result) {
        elementRef.current.src = reader.result;
      } else {
        return undefined;
      }
    };

  };
  useEffect(() => {
    
    if (!isFileInputRef(fileInputRef)) return undefined;

    const fileInput = fileInputRef.current;


    // Agrega un evento de cambio al input para ejecutar handleFileInputChange
    fileInput.addEventListener('change', handleFileInputChange);

    // Limpia el evento cuando el componente se desmonte
    return () => {
      fileInput.removeEventListener('change', handleFileInputChange);
    };
  }, [elementRef, fileInputRef]);

return {element:elementRef, input: fileInputRef, clearImagePreview, handleFileInputChange }

}

export default UseImagePreview