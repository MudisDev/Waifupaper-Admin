import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/appstyles.css";

export default function Waifus() {
  const [waifus, setWaifus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.1.4/waifupaper/api/lista/mostrar_personajes.php")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mappedData = data.map((waifu) => ({
            id: waifu.id_personaje,
            nombre: waifu.nombre,
            imagen: waifu.imagen_perfil,
            alias: waifu.alias,
            descripcion: waifu.descripcion,
            edad: waifu.edad,
            dia: waifu.dia,
            mes: waifu.mes,
            ocupacion: waifu.ocupacion,
            pasatiempo: waifu.pasatiempo,
            historia: waifu.historia,
            id_especie: waifu.id_especie,
          }));

          setWaifus(mappedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching waifus:", error);
      });
  }, []);

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
      Waifus
      <p style={{ color: "red" }}>Esta es la pantalla de waifus</p>
      {waifus.map((waifu) => (
        <div
          key={waifu.id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <img
            src={waifu.imagen}
            alt={waifu.nombre}
            style={{ width: 150, height: 250, objectFit: "cover" }}
          />
          <h2>
            {waifu.nombre} ({waifu.alias})
          </h2>
        </div>
      ))}
    </div>
  );
}
