import React, { useState } from "react";
import "./Post.css";

import rem from "../../../../assets/rem.jpg";

import more from "../comments/EllipsiComments/icons/ellipsis.png";
import Comments from "../comments/Comments";
import MakeAComment from "../comments/makeComment/MakeComment";

import moment from "moment";

import CommentsShared from "./CommentsShared";
import useImagePreview from "../../../../hooks/useImagePreview/useImagePreview";
import ActionsPost from "../actionsPost/ActionsPost";
import { useQuery } from "react-query";
import More from "../more/More";
import Votes from "../Votes/Votes";
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";
import AuthProvider from "../../../../zustand/AuthProvider";
import userService from "../../../../services/UserService";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
const Post = ({ post }) => {

	const { userId: currentUser } = AuthProvider()
	const privateRequest = useUserRequest()

	const [visibilityComment, setVisibilityComment] = useState(false);

	const {
		description,
		comments,
		shares,
		userId,
		image,
		createdAt,
		edit,
		_id: postId,
		votes
	} = post;

	const { data: userData } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId }));

	const user = userData?.data ?? {};


	const { element, input, clearImagePreview } = useImagePreview();

	return (
		<div className="feed simple">

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
					<More id={currentUser} postId={postId}>
						<img src={more} alt="" />
					</More>
				</span>
			</div>

			<div className="caption">
				<p>{description}</p>
			</div>

			{votes?.length > 0 && <Votes id={postId} />}

			{image?.url && (
				<div className="photo">
					<img src={image?.url} alt="" />
				</div>
			)}
			<div className="info-post">
				<div className="liked-by">
					<ReactionsView
						id={postId}
						name={"post-reactions"}
						nameView="reactionsView"
						type="Post"
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
					name="postComment"
					className={"comments"}
					type='Post'
				/>
			)}

			<MakeAComment
				id={postId}
				userId={currentUser}
				ref={input}
				type="Post"
				name="postComment"
				showComments={setVisibilityComment}
			/>
			<div className="post-imgToPost">
				<img ref={element} onClick={() => clearImagePreview()} />
			</div>
		</div>
	);
};

export default Post;
