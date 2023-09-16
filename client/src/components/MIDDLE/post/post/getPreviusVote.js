export const getPreviusVote = (votes, userId) => {
  if (votes === undefined || userId === undefined) {
    return null;
  }

  for (let index = 0; index < votes.length; index++) {
    if (votes[index].counter.includes(userId)) {
      return votes[index]._id;
    }
  }
};
