import React, { useState } from 'react'
import { interests } from '../utils/interests';
import { Flex, Input, Tag } from 'antd';
import './SearchSkills.css'
import MagnifyingGlassIcon from '../../../../../assets/MagnifyingGlassIcon';
const SearchSklills = ({handleAddSkills}) => {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState(interests[0].suggestions);
    
    const handleChange = (e) => {
      const value = e.target.value.toLowerCase();
      setQuery(value);
  
      if (value.length > 0) { 
        const filteredInterests = interests.filter(interest =>
          interest.name.toLowerCase().includes(value)
        );
        const allSuggestions = filteredInterests.flatMap(interest => interest.suggestions);
        setSuggestions(allSuggestions);
      } else {  
        setSuggestions([]);
      }
    };

   

  return (
    <div>
       <Flex gap={10} justify='start' align='center' className='input-search-skills-container'>
        <MagnifyingGlassIcon/>
        <input
         type='text'
         value={query}
         onChange={handleChange}
         placeholder='Type an interest...'
         className='input-search-skills'
         />
       </Flex>
       
      {suggestions.length > 0 && (
        <ul className='tags-skills-container'>
          {suggestions.map((suggestion, index) => (
            <Tag className='tag-skill' key={index} onClick={()=> handleAddSkills(suggestion)}>{suggestion}</Tag>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchSklills