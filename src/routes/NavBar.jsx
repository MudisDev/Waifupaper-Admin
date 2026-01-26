import React from "react";
import { Link } from "react-router-dom";
import "../styles/appstyles.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/home">Dashboard</Link>
      <Link to="/waifus">Waifus</Link>
      {/* <Link to="/agregar_waifu">Agregar Waifu</Link>
        <Link to="/editar_waifu">Editar Waifu</Link>
        <Link to="/agregar_wallpapers">Agregar Wallpapers</Link>
        <Link to="/editar_wallpapers">Editar Wallpapers</Link> */}
      <Link to="/galeria">Galería</Link>
      <Link to="/configuracion">Configuración</Link>
    </nav>
  );
}
