
const {validatePost} = require('../validations/PostSchema')
const PostService = require('../../PostService')

const createPost = async (req, res) => {
  // const { description, userId, votes, difusion, postShared, usersTagged } = req.body;


    const result = validatePost(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const post =  await PostService.create(req)
    

    if(post.error){
      return res.status(400).json({ message: post.error.message });
    }
   

    return res.status(201).json(post);
  
};

module.exports = createPost;
