import React from "react";
import "./Category.css";
const Category = () => {
  return (
    <div className="category">
      <h5 className="active">Primary</h5>
      <h5>General</h5>
      <h5 className="message-request">Request(8)</h5>
      <ConversationsView/>
    </div>
  );
};

export default Category;
