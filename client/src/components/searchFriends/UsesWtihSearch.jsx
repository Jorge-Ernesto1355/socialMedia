import React from 'react'
import Search from '../Search/Search'
import Users from '../../stylesComponents/user/users/Users'

const UsersWithSearch = ({ autocomplete, inputProps, state, description}, inputRef) => {

    if (!autocomplete || !inputProps || !state ) return null
    
  return (
    <section {...autocomplete.getRootProps()}>
        <Search ref={inputRef} styles={{marginBottom:'5px'}} autocomplete={autocomplete} inputProps={inputProps} />
        {description &&  <p className='group-message'>{description}</p>}
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
    </section>
  )
}


export default React.forwardRef(UsersWithSearch)