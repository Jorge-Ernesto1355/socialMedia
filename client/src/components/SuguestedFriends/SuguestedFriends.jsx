import React from 'react'
import { useInfiniteQuery } from 'react-query'
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll'
import userService from '../../services/UserService'

const SuguestedFriends = ({message, request, indexName, name }) => {

    const requestFunction = () =>{
        if(typeof userService[request] === 'function') {
            return userService[request] 
        } else{
            return ()=>{}
        }
         
    }

    const {results, isError, isLoading} = useInfiniteScroll({
        request: requestFunction(),
        name,
    })
  return (
    <div>
        

    </div>
  )
}

export default SuguestedFriends