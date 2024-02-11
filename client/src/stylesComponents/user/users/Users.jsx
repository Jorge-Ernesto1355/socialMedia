import React, { useMemo } from 'react'
import User from '../User'
import './users.css'
import GroupStore from '../../../zustand/GroupStore'

const Users = ({items = [], autocomplete, source, children}) => {
  return (
    <ul className='users-container' {...autocomplete.getListProps()}>
        
        {items?.map((item)=>{
                            const itemProps = autocomplete.getItemProps({
                                item, 
                                source
                            })
                             
                            return (
                                <User key={`search-user-key-${item.objectID}`} hit={item} itemProps={itemProps}>
                                  {children}
                                </User>   
                            )
                        })}
       
   </ul>
  )
}

export default Users