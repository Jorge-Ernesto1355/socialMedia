import React, {useEffect, useMemo } from 'react';
import { useState } from 'react';

import './vote.css';

const LIMIT_INPUT_TEXT = 30

const Vote = ({ updateForm = {},votes = {}, uuid = '', index = 0}) => {

  const [form, setForm] = useState([uuid] || '');

  useEffect(() => {
    setForm(votes[uuid] || '');
  }, [votes[uuid]]);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setForm(value);
    updateForm({value, name});
  };

  const isWarning = useMemo(()=> (form || '').length > LIMIT_INPUT_TEXT, [form])

 

  return (
    <div key={uuid} className={`vote ${isWarning && 'warning'} `}>
      <div className='vote-input'>
      <input
        type="text"
        value={form}
        name={uuid}
        onChange={handleFormChange}
        placeholder={`Option ${index} `}
      />
      <span>{form.length}/{LIMIT_INPUT_TEXT}</span>
      </div>
      
      
      
    </div>
  );
};

export default React.memo(Vote);
