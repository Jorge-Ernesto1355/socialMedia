const User = require('../../../users/domain/UserModel')
const Post = require("../../dominio/Post")
const Feeling = require('../../dominio/Feeling')


const createImagen = require('./createImagen')
const createVotes = require('./createVotes')


const createPost = async (req, res)=>{
  const {description, userId, votes, feeling, postShared} = req.body


  
  let Votes = []
  let feelingId = null
 
  try {
    const user = await User.findById(userId)
    if(!user) {
      return res.status(500).json({message:'user no proporcionado'})
    }
    let image = null;
   
    if (req.files?.image) {
     image = await createImagen(req)
    }
   
    if(feeling){
      feelingId = await Feeling.findOne({feeling:feeling})
    }


    if(votes){
        Votes = await createVotes(req, res)
       
    }
    

    const newPost = new Post({ userId, description, image});
    const votesId = Votes.map(vote => vote._id)

    feelingId  ? newPost.feeling  = feelingId._id : 0
    if(postShared){
      newPost.postShared = postShared
    }
    newPost.votes = votesId
    user.posts = [...user.posts, newPost]
   
    await user.save()
    await newPost.save();
    
    return res.status(201).json(newPost)
  }
  catch (error) {

    return res.status(500).json({message:"algo salio posts"})
  }

  

}

module.exports = createPost