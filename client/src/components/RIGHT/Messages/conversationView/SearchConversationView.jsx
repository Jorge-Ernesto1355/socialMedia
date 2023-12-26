import React from 'react'
import filter from '../icons/filter.png'
import filterWhite from '../icons/filterWhite.png'
import searchIcon from '../icons/searchIcon.png'
import './SearchConversation.css'

const SearchConversationView = ({filtred, stateFiltred, inputProps, autocomplete}, inputRef) => {
  return (
      <>
      <form className='searchConversation-container'  {...autocomplete.getFormProps({
        inputElement: inputRef?.current, 
        placeholder:'Search'
      })}>
        <div className='searchConversation-input'>
            <img src={searchIcon} alt="search" className='searchConversation-searchIcon' />
            <input type="text" placeholder='Search' ref={inputRef} {...inputProps}/>
        </div>
        <div className={`conversation-filtred ${stateFiltred ? 'filtred' : ''} `} onClick={()=> filtred() }>
           {stateFiltred &&  <img src={filterWhite} alt="filter"  className={`searchConversation-filterIcon ${stateFiltred ? 'filtred' : ''}`} />}
           {!stateFiltred &&  <img src={filter} alt="filter"  className={`searchConversation-filterIcon ${stateFiltred ? 'filtred' : ''}`} />}
        </div>
      </form>
      </>
  )
}

export default React.forwardRef(SearchConversationView)