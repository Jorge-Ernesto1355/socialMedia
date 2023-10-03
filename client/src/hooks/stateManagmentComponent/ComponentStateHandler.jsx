import React from 'react'
import './ComponentStateHandler.css'

const ComponentStateHandler = (props) => {
    console.log(props)
    return (
        <div className='Component-state-handler-container'>

            {/* if IsLoading and isError is false it will display the Loader */}
            {props.isLoading && !props.isError && (
                { Loader: props.Loader }
            )}

            {/* if isLoading is false and isError es false too it will display the children */}
            {!props.isLoading && !props.isError && (
                { children: props.children }
            )}

            {/* if there's an error it will display an error message */}
            {!props.isLoading && props.isError && (
                <>
                    {/* erroor message */}
                </>
            )}

            {
                !props.isLoading && !props.isError && (
                    <>
                        {props.items < 0 &&  }
                    </>
                )
            }



        </div>
    )
}

export default ComponentStateHandler