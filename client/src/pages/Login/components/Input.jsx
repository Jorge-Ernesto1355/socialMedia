import "./input.css";

function Input({
  inputValue,
  children,
  placeholder,
  name,
  onFocusInput,
  handleChange,
  handleBlur,
}) {
  return (
    <div className="input1">
      {children}

      <input
        className="input-invisible"
        placeholder={placeholder}
        type="text"
        value={inputValue}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => (onFocusInput === undefined ? "" : onFocusInput())}
      />
    </div>
  );
}

export default Input;
