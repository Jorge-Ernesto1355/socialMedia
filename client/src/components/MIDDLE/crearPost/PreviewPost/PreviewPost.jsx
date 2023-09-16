import React, { useEffect } from 'react';

import './PreviewPost.css';

import rem from '../../../../assets/rem.jpg';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import createPost from '../../../../services/CreatePost.service';

//icons
import cross from '../../../../assets/cross.png';

//components
import Feelings from './Feelings';
import Votes from '../Vote/Votes';

import { useSelector, useDispatch } from 'react-redux';
import {
  PreviewDesactivate,
  VotesRedux,
  TextValue,
  VotesActive,
  PostFeeling,
  PostImg,
  ImgReady,
  sharedPost
} from '../../../../redux/PreviewPostRedux';

import { useMutation, useQueryClient } from 'react-query';
import GetPostById from '../../../../services/GetPostById';
import { useState } from 'react';
import PostShare from '../../post/post/postShare';

//components

const PreviewPost = () => {
  const { text, postFeeling, votes, postImg, imgReady, sharedPostId } =
    useSelector((state) => state.PreviewPost);
  const [sharedPostState, setSharedPostState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (sharedPostId) {
      setIsLoading(true);
      const getPostShared = async () => {
        const { data } = await GetPostById(sharedPostId);
        setSharedPostState(data.data);
      };

      getPostShared();
      setIsLoading(false);
    }
  }, [sharedPostId]);

  const dataPostToSubmit = {
    description: text,
    image: imgReady,
    userId: user._id,
    feeling: postFeeling,
    shared: { userId: user._id },
    votes: votes,
    postShared: sharedPostId
  };

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      dispatch(VotesRedux([]));
      dispatch(TextValue(''));
      dispatch(PostFeeling(''));
      dispatch(PostImg(''));
      dispatch(VotesActive(false));
      dispatch(PreviewDesactivate());
      dispatch(ImgReady({}));
      dispatch(sharedPost(''));
    }
  });

  const HandelSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error('escribe algo', {
        position: 'top-right'
      });
    } else {
      mutate(dataPostToSubmit);
    }
  };
  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: -2 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      exit={{ opacity: 0, scaleY: 0 }}
      className="feed PreviewPost"
    >
      <div className="head">
        <div className="user">
          <div className="profile-photo">
            <img src={rem} alt="" />
          </div>
          <div className="info">
            <h3>{user?.username}</h3>
            <div className="feelings">
              <Feelings />
            </div>
          </div>
        </div>

        <span className="edit" onClick={() => dispatch(PreviewDesactivate())}>
          <img src={cross} alt="" />
        </span>
      </div>
      <Votes />
      <div className="photo">
        <img src={postImg} alt="" />
      </div>
      <div className="caption">{text}</div>
      <div className="previousPost-post">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            {' '}
            {sharedPostState === null ? null : (
              <PostShare post={sharedPostState} />
            )}
          </>
        )}
      </div>
      <button className="post-button" onClick={(e) => HandelSubmit(e)}>
        <h5 className="post-text">publicar</h5>
      </button>
      <Toaster></Toaster>
    </motion.div>
  );
};

export default PreviewPost;
