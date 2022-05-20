const Votess = require('../../dominio/Votess')

const createVotes = async (req, res)=>{

  const {votes} = req.body

  

    try {
      
    const votesReady = await Promise.all(
    votes.map(vote =>  {
      const votesSeparado = {
        uuid:vote.uuid, 
        text:vote.text
      }

      const newVote = new Votess(votesSeparado)
      newVote.save()
      return newVote
    }))

      return votesReady
    
      
    

    } catch (error) {
      return res.status(500).json({message:"algo salio mal "})
    }
    
  


}

module.exports= createVotes
