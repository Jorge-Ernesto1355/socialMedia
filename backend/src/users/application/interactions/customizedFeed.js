
const userService = require("../../userService")


const customizedFeed =  async (req, res)=>{

  const {userId} = req.params
  const {interests} = req.body

  if(!userId) return  res.status(500).json({error: "Something went wrong"})

    console.log(interests, userId)
  
  const customizedFeed = await userService.customizedFeed({userId, interests})

  if(customizedFeed.error){
    return res.status(500).json({error: customizedFeed.message})
  }

  return res.status(200).json(customizedFeed)
  
}

module.exports = customizedFeed