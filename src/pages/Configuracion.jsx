import React from "react";
import NavBar from "../routes/NavBar";
import { Link } from "react-router-dom";

export const Configuracion = () => {
  return (
    <div>
      <NavBar />
      <h1>Configuración</h1>

      <div className="link-button">
        <Link to="" >Cambiar Tema</Link>
      </div>
      <p></p>
      <div className="link-button">
        <Link to="/">Cerrar Sesion</Link>
      </div>
    </div>
  );
};
