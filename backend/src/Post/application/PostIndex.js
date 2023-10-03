const DeletePost = require("./DeletePost");
const FindAllPost = require("./find/FindAllPost");
const FindPostById = require("./find/FindPostById");
const UpdatePost = require("./UpdatePost");
const createPost = require("./createPost/createPost");
const FindCurrentPost = require("./find/FindCurrentPost");
const findTimeLine = require('./find/FindTimeLinePost')

const Votes = require("./interact/votes/Vote");
const UsersVotes = require("../application/interact/votes/AllUserGivenVote");
const getVotes = require("./interact/votes/getVotes");

//actionsPost

//like
const GiveLike = require("./interact/actions/likes/GiveLike");

//shares
const allShared = require("../application/interact/shares/AllUserHasGivenShared");
const Share = require("./interact/shares/Share");

//comment
const comment = require("./interact/comments/Comment");
const FindCommentsFromPost = require("./find/FindCommentsFromPost");
const getReactionComment = require("./interact/comments/getReactionComment");
const getReactionCommentView = require("./interact/comments/getReactionView");

//favorites
const favorite = require("./interact/favorites/Favorites");
const AllFavorite = require("./interact/favorites/AllFavorites");

const FindAllReactionsPost = require("./find/FindAllReactionPost");
const FindReactionPost = require("./find/FindReactionPost");
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
  GiveLike,
  comment,
  Share,
  FindCurrentPost,
  allShared,
  Votes,
  UsersVotes,
  getVotes,
  favorite,
  FindCommentsFromPost,
  AllFavorite,
  FindAllReactionsPost,
  FindReactionPostView,
  getReactionCommentView,
  FindReactionPost,
  ActionsComment,
  getReactionComment,
  getReactionsComment,
  getAllCommentsResponded,
  updateComment,
  deleteComment,
  findTimeLine
};
