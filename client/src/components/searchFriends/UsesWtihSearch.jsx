import React from 'react'
import Search from '../Search/Search'
import Users from '../../stylesComponents/user/users/Users'
import Skeleton from '../Skeleton/Skeleton'

const UsersWithSearch = ({ autocomplete, inputProps, state, description, children}, inputRef) => {

    if (!autocomplete || !inputProps || !state ) return null



    
  return (
    <section {...autocomplete.getRootProps()}>
        <Search ref={inputRef} styles={{marginBottom:'5px'}} autocomplete={autocomplete} inputProps={inputProps} />
        {description &&  <p className='group-message'>{description}</p>}
        <div className="search-people-container" {...autocomplete.getPanelProps()}>
        {state.status === "stalled" && !state.isOpen ? (
           <>
           <Skeleton avatar paragraph={{ rows: 0 }} />
           <Skeleton avatar paragraph={{ rows: 0 }} />
           <Skeleton avatar paragraph={{ rows: 0 }} />
           <Skeleton avatar paragraph={{ rows: 0 }} />
          </>
        )  : null}
       
        {state?.isOpen && (
          <>
            {state.collections?.map(({ source, items }) => (
              <div key={`search-source-key-${source.Id}`}>

                {!!items && (
                  <Users autocomplete={autocomplete} items={items} source={source}  >
                      {children}
                  </Users>
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