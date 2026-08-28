import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login_user } from "../config/Url_Config";
import { Footer } from "../routes/Footer";
import { useFetch } from "../hooks/useFetch";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const {
    data: loginInfo,
    fetchData: Login,
    error: loginError,
  } = useFetch({
    endpoint: login_user,
    metodo: "POST",
  });

  const handleLogin = async () => {
    const datos = {
      username: username,
      password: password,
      waifupaperControlPanel: true,
    };
    await Login(datos);
  };

  useEffect(() => {
    if (!loginInfo || Array.isArray(loginInfo)) return;
    if (loginInfo.Success) navigate("/home");
    if (loginInfo.Error) alert("Error, credenciales inválidas.");
  }, [loginInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <header></header>
      <main>
        <h1>WaifuPaper - Panel Admin</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <p></p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <p></p>
          <label>
            Password:
            <p></p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p></p>
          <button type="submit" disabled={username == "" || password == ""}>
            Submit
          </button>
        </form>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
