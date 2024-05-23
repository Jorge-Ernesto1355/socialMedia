
import React from 'react'


const Search = ({ inputProps = {}, autocomplete = {}, styles}, inputRef  ) => {

 

  if(!inputProps || !autocomplete ) {
    return (
      <form className='searchConversation-container' style={styles}  >
      <div className='searchConversation-input'>
          
          <input type="text" placeholder='Search' />
      </div>
    
    </form>
    )
  }

  return (
    <form className='searchConversation-container' style={styles} {...autocomplete.getFormProps({
      inputElement: inputRef?.current, 
      placeholder:'Search'
    })}  >
      <div className='searchConversation-input'>
          
          <input type="text" placeholder='Search' ref={inputRef} {...inputProps}/>
      </div>
    
    </form>
   
  )
}

export default React.forwardRef(Search)