import React, { Suspense, useState, lazy } from "react";
import "./More.css";
import Loader from "../../../../utilities/Loader";

const EllipsisPost = lazy(() => import("./Ellipsis"))


const More = ({ children, id, postId, editing }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (editing) return
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="ellipsiPost-more">
      <div className="more-img" onClick={() => handleOpen()}>
        {children}
      </div>
      {isOpen && (
        <Suspense fallback={<Loader box={'box'} />}><EllipsisPost isOpen={isOpen} userId={id} postId={postId} handleCloseEllipsi={setIsOpen} /></Suspense>
      )}

    </div>
  );
};

export default React.memo(More)
