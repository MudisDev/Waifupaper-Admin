import React from "react";
import { useNavigate } from "react-router-dom";
import { login_user } from "../config/Url_Config";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${login_user}?username=${username}&password=${password}`
      );

      const data = await response.json();
      console.log("Respuesta login:", data);

      if (data) {
        console.log(`usuario => ${data.username} - ${data.nombre}`);
        navigate("/home"); // 👈 redirigir
      } else {
        console.log("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
