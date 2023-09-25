import React, {
  useEffect, useMemo, useState
} from "react";


import "./vote.css";

const LIMIT_INPUT_TEXT = 30;

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

  const isWarning = useMemo(
    () => (input || "").length > LIMIT_INPUT_TEXT,
    [input],
  );

  return (
    <div key={uuid} className={`vote ${isWarning && "warning"} `}>
      <div className="vote-input">
        <input
          type="text"
          value={input}
          name={uuid}
          onChange={handleFormChange}
          placeholder={`Option ${index} `}
        />
        <span>
          {input.length}/{LIMIT_INPUT_TEXT}
        </span>
      </div>
    </div>
  );
};

export default React.memo(Vote);
