const Post = require("../../dominio/Post")
const client = require('../../../src/redis/client')


const findPostById = async (req, res)=>{

      const {id} = req.params

      try {
              const post = await Post.findById(id).populate('votes')
              res.status(200).json(post)
                  
                 
      } catch (error) {
            
            res.status(500).json({message:'algo salio mal'})
      }
      }


module.exports  = findPostById