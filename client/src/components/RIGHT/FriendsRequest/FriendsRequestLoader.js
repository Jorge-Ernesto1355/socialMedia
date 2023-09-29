import React from "react";
import ContentLoader from "react-content-loader";

const FriendsRequestLoader = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={100}
    viewBox="0 0 200 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="33" cy="29" r="21" />
    <rect x="65" y="17" rx="0" ry="0" width="149" height="13" />
    <rect x="67" y="39" rx="0" ry="0" width="72" height="9" />
    <rect x="22" y="68" rx="0" ry="0" width="70" height="20" />
    <rect x="115" y="67" rx="0" ry="0" width="71" height="20" />
  </ContentLoader>
);

export default FriendsRequestLoader;
