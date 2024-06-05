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

import Votes from "../Votes/Votes";
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";
import AuthProvider from "../../../../zustand/AuthProvider";

import useUserRequest from "../../../../hooks/auth/useUserRequest";
import SimpleLineLoader from "../../../Loaders/SimpleLineLoader";
import { Avatar, Popover } from "antd";
import EllipsisPost from "../more/Ellipsis";
import HiddenPost from "./hiddenPost/HiddenPost";

import UserService from "../../../../services/UserService";
import { useQuery } from "react-query";
const Post = ({ post, simple, editing }) => {

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
		favorites,
		reports,
		_id: postId,
		votes, 
	} = post;




	if(post?.hidden) return <HiddenPost postId={postId} postUserId={userId}/>

	

	const { element, input, clearImagePreview } = useImagePreview();

	const { data: user, isLoading } = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId}), {
		enabled: !!userId
	});

	return (
		<div className={`feed ${simple ? 'simple' : ''} `}>
			<div className="head">
				<div className="user">
				<Avatar src={rem} size={'large'} alt="user"/>

					<div className="ingo">
						{isLoading && <SimpleLineLoader/>}
						{!isLoading  && <h3>{user?.username ?? "name"}</h3>}
						<small>{moment(createdAt).format("ll")} </small>
						{edit ? <small>-</small> : null}
						{edit ? <small className="edit">editado</small> : null}
					</div>
					<div className="roles"></div>

				</div>
				<span className="edit">
					
					<Popover placement="bottom" zIndex={100} overlayInnerStyle={{padding: "3px"}} trigger={"click"} content={<EllipsisPost reportsLength={reports.length} favoriteLength={favorites?.length} userId={userId} postId={postId} />}>
					<img src={more} alt="" />
					</Popover>
				</span>
			</div>

			<div className="caption">
				<p>{editing ? editing() : description }</p>
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
						className="reactionsView-post"
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
