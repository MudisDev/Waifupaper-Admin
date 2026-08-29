import React, { useEffect, useEffectEvent } from "react";
import NavBar from "../routes/NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout_user } from "../config/Url_Config";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Footer } from "../routes/Footer";
import { useFetch } from "../hooks/useFetch";

export const Configuracion = () => {
  const navigate = useNavigate();

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  const {
    data: dataCerrarSesion,
    fetchData: cerrarSesion,
    error: errorCerrarSesion,
  } = useFetch({
    endpoint: logout_user,
    metodo: "POST",
  });

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const handleLogout = async () => {
    await cerrarSesion();

    /* try {
      const response = await fetch(`${logout_user}`, {
        credentials: "include",
      });

      const data = await response.json();
      console.log("Respuesta logout:", data);

      if (!data.Error) {
        navigate("/"); // 👈 redirigir
      } else {
        console.log("LogOut failed");
      }
    } catch (error) {
      console.error("LogOut failed:", error);
    } */
  };

  useEffect(() => {
    if (!dataCerrarSesion) return;
    if (dataCerrarSesion.Success) {
      navigate("/");
    }
  }, [dataCerrarSesion]);

  useEffect(() => {
    if (!errorCerrarSesion) return;
    console.error("Error al cerrar sesion -> ", errorCerrarSesion);
  }, [errorCerrarSesion]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Configuración</h1>

        <div className="link-button">
          <Link to="">Cambiar Tema</Link>
        </div>
        <p></p>
        <div className="link-button">
          {/* <Link to="/">Cerrar Sesion</Link> */}
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
