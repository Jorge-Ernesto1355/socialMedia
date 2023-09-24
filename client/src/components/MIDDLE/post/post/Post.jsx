import React, { useState } from "react";
import "./Post.css";

import rem from "../../../../assets/rem.jpg";
import { useDispatch, useSelector } from "react-redux";

import more from "../comments/EllipsiComments/icons/ellipsis.png";

import GetUser from "../../../../services/GetUser.service";


import Comments from "../comments/Comments";
import MakeAComment from "../comments/makeComment/MakeComment";
import { Toaster } from "react-hot-toast";
import { imgsFeelings } from "../../crearPost/PreviewPost/imgsFeelings";
import moment from "moment";
import ReactionsView from "../Reactions/ReactionsView";
import {
	GetAllReactions,
	GetReactionsSelected,
	GetReactionsView,
} from "../services/actions/actions";
import GetComments from "../services/comment/GetComments";
import CommentsShared from "./CommentsShared";
import useImagePreview from "../../../../hooks/useImagePreview/useImagePreview";
import CommentAxios from "../services/comment/Comment";
import ActionsPost from "../actionsPost/ActionsPost";
import { useQuery } from "react-query";
import More from "../more/More";
const Post = ({ post }) => {

	const { _id: currentUser } = useSelector(
		(state) => state.user.currentUser.user,
	);


	const dispatch = useDispatch();

	const [editPost, setEditPost] = useState(false);

	const [visibilityComment, setVisibilityComment] = useState(false);

	const [descriptionState, setDescription] = useState(
		"escribe el nuevo texto aqui",
	);

	const {
		description,
		comments,
		shares,
		userId,
		image,
		createdAt,
		edit,
		feeling,
		_id: postId,
	} = post;


	//   const mutateDelete = DeletePostMutation(postId);

	//   const DeletePostFun = () => {
	//     mutateDelete({ postId, currentUser });
	//   };

	//   //editar el Post
	//   const mutateEdit = EditPostMutation(postId);

	//   const editPostFun = () => {
	//     mutateEdit({ description: descriptionState, currentUser, postId });
	//   };

	//   //favorites
	//   const mutateFavorite = MutationFavorite();

	//   //Share
	//   const mutateShare = MutationShare();

	//   const addToFavoriteFun = (postId) => {
	//     if (currentUser === userId) {
	//       toast("no se puede");
	//     } else {
	//       dispatch(PreviewActive());
	//       dispatch(sharedPost(postId));
	//     }
	//   };

	//   const addToShareFun = (postId) => {
	//     if (currentUser === userId) {
	//       toast.error("no puedes comentar un post que es tuyo");
	//     } else {
	//       dispatch(PreviewActive());
	//       dispatch(sharedPost(postId));
	//     }
	//   };

	const { data: userData } = useQuery(["user", userId], () => GetUser(userId));

	const user = userData?.data?.data ?? {};

	const { element, input, clearImagePreview } = useImagePreview();

	return (
		<div className="feed">
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
							alt="user"
						/>
					</div>

					<div className="ingo">
						<h3>{user?.username ? user?.username : "name"}</h3>
						<small>{moment(createdAt).format("ll")} </small>
						{edit ? <small>-</small> : null}
						{edit ? <small className="edit">editado</small> : null}
					</div>
					<div className="roles"></div>

				</div>
				<span className="edit">
					<More>
						<img src={more} alt="" />
					</More>
				</span>
			</div>

			<div className="caption">

				<p>{description}</p>

			</div>

			<div className="photo">
				<img src={image?.url} alt="" />
			</div>
			<div className="info-post">
				<div className="liked-by">
					<ReactionsView
						id={postId}
						name={"post-reactions"}
						nameView="reactionsView"
						reqReactionsView={GetReactionsView}
						reqReactions={GetAllReactions}
						reqReaction={GetReactionsSelected}
					/>
				</div>

				<CommentsShared
					commentsLength={comments?.length}
					sharesLength={shares.length}
					showComments={setVisibilityComment}
				/>
			</div>

			<div className="traze"></div>
			<ActionsPost postId={postId} userId={currentUser} />
			<div className="traze"></div>
			{visibilityComment && (
				<Comments
					id={postId}
					request={GetComments}
					name="post-comment"
					className={"comments"}
				/>
			)}

			<MakeAComment
				id={postId}
				userId={currentUser}
				ref={input}
				request={CommentAxios}
				name="post-comment"
				showComments={setVisibilityComment}
			/>
			<div className="post-imgToPost">
				<img ref={element} onClick={() => clearImagePreview()} />
			</div>
		</div>
	);
};

export default Post;
