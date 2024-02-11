/* eslint-disable react/no-children-prop */
import React, { useCallback, useMemo } from 'react'
import './Group.css'

import Participants from './Participants/Participants'
import PropTypes from 'prop-types';
import UsersWithSearch from '../../../searchFriends/UsesWtihSearch'
import WithSearch from '../../../../HOCs/WithSearch'
import GroupStore from '../../../../zustand/GroupStore';


const Group = () => {

  
    const UsersWithSearchHOC = WithSearch(UsersWithSearch, {INDEX_NAME:'users'})
    const {addParticipant} = GroupStore()

    const AddParticipant = ({user})=>{
      if(!user) return 
      return (
        <p onClick={()=> addParticipant(user)}>Agregar</p>
      )
    }

    
  return (
    <section className='group-container' >
        <div className='group-addParticipants'>
            <h4 className='group-title-addParticipant'>Add a participant</h4>
                <UsersWithSearchHOC description={'Only your friends will appear here'} >
                  <AddParticipant/>
                </UsersWithSearchHOC>
        </div>
        <div className='group-participants'>
               <Participants/>
               <button className='group-next'> <h3>Continue</h3></button>
        </div>

    </section>
  )
}

Group.propTypes = {
  autocomplete: PropTypes.object.isRequired,
  inputProps: PropTypes.object.isRequired,
  state: PropTypes.any.isRequired,
  inputRef: PropTypes.object.isRequired,
};

export default Group