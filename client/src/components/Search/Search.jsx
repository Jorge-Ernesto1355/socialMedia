import React, { useRef } from 'react'
import Image from '../../utilities/Image'
import searchIcon from '../../assets/lupa.png'
import './Search.css'

const Search = () => {

    const inputRef = useRef()



  return (
    <>
    <form className='search-container' >
       <div className='search-input'>
         <Image src={searchIcon}/>
          <input className='search-input' type="text" placeholder='search'/>
       </div>
    </form>
    </>
  )
}

export default Search