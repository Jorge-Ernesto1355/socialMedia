import React from 'react'
import ErrorButton from '../../../MIDDLE/post/comments/makeComment/styledComponentes/ErrorButton/ErrorButton'
import './ErrorMessageRequestFriends.css'
const ErrorMessageFriendRequest = ({ reset }) => {
    return (
        <div className='ErrorMessageFriendRequest'>
            <h4 className='ErrorMessage-description'>Something went wrong with request friends</h4>
            <ErrorButton reset={reset} />
        </div>
    )
}

export default ErrorMessageFriendRequest