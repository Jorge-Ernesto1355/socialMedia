const DeletePost = require('./DeletePost')
const FindAllPost = require('./find/FindAllPost')
const FindPostById = require('./find/FindPostById')
const UpdatePost = require('./UpdatePost')
const createPost = require('./createPost/createPost')
const FindCurrentPost = require('./find/FindCurrentPost')

const Votes = require('./interact/votes/Vote')
const AllVotes = require('../application/interact/votes/AllUserGivenVote')

//actionsPost

//like
const GiveLike  = require('./interact/actions/likes/GiveLike')


//shares
const allShared = require('../application/interact/shares/AllUserHasGivenShared')
const Share = require('./interact/shares/Share')

//comment
const comment = require('./interact/comments/Comment')
const FindCommentsFromPost = require('./find/FindCommentsFromPost')



//favorites 
const favorite = require('./interact/favorites/Favorites')
const AllFavorite = require('./interact/favorites/AllFavorites')

const actionAll = require('../application/find/FindActionsPost')


const ActionsComment = require('./interact/comments/ActionComment')
const  getAllActionsFormComment = require('./interact/comments/getAllActionsFromComment')
const getAllCommentsResponded = require('./interact/comments/getAllCommentsResponded')

const reactToResponded = require('./interact/comments/ActionCommentResponded')
const getAllActionAndUserFromCommentsResponded = require('./interact/comments/getAllActionsFromCommentResponded') 

const updateComment = require('../application/interact/comments/updateComment')
const updateCommentResponded = require('../application/interact/comments/updateCommntResponded')
const deleteComment = require('./interact/comments/deleteComment')

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
  AllVotes, 
  favorite,
  FindCommentsFromPost, 
  AllFavorite, 
  actionAll, 
  ActionsComment, 
  getAllActionsFormComment, 
  getAllCommentsResponded, 
  reactToResponded, 
  getAllActionAndUserFromCommentsResponded,
  updateComment, 
  updateCommentResponded, 
  deleteComment
  
  

}

