const  storyService = require("./storyService")

const createStory = async (req, res)=>{

    const {expiresIn,  text} = req.body
    const {image} = req.files
    const {userId} = req.params

     

    if(!expiresIn || !image || !text || !userId) return res.status(500).json({error: "Insuficient arguments"})

    const createStory = await  storyService.createStory({userId, image, text, expiresIn})

    console.log(createStory)

    if(createStory?.error) return res.status(500).json({error: createStory?.message})

    return res.json(createStory)

}

module.exports = createStory