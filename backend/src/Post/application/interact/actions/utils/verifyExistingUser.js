module.exports = function verifyExistingUser(reactions, userId) {
    try {
        const keys = Object.keys(reactions);
        let foundObject = null;
        
        for (const key of keys) {
            if (Array.isArray(reactions[key]) && reactions[key].length > 0) {
                const exitsUserId = reactions[key].some(reaction => {
                    if (reaction.userId === userId) {
                        foundObject = reaction;
                        return true;
                    }
                    return false;
                });

                if (!exitsUserId) {
                    return {
                        exitsUserId: false,
                        reaction: null
                    };
                }
            } else {
                return {
                    exitsUserId: false,
                        reaction: null
                };
            }
        }

        return {
            exitsUserId: true,
            reaction: objetoEncontrado
        };
    } catch (error) {    
        return {
            exitsUserId: false,
                        reaction: null
        };
    }
}