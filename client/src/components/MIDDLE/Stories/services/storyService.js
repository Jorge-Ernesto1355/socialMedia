import { ObjectErrosName } from "../../../../utilities/ObjectErrorsName";

export class storyService {

    static async createStoryPhoto({privateRequest, story, userId}){

        if (!privateRequest)
            throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);

        try {

            const form  = new FormData()    
            for(const  key in story){
                form.append(story[key])
            }

            const data = await  privateRequest.post(`/story/${userId}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if(data.data) return data
             
            
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getStoriesByUser({privateRequest, id}){

        if (!privateRequest)
            throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);

        try {
            const data = await  privateRequest.get(`story/storiesByUser/${id}`)
            if(data?.data) return data
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getStoriesFromUser({privateRequest, id}){
        if (!privateRequest)
            throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);

        try {
            const data = await  privateRequest.get(`story/storiesFromUser/${id}`)
            if(data?.data) return data
        } catch (error) {
            throw new Error(error)
        }
    }
}