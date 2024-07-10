import axios from "axios";
import { ObjectErrosName } from "../utilities/ObjectErrorsName";

export default class UserService {
  static async Request({ privateRequest, endpoint, method, params }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }

      const response = await privateRequest[method.toLowerCase()](endpoint, {
        ...(method.toLowerCase() === "get" ? { params } : params),
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getUser({ privateRequest, userId, options, populate }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/${userId}`,
      method: "post",
      params: { options, populate},
    });
  }

  static async addFriend({ userId, addUserId, privateRequest }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/friend/add/${userId}?addUserId=${addUserId}`,
      method: "put",
    });
  }

  static async requestFriends({ privateRequest, id, limit, page }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/friend/request/all/${id}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }
  
  static async acceptFriend({ userId, addUserId, accept, privateRequest }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/friend/accept/${userId}?addUserId=${addUserId}&accept=${accept}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async usersOnline({ id, privateRequest, limit, page }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/online/${id}`,
      method: "get",
      params: { limit, page },
    });
  }

  static async hidePost({privateRequest, userId, postId}){
    try {
    
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/hide/post/${postId}/${userId}`,
      );
    } catch (error) {
      return error;
    }
  }



  static async getFriends({ privateRequest, id, limit, page }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/friends/${id}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async hideAllPosts({privateRequest, userId, userIdToHide}){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/hide/all/post/${userId}/${userIdToHide}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async report({privateRequest, userId, postId}){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/report/post/${postId}?userId=${userId}`,
      );
    } catch (error) {
      return error;
    }
  }

  
  static async unFollow({privateRequest, userId, friendId}){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/unFollow/${userId}/${friendId}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async getPhotos({privateRequest, id }){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/photos/${id}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async editProfilePicture({privateRequest, id, imageObject }){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
        return privateRequest.put(
          `/users/upload/edit/profilePicture/${id}`, imageObject
        );
    } catch (error) {
      return error;
    }
  }

  static async editCoverPicture({privateRequest, id, imageObject }){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
        return privateRequest.put(
          `/users/upload/edit/coverPicture/${id}`, imageObject
        );
    } catch (error) {
      return error;
    }
  }

  static async uploadUserProfile({privateRequest, id, userInfo }){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
        return privateRequest.post(
          `/users/edit/profile/${id}`, userInfo
        );
    } catch (error) {
      return error;
    }
  }

  static async editUserLocation({privateRequest, id, location }){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
        return privateRequest.put(
          `/users/edit/location/${id}`, location
        );
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getUserLocation({latitude, longitude}){
    const options = {
      method: 'GET',
      url: 'https://api.opencagedata.com/geocode/v1/json',
      params: {
        q: `${latitude},${longitude}`,
        key: 'ffeae186d7fa44329a97a217c6ddfd0a'
      }
    };

    if(!latitude && !longitude) return null

    try {
      const response = await axios.request(options);
      return response
        
    } catch (error) {
       throw new Error(error)
    }
  };


  static async getCountries({country}){

    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
      params: {
        namePrefix: country
      },
      headers: {
        'X-RapidAPI-Key': '0ec7f10cd1msh8f0116595483ad6p1788acjsn1ddf6feb492f',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    

    try {
      const response = await axios.request(options);
      return response.data
     
    } catch (error) {
      throw new Error(error)
    }

  }

  static async getCities({city}){

    const options = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`,
      headers: {
        'X-RapidAPI-Key': '0ec7f10cd1msh8f0116595483ad6p1788acjsn1ddf6feb492f',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
     
      return response.data
      
    } catch (error) {
      throw new Error(error)
    }
}

static async getNearbyUsers({privateRequest, id, lng, lat, limit, page}){

  

  try {

    if(!lng && !lat) throw new Error("lng and lat are not defined")

    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/nearby/${id}?limit=${limit}&?page=${page}&lng=${lng}&lat=${lat}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}

static async getUsersWithCommonInterests({privateRequest, id, limit, page}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/common-interests/${id}?limit=${limit}&page=${page}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}

static async getUserFromFriends({privateRequest, id, limit, page}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/usersFromFriends/${id}?limit=${limit}&page=${page}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}


static async getUserPosts({privateRequest, id, limit, page}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/userPosts/${id}?limit=${limit}&page=${page}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}

static async customizeFeed({privateRequest, id, interests}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/customizedFeed/${id}`,{ interests }
      );
  } catch (error) {
    throw new Error(error)
  }
}

static async getFavoritesPosts({privateRequest, id, limit, page}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/favorites/post/${id}?limit=${limit}&page=${page}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}

static async getPostsReaction({privateRequest, id, limit, page}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/posts/reaction/${id}?limit=${limit}&page=${page}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}

static async forbiddenFavoritesPosts({privateRequest, id,}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/forbide/favoritesPosts/${id}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}



static async forbiddenReactionsPosts({privateRequest, id,}){
  try {
    if (!privateRequest)
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/forbide/reactionsPosts/${id}`, 
      );
  } catch (error) {
    throw new Error(error)
  }
}

   


}




