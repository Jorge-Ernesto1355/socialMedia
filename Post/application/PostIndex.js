const DeletePost = require('./DeletePost')
const FindAllPost = require('./FindAllPost')
const FindPostById = require('./FindPostById')
const UpdatePost = require('./UpdatePost')
const createPost = require('./createPost/createPost')
const GiveLike  = require('./createPost/GiveLike')

module.exports = {
  DeletePost, 
  FindAllPost, 
  FindPostById, 
  UpdatePost, 
  createPost, 
  GiveLike
}