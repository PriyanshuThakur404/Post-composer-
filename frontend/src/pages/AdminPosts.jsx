import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const loadPosts = async () => {
    const { data } = await API.get("/admin/posts");
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await API.delete(`/admin/posts/${id}`);
    loadPosts();
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setEditTitle(post.title);
  };

  const saveEdit = async (id) => {
    await API.put(`/admin/posts/${id}`, { title: editTitle });
    setEditingId(null);
    loadPosts();
  };

  return (
    <div className="admin-section">
      <h2>Manage Posts</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p._id}>
              <td>
                {editingId === p._id ? (
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                ) : (
                  p.title
                )}
              </td>
              <td>{p.author?.name || "Unknown"}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td>
                {editingId === p._id ? (
                  <>
                    <button onClick={() => saveEdit(p._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
