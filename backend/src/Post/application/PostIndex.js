const DeletePost = require("./DeletePost");
const FindAllPost = require("./find/FindAllPost");
const FindPostById = require("./find/FindPostById");
const UpdatePost = require("./UpdatePost");
const createPost = require("./createPost/createPost");

const findTimeLine = require("./find/FindTimeLinePost");

const Votes = require("./interact/votes/Vote");
const UsersVotes = require("../application/interact/votes/AllUserGivenVote");
const getVotes = require("./interact/votes/getVotes");

//actionsPost

//like
const ReactionPost = require("./interact/actions/likes/ReactionPost");

//shares
const allShared = require("../application/interact/shares/AllUserHasGivenShared");
const Share = require("./interact/shares/Share");

//comment
const comment = require("./interact/comments/Comment");

const getReactionComment = require("./interact/comments/getReactionComment");
const getReactionCommentView = require("./interact/comments/getReactionView");

//favorites
const favorite = require("./interact/favorites/Favorites");
const AllFavorite = require("./interact/favorites/AllFavorites");

const FindReactionPostView = require("./find/FindReactionsView");

const ActionsComment = require("./interact/comments/ActionComment");
const getReactionsComment = require("./interact/comments/getReactionsComment");
const getAllCommentsResponded = require("./interact/comments/getAllCommentsResponded");

const updateComment = require("../application/interact/comments/updateComment");

const deleteComment = require("./interact/comments/deleteComment");

module.exports = {
  DeletePost,
  FindAllPost,
  FindPostById,
  UpdatePost,
  createPost,
  ReactionPost,
  comment,
  Share,

  allShared,
  Votes,
  UsersVotes,
  getVotes,
  favorite,

  AllFavorite,

  FindReactionPostView,
  getReactionCommentView,

  ActionsComment,
  getReactionComment,
  getReactionsComment,
  getAllCommentsResponded,
  updateComment,
  deleteComment,
  findTimeLine,
};
