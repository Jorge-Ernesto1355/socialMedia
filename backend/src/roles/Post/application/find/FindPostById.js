const Post = require("../../dominio/Post")



const findPostById = async (req, res)=>{

      const {id} = req.params

      try {
              const post = await Post.findById(id).populate('votes').populate('comments').populate('feeling')
              
              return res.status(200).json(post)
                  
                 
      } catch (error) {
            
            res.status(500).json({message:'algo salio mal'})
      }
      }


module.exports  = findPostById