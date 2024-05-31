const cloudinaryService = require("../libs/cloudynary");
const isValidObjectId = require("../libs/isValidObjectId");
const MessageService = require("../messages/MessageService");
const getTotalPoints = require("../reaction/utils/getTotalPoints");
const { HfInference } = require("@huggingface/inference");

const userService = require("../users/userService");
const createVotes = require("./application/createPost/createVotes");
const Post = require("./dominio/Post");
const { detect } = require("langdetect");
const { exists } = require("../users/domain/UserModel");
const UserModel = require("../users/domain/UserModel");


function exits(object) {
  if (!object) throw new Error("not found parameters");
}

class PostService {
  static async getAll(object) {
    exits(object);

    const { limit, page } = object;

    try {
      return await Post.paginate({}, { limit, page });
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async get(object) {
    try {
      exits(object);
      const { postId } = object;

      const isValidPost = await isValidObjectId({_id: postId}, {model: "Post"});

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      const Post = await Post.findById(postId);
      return Post;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getTimeLine(object) {
    try {
      exits(object);
      const { userId, limit, page } = object;

      const userPosts = await userService.getPosts({ userId, limit, page });

      if (userPosts?.error) {
        throw new Error(userPosts.message);
      }

      const friendPosts = await userService.getFriendsPosts({
        userId,
        limit,
        page,
        currentUser: userId
      });
     
      if (friendPosts?.error) {
        throw new Error(friendPosts?.message);
      }

      const options = {
        limit,
        page,
      };

      const currentUserAndFriendsPosts =
        Array.prototype.concat.apply(userPosts?.docs, friendPosts?.docs) ?? [];

      const idsPosts = currentUserAndFriendsPosts.map(
        (currentPost) => currentPost?._id
      );

      const results = await Post.paginate({ _id: { $in: idsPosts } }, options);

      const postsWithTotalPoints = await Promise.all(
        results?.docs?.map(async (currentPost) => {
          const totalPoints = await getTotalPoints(currentPost?.reactions);

          if (totalPoints?.error) {
            throw new Error(totalPoints?.message);
          }

          if (typeof totalPoints === "number") {
            currentPost.points = totalPoints;
          }

          return currentPost;
        })
      );

      const orderedPosts = postsWithTotalPoints.sort(
        (a, b) => b?.points - a?.points
      );

      results.docs = orderedPosts;

      return results;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(req) {
    exits(req.body);

    const {
      description,
      userId,
      votes,
      postShared,
      usersTagged,
      timeExpiration,
    } = req.body;
    const queryOptions = {
      model: "User",
      select: ["posts"],
    };

  

    try {
      const file = req.files?.image;
      console.log(file, "post")
      const image = await cloudinaryService.upload({
        filePath: file?.tempFilePath,
      });

      console.log(image, "post image")

      if (image?.error)
        throw new Error("something went wrong to upload the photo");
      
      const  votesPost = await createVotes({ votes })
      const user = await isValidObjectId({ _id: userId }, queryOptions);


      const newPost = new Post({
        userId,
        description,
        image,
        votes: votesPost,
        expiresIn: timeExpiration > 0 ? timeExpiration : null,
      });
      if (postShared) newPost.postShared = postShared;
      newPost.usersTagged = usersTagged?.map((username) => ({
        username,
      }));

      user.posts = [...user.posts, newPost];
      await user.save();
      const postsaved = await newPost.save();

      return postsaved;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async update(object) {
    try {
      exits(object);
      const { postId, description, userId } = object;
      const queryOptions = {
        model: "Post",
      };

      const post = await isValidObjectId({ _id: postId }, queryOptions);

      if (post?.error) {
        throw new Error(post?.message);
      }

      if (!(userId == post?.userId))
        throw new Error("your not the owner of this post");
      const update = await Post.findByIdAndUpdate(postId, {
        description,
      });
      return update;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async delete(object) {
    try {
      exits(object);
      const { postId } = object;
      const queryOptions = {
        model: "Post",
      };

      const isValidPost = await isValidObjectId({ _id: postId }, queryOptions);

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      await Post.findByIdAndDelete(postId);

      return null;

      // if(userShared){

      //   try {
      //     if(!post.shares.includes(userShared)){
      //       return res.status(200).json({message:"se ha borrado"})
      //     }else{

      //       await post.UpdateOne({$pull:{shares: userShared}})
      //       await user.UpdateOne({$pull:{posts:post}})

      //       await post.save()
      //       await user.save()
      //     }
      //   } catch (error) {
      //      return res.status(500).json({message:"recursos no coinciden"})
      //   }
      // }
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async editTimeExpire(object) {
    try {
      exits(object);
      const { timeExpiration, userId, postId } = object;
    

      const user = await isValidObjectId(
        { _id: userId },
        { model: "User", select: ["username"] }
      );
      if (user?.error) throw new Error("user is not valid");

      const post = await isValidObjectId(
        { _id: postId },
        { model: "Post", select: ["expiresIn"] }
      );
      if (post?.error) throw new Error("post is not valid");

      await Post.findByIdAndUpdate(postId, { ExpiresIn: timeExpiration });

      return { message: "time expiration has been updated" };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async sharePostMessage(object) {
    exits(object);

    const { text, to, from, postId } = object;
    const queryOptions = {
      model: "Conversation",
    };
    try {
      let conversation = await isValidObjectId(
        {
          participants: {
            $size: 2,
            $all: [to, from],
          },
        },
        queryOptions
      );

      if (conversation?.error) {
        if (conversation.error instanceof DocumentNotFound) {
          conversation = await this.create({ to, from });
        }
        throw new Error(conversation?.message);
      }

      const messageCreated = await MessageService.create({
        conversationId: conversation?._id,
        to,
        from,
        message: text,
        postId,
      });

      if (messageCreated.error) return messageCreated.error;

      return messageCreated;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async saveFavorites(object){
    try {
      exits(object)
      const {userId, postId} = object
      const user = await  isValidObjectId({_id:userId}, {model: "User"})
      const post = await isValidObjectId({_id: postId}, {model:"Post"})

      if(user.error || post.error) throw new Error("someghing went wrong")


        
   if(!post.favorites.includes(userId)){
      

      await post.updateOne({$push: {favorites : userId}})
      await user.updateOne({$push: {favorites : userId}})
      return {message: "has been added to favorites"}
    
   }

   if(post.favorites.includes(userId)){
     await post.updateOne({$pull:{favorites:userId}})
     await user.updateOne({$pull: {favorites : userId}})
     return {message: "has been taken out to favorites"}
   }
    

    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }

  }

  static async showFavorites(object){
    try {
      
      exits(object);
      const {postId, limit, page} = object
     
      const post = await isValidObjectId({_id: postId}, {model: "Post", select:["favorites"]});
   
     
      if (post?.error) {
        throw new Error(isValidPost?.error?.message);
      }
      const usersId = post.favorites.map((userId)=> userId)

      const friends = await UserModel.paginate(
        { _id: { $in: usersId } },
        {limit, page, select: ["username", "imageProfile"]}
      );
  
      return friends
      
    } catch (error) {
      return {
        error, 
        messag: error.message
      }
    }
  }

  static async traduceText(object){
    try {
      const { postId } = object;

      // Verificar que `isValidObjectId` y `Post` model están configurados correctamente
      const post = await isValidObjectId({ _id: postId }, { model: "Post" });
    
      if (post.error) throw new Error(post.message);
    

      if (post.description.length <= 3)  throw new Error("text too short to traduce")

    
      
      let detectedLang;
      try {
        detectedLang = detect(post.description)[0].lang;
      } catch (error) {
        throw new Error('Could not detect language');
      }

  
      if (!detectedLang || (detectedLang !== "en" && detectedLang !== "es")) {
        throw new Error("Could not detect lenguaje");
    }
  
      const hf = new HfInference("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");
    
      let model 
      detectedLang == "es"  ? model = "Helsinki-NLP/opus-mt-es-en" : model =  "Helsinki-NLP/opus-mt-en-es" 
      
      const response = await hf.translation({
        model,
        inputs: post.description,
        parameters: {
          "src_lang": "en",
          "tgt_lang": "es"
        }
      });
    
     
    
      return response.translation_text;
    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }


}

module.exports = PostService;
