import React from 'react'
import './ConfirmationDelete.css'
import warning from './icons/triangle-warning.png'
import LoaderVote from '../MIDDLE/post/Votes/LoaderVote'

const ConfirmationDelete = ({ hideModal, handleMutate, isLoading }) => {


    return (
        <div className='confirmationDelete-container'>
            <div>
                <div className='circle-red'>
                    <img className='triangule-warning' src={warning} alt="" />
                </div>
            </div>
            <div className='confirmationDelete-messages'>
                <h3>Are you sure you to want delete?</h3>
                <p className='confirmationDelete-messages-descriptions'>this actions is not reversible</p>
            </div>
            <div className='confirmationDelete-options'>
                <button className='confirmationDelete-cancel' onClick={() => hideModal(false)}>Cancel</button>
                <button className='confirmationDelete-delete' onClick={() => handleMutate()}>
                    {isLoading ? <LoaderVote /> : <p>Delete</p>}
                </button>
            </div>
        </div>
    )
}

export default ConfirmationDelete