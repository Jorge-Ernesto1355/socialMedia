const DeletePost = require("./DeletePost");
const FindAllPost = require("./find/FindAllPost");
const FindPostById = require("./find/FindPostById");
const UpdatePost = require("./UpdatePost");
const createPost = require("./createPost/createPost");

const findTimeLine = require("./find/FindTimeLinePost");

const Votes = require("./interact/votes/Vote");
const UsersVotes = require("../application/interact/votes/AllUserGivenVote");
const getVotes = require("./interact/votes/getVotes");


//shares
const allShared = require("../application/interact/shares/AllUserHasGivenShared");
const Share = require("./interact/shares/Share");




//favorites
const favorite = require("./interact/favorites/Favorites");
const AllFavorite = require("./interact/favorites/AllFavorites");

const FindReactionPostView = require("./find/FindReactionsView");


module.exports = {
  DeletePost,
  FindAllPost,
  FindPostById,
  UpdatePost,
  createPost,
  Share,

  allShared,
  Votes,
  UsersVotes,
  getVotes,
  favorite,

  AllFavorite,
  FindReactionPostView,
  findTimeLine,
};
