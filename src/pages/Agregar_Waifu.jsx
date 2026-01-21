import React from "react";
import { Link } from "react-router-dom";

export const Agregar_Waifu = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/waifus">Lista Waifus</Link>
        <Link to="/agregar_waifu">Agregar Waifu</Link>
        <Link to="/editar_waifu">Editar Waifu</Link>
        <Link to="/agregar_wallpapers">Agregar Wallpapers</Link>
        <Link to="/editar_wallpapers">Editar Wallpapers</Link>
      </nav>
      Agregar_Waifu
    </div>
  );
};
