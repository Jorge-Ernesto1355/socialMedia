const UserModel = require('../../../../../users/domain/UserModel')
const Post = require('../../../../dominio/Post')
const Reaction  = require('../../../../dominio/Reaction')
const { validateReaction } = require('../ReactionSchema')
const ReactionService = require('../ReactionService')

const labelsValue = {
  encanta:5, 
  gusta:2, 
  asombra:3, 
  entristece:0, 
  divierte:1

}

const GiveLike = async (req, res)=>{
 
  const {label, userId} = req.body
  const {postId} = req.params


if( !postId && !label && !userId) return res.status(500).json({message:'algo salio mal'});

if(!labelsValue.hasOwnProperty(label)) return 

const result = validateReaction({...req.body, value: labelsValue[label], containerId: postId})

if (result.error) {
  return res.status(400).json({ error: result.error.mesasge });
}

 const reaction = await ReactionService.create({label, userId, value: labelsValue[label], postId})

 console.log(reaction)

 if(reaction.error){
  return res.status(400).json({ error: reaction.message });
 }

 return res.status(201).json(reaction)

}


module.exports = GiveLike