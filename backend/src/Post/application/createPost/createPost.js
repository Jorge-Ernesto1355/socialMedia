const User = require("../../../users/domain/UserModel");
const Post = require("../../dominio/Post");
const {validatePost} = require('../validations/PostSchema')
const PostService = require('../../PostService')

const createPost = async (req, res) => {
  // const { description, userId, votes, difusion, postShared, usersTagged } = req.body;

  if (!req.body?.userId)
    return res.status(500).json({ message: "something went wrong" });



    const result = validatePost(req.body)
    
    if (result.error) {
      return res.status(400).json({ error: result.error.mesasge });
    }

    const post =  await PostService.create(req)
    

    if(post.error){
      return res.status(400).json({ message: post.error.message });
    }
   

    return res.status(201).json(post);
  
};

module.exports = createPost;
