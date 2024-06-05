import React  from 'react'

import PostServices from '../../../services/PostServices'
import useUserRequest from '../../../../../../hooks/auth/useUserRequest'
import useInfiniteScroll from '../../../../../../hooks/useInfiniteScroll/useInfiniteScroll'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, Skeleton } from 'antd'


const FavoriteUser = ({postId}) => {


    const privateRequest = useUserRequest()
    const { results, isLoading, isError,  hasNextPage, fetchNextPage } = useInfiniteScroll({request: PostServices.favorites, id: postId, name: "favorites", privateRequest})

    const SkeletonUser = ()=> (
        <>
        <Skeleton.Avatar active={true} size={"small"} />
        <Skeleton.Input active={true} size={"small"} />
        </>
      )
  return (
   <InfiniteScroll
   dataLength={results.length}
   hasMore={hasNextPage || isLoading}
   loader={<SkeletonUser></SkeletonUser>}
   next={() => fetchNextPage()}
   >
    <ul>
        {isError && <>Error</>}

        {!isError && (
            <>
                {results?.map((user)=>(
                <li key={user._id} style={{marginTop: "10px"}}>
                    <Avatar src={user?.imageProfile?.url ?? "" }/>
                    <span style={{marginLeft: "10px"}}>{user.username}</span>
                </li>
            ))}
            </>
        )}
    </ul>
   </InfiniteScroll>
  )
}

export default FavoriteUser