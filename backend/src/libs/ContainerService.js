
const exits = require("./exits")
const ReactionService = require("../Post/application/interact/actions/ReactionService")
const isValidObjectId = require("./isValidObjectId")
const { default: mongoose } = require("mongoose")

module.exports = class ContainerService {
    static async mostRelevant(object){
        try {
            exits(object)
            const {containerId, type, userId} = object

            const container = await isValidObjectId(containerId, type)
            const user = await isValidObjectId(userId, "User")

            if(container.error){
                throw new Error('document not found or objectId is not valid')
            } 

            const reactions = await ReactionService.getAll({containerId, type, limit: container?.reactions?.length, page:1})
            console.log(reactions)
            if(reactions.error){
                throw new Error(reactions.error.message)
            }


            const mostViewContainer = await mongoose.models[type].paginate({_id:})  
        } catch (error) {
            
        }
    }
}