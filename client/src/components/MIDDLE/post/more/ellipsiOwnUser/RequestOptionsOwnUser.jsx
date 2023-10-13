import useMutationRequest from "../../../../../hooks/useMutationRequest";
import PostServices from "../../services/PostServices";
import { EditPostService } from "../../services/post/post.service";


export const DeletePost = () => {
  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(PostServices.delete, { name: 'posts' })

  return { mutateDelete: mutate, isLoadingMutationDelete: isLoadingMutation, isErrorDeletePost: isError, resetDelete: reset }
}

export const EditPostMutation = () => {

  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(PostServices.update, { name: 'posts' })

  return { mutateEdit: mutate, isLoadingMutationEdit: isLoadingMutation, isErrorEditPost: isError, reset }

}