const cloudinaryService = require("../../libs/cloudynary.js")
const isValidObjectId = require("../../libs/isValidObjectId")
const UserModel = require("../../users/domain/UserModel")
const userService = require("../../users/userService.js")
const Story = require('../model/Story.js')
module.exports =  class storyService {

    static async createStory({userId, expiresIn, text, image}){

        try {
                
            const user = await isValidObjectId({_id: userId}, {model:"User", select: ["username", "stories"]})
            if(user.error) throw new Error(user.message)

            if(user?.stories?.length > 10) throw new Error("stories limit exeeded")

    
            const Image = await cloudinaryService.upload({
                filePath: image?.tempFilePath,
            });
            
            if (Image?.error) throw new Error("something went wrong to upload the photo");

            const urls = await cloudinaryService.getImageUrls({public_id: Image.public_id})

           
            if(urls.error) throw new Error(urls.error.message)
            

            const story = new Story({userId, expiresIn, text, media: {url: urls.url, public_id: Image.public_id, previewUrl: urls.previewUrl}})
           
            await story.save()
            
            if(!story) throw new Error("something went wrong")
            
            
            await UserModel.findByIdAndUpdate(userId,
                 {
                $addToSet: {stories: story._id}
                }, 
            )

           return {message: "created story"} 

        } catch (error) {
            return {
                error, 
                message: error.message
            }
        }
    }

    static async getStoriesByUser({userId, limit, page}){


        try {

               // Validar el ID del usuario
               const userValidationResult = await isValidObjectId({ _id: userId }, { model: "User", select: ["username"] });
               if (userValidationResult.error) throw new Error(userValidationResult.message);
   

               console.log(userValidationResult)
               // Obtener los amigos del usuario
               const friendsResult = await userService.getFriends({ limit, page, userId });
               if (friendsResult.error) throw new Error(friendsResult.message);
   
               const friendsIds = friendsResult.docs.map(friend => friend._id);
   
               // Agregar el ID del usuario a la lista de IDs para obtener sus historias también
              
   
               // Obtener historias de cada usuario y amigo
               const stories = await Story.find({ userId: { $in: friendsIds} }).sort({ createdAt: -1 });
   
               // Crear un mapa de historias por usuario
               const storiesMap = friendsIds.reduce((acc, id) => {
                   acc[id.toString()] = null;
                   return acc;
               }, {});
   
               // Rellenar el mapa con las primeras historias de cada usuario
               stories.forEach(story => {
                   if (!storiesMap[story.userId.toString()]) {
                       storiesMap[story.userId.toString()] = story._id.toString();
                   }
               });
   
               // Convertir el mapa en un array de IDs de historias
               const storiesIds = Object.values(storiesMap).filter(id => id !== null);
              

               const paginateStories = await Story.paginate(
                { _id: { $in: storiesIds } },
                {
                    limit,
                    page,
                    populate: {
                        path: 'userId',
                        select: '_id username imageProfile'
                        
                    }
                }
            );

              return paginateStories

            
        } catch (error) {
            return {
                error, 
                message: error.message
            }
        }
    }

    static async getStoriesFromUser({userId}){

       try {

        const user = await isValidObjectId({_id: userId}, {model:"User", select: ["stories"]})
        if(user.error) throw new Error(user.message)

        const storiesId = user.stories.map((id)=> id.toString())

        const stories = await Story.find({_id: {$in: storiesId}})

        return stories
        


       } catch (error) {
        return {
            error, 
            message: error.message
        }
       }

        

    }
}