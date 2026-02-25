import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();

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
      <div className="feed">
        <div className="posts">
          {feed.map(post => {
            return <Post user={post.user} post={post}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
