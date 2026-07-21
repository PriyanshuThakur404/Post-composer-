import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await API.post("/posts", { title, imageUrl, videoUrl });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        {error && <p className="error-text">{error}</p>}

        <label>Title (required)</label>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Image URL (optional)</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Video URL (optional)</label>
        <input
          type="text"
          placeholder="https://example.com/video.mp4"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
