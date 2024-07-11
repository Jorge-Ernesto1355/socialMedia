import React, { Suspense, lazy, useState } from "react";
import "./Post.css";

import rem from "../../../../assets/rem.jpg";
import more from "../comments/EllipsiComments/icons/ellipsis.png";
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
import { Avatar, Descriptions, Popover, Typography } from "antd";
import EllipsisPost from "../more/Ellipsis";
import HiddenPost from "./hiddenPost/HiddenPost";

import UserService from "../../../../services/UserService";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import Paragraph from "antd/es/typography/Paragraph";
import { UserOutlined } from "@ant-design/icons";
import { HighlightedMentions } from "../../../../utilities/HighlightedMentions";
import BlurImageLoader from "../../../../utilities/BlurImageLoader";
import SpinnerLoader from "../../../../stylesComponents/spinnerLoader/SpinnerLoader";
import { Link } from "react-router-dom";
const { Text, Title} = Typography;



const Comments = lazy(()=> import('../comments/Comments'))
const Post = ({ post, simple, editing, vissibleComments }) => {

	const { userId: currentUser } = AuthProvider()
	const privateRequest = useUserRequest()
	const [visibilityComment, setVisibilityComment] = useState(vissibleComments ?? false);

	const showMakeComment = useMediaQuery({minWidth: 480})

	
	
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
	
	const { data: user, isLoading } = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId, options: ["reactionsPosts"]}), {
		enabled: !!userId
	});

	const reaction = user?.reactionsPosts?.find((reaction)=> reaction?.post._id === postId)

	return (
		<div className={`feed ${simple ? 'simple' : ''} `}>
			<div className="head">
				<div className="user">
				<Link to={`profile/${userId}`}>
					<Avatar src={user?.imageProfile?.url} icon={<UserOutlined></UserOutlined>} size={'large'} alt="user"/>
				</Link>

					<div className="ingo">
						{isLoading && <SimpleLineLoader/>}
						{!isLoading  && <Title level={5} style={{marginBottom: 0}} className="post-user-username">{user?.username ?? "name"}</Title>}
						<small>{moment(createdAt).format("ll")} </small>
						{edit ? <small>-</small> : null}
						{edit ? <small className="edit">editado</small> : null}
					</div>
				</div>
				<span className="edit">
					
					<Popover placement="bottom" zIndex={100} overlayInnerStyle={{padding: "3px"}} trigger={"click"} content={<EllipsisPost reportsLength={reports?.length} favoriteLength={favorites?.length} userId={userId} postId={postId} />}>
					<img src={more} alt="options post" style={{cursor: "pointer"}} />
					</Popover>
				</span>
			</div>

			<div className="caption">
			<HighlightedMentions text={editing ? editing() : description}/>
			</div>

			{votes?.length > 0 && <Votes id={postId} />}

			{image?.url && (
				<div className="photo">
					<BlurImageLoader preview={image?.previewUrl} image={image?.url} alt={"post image"} notImage={false}/>
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
					sharesLength={shares?.length}
					showComments={setVisibilityComment}
				/>
			</div>

			<div className="traze"></div>
			<ActionsPost postId={postId} userId={currentUser} post={post} reactionUser={reaction}/>
			<div className="traze"></div>
			{visibilityComment && (
				<Suspense fallback={<SpinnerLoader center={true}/>}>
					<Comments
					id={postId}
					name="postComment"
					className={"comments"}
					type='Post'
					/>
				</Suspense>
			)}

			{showMakeComment && 
			  <MakeAComment
				id={postId}
				userId={currentUser}
				type="Post"
				name="postComment"
				showComments={setVisibilityComment}
			/>}
		</div>
	);
};

export default Post;
