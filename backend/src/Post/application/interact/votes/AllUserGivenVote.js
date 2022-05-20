const User = require("../../../../src/users/domain/UserModel");
const Votess = require("../../../dominio/Votess");

const allUsersHasGivenVote =  async (req, res)=>{

  const {VoteId} = req.query

  if(VoteId){
    try {
  
      const Vote = await Votess.findById(VoteId)
      
       
     const AllVote = await Promise.all(
      Vote.counter.map((userId) => {
        return User.findById(userId);
      })
    );


        
      const users = AllVote.map(user => {
       return {
         _id:user._id, 
         username:user.username, 
         imageProfile:user.imageProfile
       }
      })

      
      return res.status(200).json(users)
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:"algo salio mal"})
    }

  }

  return res.status(400).json({message:'proporciona el id'})


}

module.exports = allUsersHasGivenVote