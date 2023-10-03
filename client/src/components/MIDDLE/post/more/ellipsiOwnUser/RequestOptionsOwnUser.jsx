import useMutationRequest from "../../../../../hooks/useMutationRequest";
import { DeletePostService, EditPostService } from "../../services/post/post.service";


export const DeletePost = () => {
  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(DeletePostService, { name: 'posts' })

  return { mutateDelete: mutate, isLoadingMutationDelete: isLoadingMutation, isErrorDeletePost: isError, resetDelete: reset }
}

export const EditPostMutation = () => {

  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(EditPostService, { name: 'posts' })

  return { mutateEdit: mutate, isLoadingMutationEdit: isLoadingMutation, isErrorEditPost: isError, reset }

}