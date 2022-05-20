const User = require("../../../src/users/domain/UserModel")
const Post = require("../../dominio/Post")
const {uploadImage} = require('../../../src/libs/cloudynary')


const createImagen = require('./createImagen')
const createVotes = require('./createVotes')

const fs = require('fs-extra')




const createPost = async (req, res)=>{
  const {description, userId, votes} = req.body
  let postCreated
  let image = {}
  let Votes = []
  


  
  try {
    const user = await User.findById(userId)
    let image = null;

    if (req.files?.image) {
     image = createImagen(req)
    }

    if(votes){
        Votes = await createVotes(req, res)
    }


    const newPost = new Post({ userId, description, image});
    const votesId = Votes.map(vote => vote._id)
    console.log(votesId)
    

    newPost.votes = votesId
    user.posts = [...user.posts, newPost]
   
    await user.save()
    await newPost.save();
    
    res.status(201).json(newPost)
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({message:"no se pudo acompletar"})
  }

  

}

module.exports = createPost