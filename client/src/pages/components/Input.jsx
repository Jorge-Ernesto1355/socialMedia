import { useState } from "react";
import "./input.css";
import eye from'../Login/icons/ojo.png'
function Input({
  inputValue,
  isError,
  type,
  name,
  onFocusInput,
  id,
  handleChange,
  handleBlur,
}) {

  const [inputType, setInputType] = useState('password');

 
  
  const toggleInputType = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };


  return (
    <div className={`form-group  ${isError ? 'error' : ''}`}>
      {type === 'password' &&  <img src={eye} alt="show" className="showIcon" onClick={()=> toggleInputType()} /> }
      <input
        placeholder={' '}
        type={type === 'password' ? inputType : type}
        value={inputValue}
        name={name}
        className={` form-input ${isError ? 'error-input' : ''}`}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => (onFocusInput === undefined ? "" : onFocusInput())}
      />
            <label htmlFor="username" className={`form-label ${isError ? 'error-label' : ''}`} >{id}</label>
    </div>

   
  );
}

export default Input;
