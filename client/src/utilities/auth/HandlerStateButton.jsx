import React from 'react'

const HandlerStateButton = ({isLoading, isError, isSuccess, LoadingMessage, ErrorMessage, SuccessMessage, text}) => {
  return (
    <>
      {isLoading && LoadingMessage }
            {!isLoading && isError && ErrorMessage}
            {!isLoading  && !isError && !isSuccess &&  text}
            {!isLoading && !isError && isSuccess && SuccessMessage}
    </>
  )
}

export default HandlerStateButton