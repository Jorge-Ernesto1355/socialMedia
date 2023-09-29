import React from 'react'
import './RequestFriends.css'
import Request from '../Request/Request'


const RequestFriends = ({ items }) => {
  return (
    <>
      {!!items && (
        <ul className="request" >
          {items?.map((request) => (
            <Request user={request} key={`request-user-key=${request?._id}`} />
          ))}
        </ul>
      )}
    </>

  )
}

export default RequestFriends