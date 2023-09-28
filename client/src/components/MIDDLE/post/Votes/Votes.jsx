import React, { useMemo } from "react";
import './votes.css'
import { useCallbackRequest } from "../../../../hooks/useCallbackRequest/useCallbackRequest";
import getVotes from "./service/getVotes.service";
import VotesLoader from "./VotesLoader";
import Vote from "./Vote";

const Votes = ({id}) => {

  const {data, isLoading, isError} = useCallbackRequest({request:getVotes, name:'votes', id})
  const votes = data?.data.votes ?? []



  const totalVotes = useMemo(()=> {
    let totalVotes = 0
    votes?.forEach(vote => {
      totalVotes += vote.counter.length;
      return totalVotes
    })
    return totalVotes
  }, [votes])



  return (
    <div className="votes-container">
      {isError && <span>error</span>}
      {isLoading && <VotesLoader/>}
      {!isLoading && (
        <>
        {votes?.map((vote)=> (
          <Vote
           vote={vote}
           totalVotes={totalVotes}
           postId={id}
           key={vote._id}/>
        ))}
        </>
      )}
    </div>
  );
};

export default Votes;
