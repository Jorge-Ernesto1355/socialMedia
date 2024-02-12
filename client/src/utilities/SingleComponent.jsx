import React from 'react'



const SingleComponent = ({isError, isLoading, loader, errorMessage, children, isSuccess, successMessage}) => {

    return (
        <div className='Component-state-handler-container'>

            {/* if IsLoading and isError is false it will display the Loader */}
            <div className='loading-stateManagment'>
                {isLoading && !isError && !isSuccess &&  (
                    loader
                )}
            </div>

            {!isLoading && !isError && !isSuccess && (
                children
            )}



            {/* if isLoading is false and isError es false too it will display the children */}
            {!isLoading && !isError &&  isSuccess &&   (
              successMessage
            )}

            {/* if there's an error it will display an error message */}
            <div className='error-stateManagment'>
                {!isLoading && isError && !isSuccess &&  (
                errorMessage
                )}
            </div>

        </div>
    )
}

export default SingleComponent