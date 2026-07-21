import { useEffect, useState } from "react";
import API from "../api/axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="center-text">Loading posts...</p>;

  return (
    <div className="feed">
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet. Be the first to create one!</p>}
      <div className="post-grid">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <h3>{post.title}</h3>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
            {post.videoUrl && (
              <video src={post.videoUrl} controls style={{ width: "100%" }} />
            )}
            <p className="post-meta">
              by {post.author?.name || "Unknown"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
