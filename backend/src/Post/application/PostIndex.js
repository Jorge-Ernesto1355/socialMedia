const DeletePost = require('./DeletePost')
const FindAllPost = require('./find/FindAllPost')
const FindPostById = require('./find/FindPostById')
const UpdatePost = require('./UpdatePost')
const createPost = require('./createPost/createPost')
const GiveLike  = require('./interact//likes/GiveLike')
const comment = require('./interact/Comment')
const Share = require('./interact/shares/Share')
const FindCurrentPost = require('./find/FindCurrentPost')
const allUsersHasGivenLiked = require('../application/interact/likes/allUsersHasGivenLiked')
const allShared = require('../application/interact/shares/AllUserHasGivenShared')
const Votes = require('./interact/votes/Vote')
const AllVotes = require('../application/interact/votes/AllUserGivenVote')

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
  allUsersHasGivenLiked, 
  allShared, 
  Votes, 
  AllVotes
}

