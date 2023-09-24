import React, { Suspense, lazy, useState } from "react";
import "./More.css";
import Loader from "../../../../../utilities/Loader";
const EllipsisComment = lazy(() => import("./EllipsisComment"))

const More = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ellipsi-comment-more" onClick={() => setIsOpen((prev) => !prev)}>
      {children}
      {
        isOpen && <Suspense fallbackd={<Loader />}><EllipsisComment isOpen={isOpen} /></Suspense>
      }
    </div>
  );
};

export default More;
