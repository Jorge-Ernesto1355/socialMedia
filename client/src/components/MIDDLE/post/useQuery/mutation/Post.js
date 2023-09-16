import { useMutation, useQueryClient } from 'react-query';
import UpdateComment from '../../services/comment/updateComment';

import { EditPost } from '../../services/post/post.service';

export const EditPostMutation = (postId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(EditPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId]);
    }
  });

  return mutate;
};

export const UpdateCommentMutate = () => {
  const { mutate } = useMutation(UpdateComment);
  return mutate;
};

