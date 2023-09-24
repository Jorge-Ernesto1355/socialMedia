import React from "react";
import rem from "../../../../assets/rem.jpg";
import { objetsImgs } from "../post/objectImg";
import InfiniteScroll from "react-infinite-scroll-component";

const ShowAllPersons = ({
  reactions,
  isLoading,
  isError,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <InfiniteScroll
      dataLength={reactions.length}
      hasMore={hasNextPage || isLoading}
      next={() => fetchNextPage()}
      loader={"loadingshowAllpersons"}
    >
      <ul>
        {isError && <div>error</div>}
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            {reactions?.map((reaction) => (
              <li key={reaction?._id}>
                <div className="profile-action">
                  <img src={rem} alt="" />
                  <img
                    className={`icon ${
                      reaction.label === "encanta" ? "iconEncanta" : ""
                    }`}
                    src={objetsImgs[reaction.label]}
                    alt=""
                  />
                </div>
                <div className="info">
                  <h4>{reaction?.user?.username}</h4>
                  <span>300 amigos en comun</span>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </InfiniteScroll>
  );
};

export default ShowAllPersons;
