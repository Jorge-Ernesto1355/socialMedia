import React from 'react'
import './search.css'
import Users from './users/Users';
import lupa from '../../../assets/lupa.png'
import SpinnerLoader from '../../../stylesComponents/spinnerLoader/SpinnerLoader';


const Search = ({ autocomplete, inputProps, state}, inputRef) => {


  
  return (
    <div className="search-bar" {...autocomplete.getRootProps()}>
 
      {state.status === "stalled" && !state.isOpen ? <SpinnerLoader/> : <img src={lupa} alt="" style={{width:'20px', height:'20px'}} />}
      
   
      <form className='search-form' {...autocomplete.getFormProps({
        inputElement: inputRef?.current
      })}>
        <input
          placeholder='Search your friends'
          className='search-input'
          ref={inputRef}
          {...inputProps}
          required
          cols={30}
          rows={1}
        />
       
      </form>
      <div className="search-people-container" {...autocomplete.getPanelProps()}>
       
        {state?.isOpen && (
          <>
            {state.collections?.map(({ source, items }) => (
              <div key={`search-source-key-${source.Id}`}>

                {!!items && (
                  <Users autocomplete={autocomplete} items={items} source={source}  />
                )}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  )
}

export default React.forwardRef(Search)