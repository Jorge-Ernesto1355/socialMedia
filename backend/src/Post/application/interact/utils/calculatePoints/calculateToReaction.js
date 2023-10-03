const Reaction = require("../../../../dominio/Reaction")

const calculateReaction = async  (reaction)=>{

    if(!reaction) {
        return {
            label:'', 
            value:0
        }
    } 

    try {
        const reaction = Reaction.findById(reaction)
        if(reaction){
            return {
                label:reaction.label, 
                value:reaction.value
            }
        }

    } catch (error) {
        return {
            label:'', 
            value:0
        }
    }

}

module.exports = calculateReaction