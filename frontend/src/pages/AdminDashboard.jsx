import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/users" className="admin-card">
          Manage Users
        </Link>
        <Link to="/admin/posts" className="admin-card">
          Manage Posts
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
