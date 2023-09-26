import React, { Suspense, useState, lazy } from "react";
import "./More.css";
import Loader from "../../../../utilities/Loader";

const EllipsisPost = lazy(() => import("./Ellipsis"))


const More = ({ children, id }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="ellipsiPost-more">
      <div className="more-img" onClick={() => setIsOpen((prev) => !prev)}>
        {children}
      </div>
      {isOpen && (
        <Suspense fallback={<Loader />}><EllipsisPost isOpen={isOpen} userId={id} /></Suspense>
      )}

    </div>
  );
};

export default More;
