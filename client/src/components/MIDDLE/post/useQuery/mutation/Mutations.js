import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import {
  
  addToFavorite,
  addToShare,
  
} from '../../services/actions/actions';

import CommentAxios from '../../services/comment/Comment';
import commentRespondedAxios from '../../services/comment/commentRespondesAxios';
import {
  DeletePost,
  EditPost,
  VotePost
} from '../../services/post/post.service';

/// Favorite ///
export const MutationFavorite = (postId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addToFavorite, {
    onSuccess: () => {
      toast.success('se ha guardado');
      queryClient.invalidateQueries(['posts', postId]);
    },
    onError: () => {
      toast.error('no se ha podido guardar');
    }
  });

  return mutate;
};

/// Share ///

export const MutationShare = (postId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addToShare, {
    onSuccess: () => {
      toast.success('se ha compartido');
      queryClient.invalidateQueries(['posts', postId]);
    },
    onError: () => {
      toast.error('no se ha podido guardar');
    }
  });

  return mutate;
};

/// comment ///

export const MutationComment = (postId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(CommentAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    }
  });

  return mutate;
};

/// comment ///

export const MutationCommentResponded = (commentId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(commentRespondedAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries([`commentsResponded-${commentId}`, commentId]);
    }
  });

  return mutate;
};

/// Action ///




export const EditPostMutation = (postId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(EditPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId]);
    }
  });

  return mutate;
};

export const DeletePostMutation = (postId) => {
  const { mutate } = useMutation(DeletePost, {});

  return mutate;
};

export const VotesPostMutate = (postId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(VotePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  return mutate;
};
