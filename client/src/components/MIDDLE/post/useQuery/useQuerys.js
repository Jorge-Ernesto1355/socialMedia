import { useQuery } from "react-query";
import {
  GetAllReactions,
  GetReactionsSelected,
  GetReactionsView,
} from "../services/actions/actions";

import { GetAllPostsShared } from "../services/post/post.service";

export const GetAllPostsSharedQuery = (postId) => {
  const { data, isLoading } = useQuery(["postsShared", postId], () =>
    GetAllPostsShared(postId),
  );

  return { data, isLoading };
};
export const GetReactionsViewQuery = ({ postId }) => {
  const { data, isLoading, isError } = useQuery(
    ["reactionsView", postId],
    () => GetReactionsView(postId),
    {},
  );

  return { data, isLoading, isError };
};

export const GetReactionsPost = ({ id, limit, page }) => {
  const { data, isLoading, isError } = useQuery(["reactions", id], () =>
    GetAllReactions({ id, limit, page }),
  );

  return { data, isLoading, isError };
};

export const GetReactionsSelectedQuery = ({ id, label, limit, page }) => {
  const { data, isLoading, isError } = useQuery([`${label}`, id], () =>
    GetReactionsSelected({ id, label, limit, page }),
  );

  return { data, isLoading, isError };
};

export const CallbackRequest = ({ request, id, name }) => {
  const { data, isLoading, isError } = useQuery([`${name}-${id}`, id], () =>
    request({ id }),
  );

  return { data, isLoading, isError };
};
