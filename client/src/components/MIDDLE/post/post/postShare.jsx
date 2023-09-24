import React, { useEffect, useState } from "react";
import "./Post.css";

//librarys
import rem from "../../../../assets/rem.jpg";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

//icons
import like from "../../../../assets/iconsPost/likePost.png";
import comment from "../../../../assets/iconsPost/comment.png";
import share from "../../../../assets/iconsPost/share.png";
import BookMark from "../../../../assets/iconsPost/bookmark.png";

import more from "../../../../assets/iconsPost/more.png";

//functions
import {
  DeletePostMutation,
  MutationFavorite,
  MutationShare,
  VotesPostMutate,
} from "../useQuery/mutation/Mutations";

//utilities
import { FailureAdapter, UserAdapterSucces } from "../../../Profile/useAdapter";
import GetUser from "../../../../services/GetUser.service";

//components
import Comments from "../comments/Comments";
import Roles from "../Roles/Roles";

import Ellipsis from "../more/Ellipsis";
import MakeAComment from "../comments/MakeAComment";
import { Toaster } from "react-hot-toast";
import { imgsFeelings } from "../../crearPost/PreviewPost/imgsFeelings";
import moment from "moment";
import { EditPostMutation } from "../useQuery/mutation/Mutations";
import { getPreviusVote } from "./getPreviusVote";
import { PreviewActive, sharedPost } from "../../../../redux/PreviewPostRedux";
import Reaction from "../Rating2.0/Reaction";
import LikePost from "../Rating2.0/LIkePost";
import { ReactionPost } from "../services/actions/actions";

const PostShare = ({ post }) => {
  //userId del usuario que hizo la accion
  const { _id: currentUser } = useSelector(
    (state) => state.user.currentUser.user,
  );
  //objeto de acciones para cambiar de imagen

  const dispatch = useDispatch();
  //state de actions de posts
  const [changeActions, setChangeActions] = useState(null);
  const [actions, setActions] = useState([{ label: "" }]);

  //useState para obtener todas los users de las acciones
  const [userOfActions, setUsersOfActions] = useState({});

  //editar el post
  const [editPost, setEditPost] = useState(false);

  const [visibilityComment, setVisibilityComment] = useState(false);

  //ensenar las actions que se le puede dar a un post
  const [showActions, setShowActions] = useState(false);

  //ensenar todas las actions del psot
  const [showAllActions, setShowAllActions] = useState(false);

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [descriptionState, setDescription] = useState(
    "escribe el nuevo texto aqui",
  );

  const {
    description,
    comments,
    shares,
    votes,
    userId,
    image,
    createdAt,
    edit,
    feeling,
    _id: postId,
  } = post;

  const mutateDelete = DeletePostMutation(postId);

  const DeletePostFun = () => {
    mutateDelete({ postId, currentUser });
  };

  const voteMutation = VotesPostMutate(postId);

  const VoteMutateFun = (voteId) => {
    const vote = getPreviusVote(votes, currentUser);
    if (vote) {
      voteMutation({ postId, currentUser, voteId, previousVote: vote });
    } else {
      voteMutation({ postId, currentUser, voteId });
    }
  };
  //editar el Post
  const mutateEdit = EditPostMutation(postId);

  const editPostFun = () => {
    mutateEdit({ description: descriptionState, currentUser, postId });
  };

  //favorites
  const mutateFavorite = MutationFavorite();

  //Share
  const mutateShare = MutationShare();

  const addToFavoriteFun = (postId) => {
    dispatch(PreviewActive());
    dispatch(sharedPost(postId));
  };

  const addToShareFun = (postId) => {
    dispatch(PreviewActive());
    dispatch(sharedPost(postId));
  };

  //obtener todas las acciones del post con sus respectivos users

  useEffect(() => {
    const getUserById = async () => {
      const { data, error } = await GetUser(userId);

      if (error === null) {
        setUser(data?.data && UserAdapterSucces(data?.data));
      } else {
        setUser(FailureAdapter());
      }
    };
    getUserById();
  }, [userId]);

  return (
    <motion.div className="feed">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            marginTop: "620px",
            marginLeft: "600px",
            padding: "10px",
            boxShadow: "1px 0px 5px -2px rgba(0, 0, 0, 0.13)  ",
          },
        }}
      />
      <div className="head">
        <div className="user">
          <div className="profile-photo">
            <img
              src={user?.ProfilePicture ? user?.ProfilePicture : rem}
              alt=""
            />
          </div>
          <div className="ingo">
            <h3>{user?.username ? user?.username : "sin nombre"}</h3>
            <small>{moment(createdAt).format("ll")} </small>
            {edit ? <small>-</small> : null}
            {edit ? <small className="edit">editado</small> : null}
          </div>
          <div className="roles">
            <Roles roles={user?.roles} />
          </div>
          {feeling ? (
            <div className="feeling">
              <span>se siente</span>
              <img src={imgsFeelings[feeling?.feeling]} alt="" />
            </div>
          ) : null}
        </div>
        <span className="edit">
          <div className="Ellipsi">
            <Ellipsis
              username={user?.username}
              EditPost={setEditPost}
              edit={editPost}
              mutateDelete={DeletePostFun}
            >
              <img src={more} className="icon" alt="" />
            </Ellipsis>
          </div>
        </span>
      </div>
      <div className="caption">
        {editPost ? (
          <>
            {" "}
            <input
              type="text"
              value={descriptionState}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span onClick={() => editPostFun()}>listo</span>
          </>
        ) : (
          <p>{description}</p>
        )}
      </div>
      <div className="votes-post">
        {votes?.map((vote) => (
          <div className="vote-post" onClick={() => VoteMutateFun(vote?._id)}>
            <h4>{vote.text}</h4>
          </div>
        ))}
      </div>
      <div className="photo">
        <img src={image?.url} alt="" />
      </div>

      <div className="info-post">
        <div className="liked-by" onClick={() => setShowAllActions(true)}></div>

        <div className="comment-shared">
          {comments.length > 0 ? (
            <div
              className="comment-post"
              onClick={() => setVisibilityComment(!visibilityComment)}
            >
              {comments?.length} comments
            </div>
          ) : null}
          {shares.length > 0 ? (
            <div className="shared-post">{shares?.length} compartidas</div>
          ) : null}
        </div>
      </div>

      <div className="traze"></div>
      <div className="action-buton">
        <div className="interacions-buttons">
          <div className="ratingIcon">
            <Reaction
              name="reactionsView"
              id={postId}
              userId={currentUser}
              request={ReactionPost}
            >
              <LikePost />
            </Reaction>
          </div>
          <span>
            <img className="icon" src={comment} alt="" />
          </span>
          <span>
            <img
              className="icon"
              onClick={() => addToShareFun(postId)}
              src={share}
              alt=""
            />
          </span>
        </div>
        <div className="icon-bookMark">
          <img src={BookMark} alt="" onClick={() => addToFavoriteFun(postId)} />
        </div>
      </div>
      <div className="traze"></div>
      {visibilityComment ? (
        <Comments postId={postId} comments={comments} />
      ) : null}
      <div className="makeComment">
        <MakeAComment postId={postId} userId={currentUser} />
      </div>
    </motion.div>
  );
};

export default PostShare;
