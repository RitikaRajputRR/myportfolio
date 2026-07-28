import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [activeMenu, setActiveMenu] = useState("contacts");
  const [loggedAdmin, setLoggedAdmin] = useState("");

  const navigate = useNavigate();

  // Check Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Logged Admin
useEffect(() => {
  const username = localStorage.getItem("username");
  console.log("Username from localStorage:", username);
  setLoggedAdmin(username);
}, []);

  // Fetch Contacts
  useEffect(() => {
    fetch("https://myportfolio-backend-awfq.onrender.com/contact")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
  fetch("https://myportfolio-backend-awfq.onrender.com/admin")
    .then((res) => res.json())
    .then((data) => setAdmins(data))
    .catch((err) => console.log(err));
}, []);

  // Delete Contact
  const deleteMessage = async (id) => {
    const result = await Swal.fire({
      title: "Delete Message?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#1f2937",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `https://myportfolio-backend-awfq.onrender.com/contact/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Contact deleted successfully!");

        const res = await fetch("https://myportfolio-backend-awfq.onrender.com/contact");
        const updatedContacts = await res.json();
        setContacts(updatedContacts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Search Filter
  const filteredContacts = contacts.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  const todayMessages = contacts.filter((item) => {
  return (
    new Date(item.createdAt).toDateString() ===
    new Date().toDateString()
  );
}).length;

const deleteAdmin = async (id) => {
  const result = await Swal.fire({
    title: "Delete Admin?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  const res = await fetch(`https://myportfolio-backend-awfq.onrender.com/admin/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    toast.success(data.message);

    setAdmins(admins.filter((admin) => admin._id !== id));
  } else {
    toast.error(data.message);
  }
};
const updateAdmin = async () => {
  try {
    const res = await fetch(`https://myportfolio-backend-awfq.onrender.com/admin/${editingAdmin}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);

      const response = await fetch("https://myportfolio-backend-awfq.onrender.com/admin");
      const admins = await response.json();
      setAdmins(admins);

      setEditingAdmin(null);
      setUsername("");
      setEmail("");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
const latestMessage =
  contacts.length > 0 ? contacts[contacts.length - 1] : null;
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="admin-logo">Admin Panel</div>

        <div className="menu">
          <button
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={activeMenu === "users" ? "active" : ""}
            onClick={() => setActiveMenu("users")}
          >
            👥 Users
          </button>

          <button
            className={activeMenu === "contacts" ? "active" : ""}
            onClick={() => setActiveMenu("contacts")}
          >
            📩 Contacts
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="admin-main">
        {/* Topbar */}
        <div className="topbar">
          <input
            type="text"
            placeholder="Search contacts..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="top-right">
          <span style={{ cursor: "pointer" }}>
            👤 {loggedAdmin} ▼</span>
            <button
              className="logout-top"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard */}
        {activeMenu === "dashboard" && (
          <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="dashboard-cards">
              <div className="card">
                <h3>Total Contacts</h3>
                <h2>{contacts.length}</h2>
              </div>

             <div className="card">
             <h3>Total Users</h3>
             <h2>{admins.length}</h2>
            </div>

              <div className="card">
                <h3>Today's Messages</h3>
                <h2>{todayMessages}</h2>
              </div>
            </div>
           

<div className="dashboard-bottom">

  <div className="recent-card">
    <h3>Recent Contacts</h3>

    {contacts.slice(0, 5).map((item) => (
      <div className="recent-item" key={item._id}>
        <strong>{item.name}</strong>
        <p>{item.email}</p>
      </div>
    ))}
  </div>

  <div className="recent-card">
    <h3>Latest Message</h3>

    {latestMessage ? (
    <>
      <h4>{latestMessage.name}</h4>
      <p>{latestMessage.message}</p>
    </>
  ) : (
    <p>No Messages</p>
  )}
  </div>
        

</div>
    

    </div>


  )}
    {/* Users */}
        {activeMenu === "users" && (
  <div className="users-page">
        <h1>All Admins</h1>
    <button
  className="add-btn"
  onClick={() => navigate("/adminregister")}
>
  ➕ Add Admin
</button>

    <table className="users-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {admins.map((admin, index) => (
          <tr key={admin._id}>
            <td>{index + 1}</td>
            <td>{admin.username}</td>
            <td>{admin.email}</td>
            <td>
 <button
  className="edit-btn"
  onClick={() => {
    setEditingAdmin(admin._id);
    setUsername(admin.username);
    setEmail(admin.email);
  }}
>
  ✏️ Edit
</button>
  <button className="delete-admin-btn"
     onClick={() => deleteAdmin(admin._id)}
>
  
    🗑 Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        {/* Contacts */}
        {activeMenu === "contacts" && (
          <>
            <div className="admin-title">
              <h1>📩 Contact Messages</h1>

              <div className="total-message">
                Total : {contacts.length}
              </div>
            </div>

            {filteredContacts.map((item) => (
              <div className="message-card" key={item._id}>
                <div className="message-name">👤 {item.name}</div>

                <div className="message-email">📧 {item.email}</div>

                <div className="message-text">💬 {item.message}</div>

                <div className="message-footer">
                  <div>
                    🕒 {new Date(item.createdAt).toLocaleString()}
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteMessage(item._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {editingAdmin && (
  <div className="edit-popup">
    <div className="edit-box">
      <h2>Edit Admin</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="popup-buttons">
        <button onClick={updateAdmin}>Update</button>

        <button onClick={() => setEditingAdmin(null)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Admin;