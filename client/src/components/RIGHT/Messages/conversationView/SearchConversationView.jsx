import React from 'react'
import filter from '../icons/filter.png'
import searchIcon from '../icons/searchIcon.png'
import './SearchConversation.css'

const SearchConversationView = () => {
  return (
      <>
      <form className='searchConversation-container'>
        <div className='searchConversation-input'>
            <img src={searchIcon} alt="search" className='searchConversation-searchIcon' />
            <input type="text" placeholder='Search' />
        </div>
        <div className=''>
            <img src={filter} alt="filter" className='searchConversation-filterIcon' />
        </div>
      </form>
      </>
  )
}

export default SearchConversationView