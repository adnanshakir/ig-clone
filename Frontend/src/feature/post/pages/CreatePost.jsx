import React, { useRef, useState } from "react";
import "../styles/createpost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const postImgaeInputFieldRef = useRef(null);

  const { loading, handleCreatePost } = usePost();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImgaeInputFieldRef.current.files[0];

    await handleCreatePost(file, caption);

    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Creating post</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="post-image-label" htmlFor="postImage">
            Select Image
          </label>
          <input
            ref={postImgaeInputFieldRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            value={caption}
            onInput={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Caption"
            name="caption"
            id="caption"
          />
          <button className="button primary-button">Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
