import React from "react";
import "./CommentShared.css";

const CommentsShared = ({ commentsLength, sharesLength, showComments }) => {
  return (
    <div>
      <div className="comment-shared">
        {commentsLength > 0 && (
          <div
            className="comment-post"
            onClick={() => showComments((prev) => !prev)}
          >
            <span className="comment-length">{commentsLength}</span>{" "}
            <span className="comment-text">comments</span>
          </div>
        )}
        {sharesLength > 0 && (
          <div className="shared-post">
            {sharesLength} <p className="shares-text">shares</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsShared;
