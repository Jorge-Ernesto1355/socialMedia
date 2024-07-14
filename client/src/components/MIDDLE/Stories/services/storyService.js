import { ObjectErrosName } from "../../../../utilities/ObjectErrorsName";
import { convertToFile } from "../../../../utilities/convertToFile";

export class storyService {

    static async createStoryPhoto({privateRequest, story, userId}){

        if (!privateRequest)
            throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);

        try {
            const form  = new FormData()    
            for(const  key in story){
                form.append(key, story[key])
            }

            return await  privateRequest.post(`/story/${userId}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            
            
        } catch (error) { 
            throw new Error(error.response.data.error)
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
            return await privateRequest.get(`story/storiesFromUser/${id}`)

        } catch (error) {
            throw new Error(error)
        }
    }

    static async getFeedStories({privateRequest, id, limit, page}){
        if (!privateRequest)
            throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
        try {
            return await privateRequest.get(`/story/feed/${id}?limit=${limit}&page=${page}`)
        } catch (error) {
            throw new Error(error)
        }
    }
    
}