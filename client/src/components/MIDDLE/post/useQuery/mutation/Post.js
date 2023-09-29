import { useMutation, useQueryClient } from "react-query";
import UpdateComment from "../../services/comment/updateComment";

import { EditPost } from "../../services/post/post.service";

export const UpdateCommentMutate = () => {
  const { mutate } = useMutation(UpdateComment);
  return mutate;
};
