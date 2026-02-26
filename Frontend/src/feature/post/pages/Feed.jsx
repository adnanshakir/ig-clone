import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
  const { feed, loading, handleGetFeed, handleLike, handleUnlike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed-page">
      <Navbar/>
      <div className="feed">
        <div className="posts">
          {feed.map((post, key) => {
            return <Post key={key} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnlike={handleUnlike}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
