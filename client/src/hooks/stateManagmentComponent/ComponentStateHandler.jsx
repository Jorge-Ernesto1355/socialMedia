import React from 'react'
import './ComponentStateHandler.css'

const ComponentStateHandler = (props) => {
    console.log(props)
    return (
        <div className='Component-state-handler-container'>

            {/* if IsLoading and isError is false it will display the Loader */}
            <div className='loading-stateManagment'>
            {props.isLoading && !props.isError && (
                props.LoaderComponent
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
                        {props.items <= 0 && <p>be the best</p> }
                    </>
                )
            }



        </div>
    )
}

export default ComponentStateHandler