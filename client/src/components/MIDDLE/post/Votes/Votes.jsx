import React from "react";

const Votes = () => {
  return (
    <div>
      {votes?.map((vote) => (
        <div className="vote-post" onClick={() => VoteMutateFun(vote?._id)}>
          <h4>{vote.text}</h4>
        </div>
      ))}
    </div>
  );
};

export default Votes;
