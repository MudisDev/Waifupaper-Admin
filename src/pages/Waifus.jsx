import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/appstyles.css";
import { show_characters } from "../config/Url_Config";
import NavBar from "../routes/NavBar";

export default function Waifus() {
  const [waifus, setWaifus] = useState([]);

  useEffect(() => {
    //fetch("http://192.168.1.4/waifupaper/api/lista/mostrar_personajes.php")
    fetch(`${show_characters}`)
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
      <NavBar />

      <h1>Waifus</h1>

      <div className="link-button">
        <Link to="/agregar_waifu">Agregar Waifu</Link>
      </div>

      <div className="waifus-container">
        {waifus.map((waifu) => (
          <div
            className="waifus-card"
            key={waifu.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <Link
              to={`/perfil_waifu/${waifu.id}`} /* state={{ waifuData: waifu }} */
            >
              <img
                src={waifu.imagen}
                alt={waifu.nombre}
                style={{ width: 150, height: 250, objectFit: "cover" }}
              />
              <h2>
                {waifu.nombre} ({waifu.alias})
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
