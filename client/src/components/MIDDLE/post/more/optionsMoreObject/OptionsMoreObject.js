
import { useMutation, useQueryClient } from "react-query";
import useMutationRequest from "../../../../../hooks/useMutationRequest"

import PostServices from "../../services/PostServices"
import UserService from "../../../../../services/UserService";
import { Descriptions, message } from "antd";


export const OptionsMoreObject = Object.freeze({
  saveToFavorites: ({ postId, userId }) => useMutationRequest(PostServices.saveFavorites, { name: `saveFavorites-${postId}-${userId}` }), 
  HidePost: ({ userId, postId }) => hidePost({postId, userId}), 
  hideAll: ({userId, postId})=> hideAll({userId, postId}), 
  report: ({userId, postId})=> report({postId, userId}), 
  unFollow: ({userId})=> unFollow({userId}), 
  translate: ({postId, userId})=> translate({postId, userId})
})





const hideAll = ({userId, postId})=>{
    const queryClient = useQueryClient();

    const {mutate, isLoading, isError} = useMutation({
        mutationFn: UserService.hideAllPosts, 
        mutationKey: ["hideAllPosts", userId], 
        onSuccess: ()=> hidden({queryClient, postId, userId, messageSucces: "all post has been hidden"}), 
          onError: () => message.error("Something went wrong")
    }) 
    

    return {mutate, isLoadingMutation: isLoading, isError}
}

const hidePost = ({postId, userId})=>{
    const queryClient = useQueryClient();
    
    const update = useMutation({
      mutationFn: UserService.hidePost, 
      mutationKey: ["hidePost", userId], 
      onSuccess: ()=> hidden({queryClient, postId, userId, messageSucces: "the post has been hidden"}), 
      onError: () => message.error("Something went wrong")
    });

    return { mutate: update.mutate, isLoadingMutation: update.isLoading, isSuccess: update.isSuccess, isError: update.isError };
  
}

const report = ({postId, userId})=>{
    const queryClient = useQueryClient();
    const {mutate, isLoading, isError}  = useMutation({
        mutationFn: UserService.report, 
        mutationKey: ['report', postId],
        onSuccess: ()=> hidden({queryClient, postId, userId, messageSucces: "the post has been reported"}), 
        onError: ()=> message.error("something went wrong")
        
    })

    return {mutate, isLoadingMutation: isLoading, isError}
}

const hidden = ({queryClient, postId, userId, messageSucces, hidden = true}) => {
    queryClient.setQueryData(['posts', userId], (posts) => {
      if (!posts) return posts; 
      const newPages = posts.pages.map((page) => {
        const newDocs = page.data.docs.map((doc) => {
          if (doc._id === postId) {
            return { ...doc, hidden };
          }
          return doc;
        });
        return { ...page, data: { ...page.data, docs: newDocs } };
      });
      message.success(messageSucces);
      return { ...posts, pages: newPages };
    });

}
export const useHiddenPost = () => {
    const queryClient = useQueryClient();
  
    const hidden = ({ postId, userId, messageSucces, hidden = true }) => {
      queryClient.setQueryData(['posts', userId], (posts) => {
        if (!posts) return posts;
        const newPages = posts.pages.map((page) => {
          const newDocs = page.data.docs.map((doc) => {
            if (doc._id === postId) {
              return { ...doc, hidden };
            }
            return doc;
          });
          return { ...page, data: { ...page.data, docs: newDocs } };
        });
        message.success(messageSucces);
        return { ...posts, pages: newPages };
      });
    };
  
    return { hidden };
  };


export const unFollow = ({userId})=>{


    const {mutate, isLoading, isError} = useMutation({
        mutationFn: UserService.unFollow, 
        mutationKey: ['unFollow', userId], 
        onSuccess: ()=> message.success("have unfollowed to your friend"), 
        onError: ()=> message.error("something went wrong")
    })

    return {mutate, isLoadingMutation: isLoading, isError}
}


export const translate = ({postId, userId})=>{

  const queryClient = useQueryClient()
  const queryPost = ['traduce', postId]
  const {mutate, isLoading, isError} = useMutation({
    mutationFn: PostServices.translate, 
    mutationKey: queryPost, 
    onSuccess: (traducedText)=>{

      queryClient.cancelQueries()
      queryClient.setQueryData(['posts',userId], (posts) => {
        if (!posts) return posts; 
        const newPages = posts.pages.map((page) => {
          const newDocs = page.data.docs.map((doc) => {
            if (doc._id === postId) {
              return { ...doc, description: traducedText?.data?.translationText };
            }
            return doc;
          });
          return { ...page, data: { ...page.data, docs: newDocs } };
        });
        
        return { ...posts, pages: newPages };
      });


    }, 
    onError: (error)=> {
      console.log(error)
      message.error(error.response.data.error)
    }
  })

  return {mutate, isLoadingMutation: isLoading, isError}
}


  