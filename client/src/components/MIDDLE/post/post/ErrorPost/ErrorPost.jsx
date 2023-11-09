import React from 'react'
import './ErrroPost.css'
import ErrorButton from '../../comments/makeComment/styledComponentes/ErrorButton/ErrorButton'
import warning from '../../../../deleteComponent/icons/triangle-warning.png'

const ErrorPost = ({reset}) => {
  return (
    <div className='errorPost-container'>
        <div>
        <div>
                <div className='circle-red'>
                    <img className='triangule-warning' src={warning} alt="" />
                </div>
            </div>
        </div>

        <h5>Something went wrong</h5>
        <span>try to reload the page to fix it</span>
       <div className='reset-button'>
       <ErrorButton reset={reset}/>
       </div>
    </div>
  )
}

export default ErrorPost