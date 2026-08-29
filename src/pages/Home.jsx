import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../routes/NavBar";
import "../styles/normalize.css";
import "../styles/appstyles.css";
import { show_count_total } from "../config/Url_Config";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Footer } from "../routes/Footer";
import { useFetch } from "../hooks/useFetch";

export const Home = () => {
  const [wallpapers, setWallpapers] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [waifus, setWaifus] = React.useState(null);

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const { data: totalWallpapers, fetchData: consultarTotalWallpapers } =
    useFetch({
      endpoint: show_count_total,
      metodo: "GET",
      params: { "tabla": "imagen" },
    });
  const { data: totalUsuarios, fetchData: consultarTotalUsuarios } = useFetch({
    endpoint: show_count_total,
    metodo: "GET",
    params: { "tabla": "usuario" },
  });
  const { data: totalWaifus, fetchData: consultarTotalWaifus } = useFetch({
    endpoint: show_count_total,
    metodo: "GET",
    params: { "tabla": "personaje" },
  });

  useEffect(() => {
    consultarTotalUsuarios();
    consultarTotalWaifus();
    consultarTotalWallpapers();
  }, []);

  useEffect(() => {
    if (!totalUsuarios) return;
    setUsers(totalUsuarios.total);
  }, [totalUsuarios]);

  useEffect(() => {
    if (!totalWaifus) return;
    setWaifus(totalWaifus.total);
  }, [totalWaifus]);

  useEffect(() => {
    if (!totalWallpapers) return;
    setWallpapers(totalWallpapers.total);
  }, [totalWallpapers]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1> WaifuPaper - Dashboard</h1>
        <div className="dashboard-container">
          <div className="dashboard-card">
            Total Waifus <p></p>
            {waifus}
          </div>
          <div className="dashboard-card">
            Total Usuarios<p></p>
            {users}
          </div>
          <div className="dashboard-card">
            Total Wallpapers
            <p></p>
            {wallpapers}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
