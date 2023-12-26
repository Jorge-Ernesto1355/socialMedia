import React from 'react'
import User from '../user/User'
import './Users.css'

const Users = ({autocomplete, items, source, clearInput}) => {

    
  return (
    <ul className='search-users-container' {...autocomplete.getListProps()}>
                        {items?.map((item)=>{
                            const itemProps = autocomplete.getItemProps({
                                item, 
                                source
                            })

                            return (
                                <User clearInput={clearInput} key={`search-user-key-${item.objectID}`} hit={item} itemProps={itemProps}/>   
                            )
                        })}

                    </ul>
  )
}

export default Users