import { useContext } from 'react';
import {
  VotesActive,
  PreviewsPost,
  valueCreatePost
} from '../Context/createPostContext';

export const useVotesActive = () => useContext(VotesActive);

export const usePreviewPost = () => useContext(PreviewsPost);

export const useValueCreatePost = () => useContext(valueCreatePost);
