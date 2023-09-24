import "./cuadro.css";

const Cuadro = ({ text, info, danger, right }) => {
  return <div className={info || danger || right}>{text}</div>;
};

export default Cuadro;
