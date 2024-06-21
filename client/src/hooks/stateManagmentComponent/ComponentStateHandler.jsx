import React from 'react'
import './ComponentStateHandler.css'

const ComponentStateHandler = (props) => {

    return (
        <div className='Component-state-handler-container' style={props.style}>

            {/* if IsLoading and isError is false it will display the Loader */}
            <div className='loading-stateManagment'>
                {props.isLoading && !props.isError && (
                    props.Loader
                )}
            </div>

            {/* if isLoading is false and isError es false too it will display the children */}
            {!props.isLoading && !props.isError && (
                props.children
            )}

            {/* if there's an error it will display an error message */}
            <div className='error-stateManagment'>
                {!props.isLoading && props.isError && (
                    props.ErrorMessageComponent
                )}
            </div>

            {
                !props.isLoading && !props.isError && (
                    <>
                        {props.items <= 0 && props.EmptyMessage}
                    </>
                )
            }




        </div>
    )
}

export default ComponentStateHandler