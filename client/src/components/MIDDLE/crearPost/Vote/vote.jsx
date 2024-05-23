import React, {
  useEffect, useMemo, useState
} from "react";



import { Input } from "antd";



const Vote = ({ updateVote = {}, votes = {}, uuid = "", index = 0 }) => {
  const [input, setInput] = useState([uuid] || "");

  useEffect(() => {
    setInput(votes[uuid] || "");
  }, [votes[uuid]]);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setInput(value);
    updateVote({ value, name });
  };

  

  return (
   

      <Input style={{marginTop:"10px"}} showCount maxLength={20} onChange={handleFormChange} value={input} name={uuid} placeholder={`option ${index + 1}`} />
       
      
  
  );
};

export default React.memo(Vote);
