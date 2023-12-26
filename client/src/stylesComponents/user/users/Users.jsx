import React from 'react'
import User from '../User'
import './users.css'

const Users = ({items = [], autocomplete, source}) => {
    
   
  return (
    <ul className='users-container' {...autocomplete.getListProps()}>
        
        {items?.map((item)=>{
                            const itemProps = autocomplete.getItemProps({
                                item, 
                                source
                            })

                            return (
                                <User key={`search-user-key-${item.objectID}`} hit={item} itemProps={itemProps}/>   
                            )
                        })}
       
   </ul>
  )
}

export default Users