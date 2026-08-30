import React, { useEffect, useState } from "react";
/* import NavBar from "../routes/NavBar"; */
NavBar;
import { Link, useParams } from "react-router-dom";
import {
  search_character,
  show_images_for_character,
} from "../config/Url_Config";
import { Footer } from "../routes/Footer";
import { useCheckAuth } from "../hooks/useCheckAuth";
import NavBar from "../routes/NavBar";
import { useFetch } from "../hooks/useFetch";

export const Perfil_Waifu = () => {
  const [waifuData, setWaifuData] = React.useState();
  const [wallpapers, setWallpapers] = React.useState([]);
  const { id } = useParams();

  const {acceso, CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const { data: dataWaifu, fetchData: consultarWaifu } = useFetch({
    endpoint: search_character,
    metodo: "GET",
    params: { id_personaje: id },
  });

  const { data: dataWallpapers, fetchData: consultarWallpapers } = useFetch({
    endpoint: show_images_for_character,
    metodo: "GET",
    params: { id_personaje: id },
  });

  useEffect(() => {
    if(!acceso) return;
    consultarWallpapers();
    consultarWaifu();
  }, [acceso]);

  useEffect(() => {
    if (!dataWaifu) return;
    setWaifuData(dataWaifu);
  }, [dataWaifu]);

  useEffect(() => {
    if (!dataWallpapers) return;
    setWallpapers(dataWallpapers);
  }, [dataWallpapers]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {waifuData && (
          <>
            <h1>
              {waifuData.nombre} ({waifuData.alias})
            </h1>
            {/* <p>{waifuData.descripcion}</p> */}
            <img src={waifuData.imagen_perfil} alt={waifuData.nombre} />
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
              <Link to={`/editar_waifu/${id}`}>Editar Perfil</Link>
            </div>
            <p></p>
            <div className="link-button">
              <Link to={`/agregar_wallpapers/${id}`}>Agregar Wallpaper</Link>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
