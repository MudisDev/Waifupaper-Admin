import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Waifus  from "../pages/Waifus";
import { Editar_Waifu } from "../pages/Editar_Waifu";
import { Agregar_Waifu } from "../pages/Agregar_Waifu";
import { Agregar_Wallpapers } from "../pages/Agregar_Wallpapers";
import { Editar_Wallpapers } from "../pages/Editar_Wallpapers";
import { Home } from "../pages/Home";
import { Perfil_Waifu } from "../pages/Perfil_Waifu";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/waifus" element={<Waifus />} />
      <Route path="/agregar_waifu" element={<Agregar_Waifu />} />
      <Route path="/editar_waifu" element={<Editar_Waifu />} />
      <Route path="/agregar_wallpapers" element={<Agregar_Wallpapers />} />
      <Route path="/editar_wallpapers" element={<Editar_Wallpapers />} />
      <Route path="/perfil_waifu/:id" element={<Perfil_Waifu />} />
    </Routes>
  );
}
