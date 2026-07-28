import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = awaitfetch("https://myportfolio-backend-awfq.onrender.com/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Server Error");
    console.log(error);
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleRegister}>
        <h2>Admin Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminRegister;