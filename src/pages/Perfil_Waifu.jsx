import React, { useEffect } from "react";
import NavBar from "../routes/NavBar";
import { Link, useParams } from "react-router-dom";
import {
  search_character,
  show_images_for_character,
} from "../config/Url_Config";
//import { useLocation } from "react-router-dom";

export const Perfil_Waifu = () => {
  //const location = useLocation();
  //const  {waifuData}  = location.state;
  const [waifuData, setWaifuData] = React.useState();
  const [wallpapers, setWallpapers] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    const Buscar_Wallpapers = async () => {
      try {
        const response = await fetch(
          `${show_images_for_character}?id_personaje=${id}`,
        );

        const data = await response.json();
        console.log("Wallpapers data =>", data);

        if (Array.isArray(data) && data.length > 0) {
          const wallpapersData = data.map((img) => ({
            id_imagen: img.id_imagen,
            imagen_listada: img.imagen_listada,
            url: img.url,
            fecha_actualizacion: img.fecha_actualizacion,
            fecha_insercion: img.fecha_insercion,
            id_modelo_base: img.id_modelo_base,
            semilla: img.semilla,
          }));

          setWallpapers(wallpapersData);
        }
      } catch (error) {
        console.error("Error fetching wallpapers =>", error);
      }
    };
    Buscar_Wallpapers();
  }, [id]);

  useEffect(() => {
    const buscar_personaje = async () => {
      try {
        const response = await fetch(`${search_character}?id_personaje=${id}`);

        const data = await response.json();
        const waifu = data[0];
        if (data) {
          const waifuData = {
            id: waifu.id_personaje,
            nombre: waifu.nombre,
            imagen: waifu.imagen_perfil,
            id_personaje: "5",
            alias: waifu.alias,
            descripcion: waifu.descripcion,
            historia: waifu.historia,
            pasatiempo: waifu.pasatiempo,
            ocupacion: waifu.ocupacion,
            dia: waifu.dia,
            mes: waifu.mes,
            edad: waifu.edad,
            especie: waifu.especie,
            personalidades: waifu.personalidades,
          };

          setWaifuData(waifuData);
        }

        console.log("Waifu data =>", data);
      } catch (error) {
        console.error("Error fetching waifu data =>", error);
      }
    };

    buscar_personaje();
  }, [id]);

  return (
    <div>
      <NavBar />
      {waifuData && (
        <>
          <h1>
            {waifuData.nombre} ({waifuData.alias})
          </h1>
          {/* <p>{waifuData.descripcion}</p> */}
          <img src={waifuData.imagen} alt={waifuData.nombre} />
          <p>Descripción: {waifuData.descripcion}</p>
          <p>Historia: {waifuData.historia}</p>
          <p>Pasatiempo: {waifuData.pasatiempo}</p>
          <p>Ocupación: {waifuData.ocupacion}</p>
          <p>
            Cumpleaños: {waifuData.dia} de {waifuData.mes}
          </p>
          <p>Edad: {waifuData.edad}</p>
          <p>Especie: {waifuData.especie}</p>
          <p>Personalidades: {waifuData.personalidades}</p>
          <p></p>
          
            <div className="link-button">
              <Link to="">Editar Perfil</Link>
            </div>
            <p></p>
            <div className="link-button">
              <Link to="">Agregar Wallpaper</Link>
            </div>
       

          <p></p>

          <h2>Wallpapers</h2>
          {wallpapers && wallpapers.length > 0 ? (
            <div className="galeria-container">
              {wallpapers.map((wp) => (
                <div className="galeria-card" key={wp.id_imagen}>
                  <Link to={`/wallpaper/${wp.id_imagen}`}>
                    <img
                      src={wp.url}
                      alt={`Wallpaper de ${waifuData.nombre}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay wallpapers disponibles.</p>
          )}
        </>
      )}
    </div>
  );
};
