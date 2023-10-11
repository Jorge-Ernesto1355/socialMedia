import React from 'react'
import './ErrorMessageComment.css'
import ErrorButton from '../../makeComment/styledComponentes/ErrorButton/ErrorButton'

const ErrorMessage = ({reset}) => {
  return (
    <div className='errorMessage-comment-container'>
        <p>Something went wrong</p>
         <span>try to research Comment, </span>
         <ErrorButton reset={reset}/>
    </div>
  )
}

export default ErrorMessage