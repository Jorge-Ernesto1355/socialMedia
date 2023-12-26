import React from 'react'
import './Group.css'

import Participants from './Participants/Participants'
import PropTypes from 'prop-types';
import UsersWithSearch from '../../../searchFriends/UsesWtihSearch'
import WithSearch from '../../../../HOCs/WithSearch'


const Group = () => {

  
    const UsersWithSearchHOC = WithSearch(UsersWithSearch, {INDEX_NAME:'users'})

    
  return (
    <section className='group-container' >
        <div className='group-addParticipants'>
            <h4 className='group-title-addParticipant'>Add a participant</h4>
                <UsersWithSearchHOC description={'Only your friends will appear here'}/>
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