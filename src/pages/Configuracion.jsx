import React, { useEffect } from "react";
import NavBar from "../routes/NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout_user } from "../config/Url_Config";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const Configuracion = () => {
  const navigate = useNavigate();

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const handleLogout = async () => {
    try {
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
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Configuración</h1>

      <div className="link-button">
        <Link to="">Cambiar Tema</Link>
      </div>
      <p></p>
      <div className="link-button">
        {/* <Link to="/">Cerrar Sesion</Link> */}
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </div>
  );
};
