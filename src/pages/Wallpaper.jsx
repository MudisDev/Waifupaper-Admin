import React, { useEffectEvent } from "react";
import NavBar from "../routes/NavBar";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  consult_tags,
  search_view_image,
  show_characters_for_image,
  show_lora_models_for_image,
} from "../config/Url_Config";
import { Footer } from "../routes/Footer";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useFetch } from "../hooks/useFetch";

export const Wallpaper = () => {
  const { id } = useParams();
  const [wallpaper, setWallpaper] = React.useState(null);

  const [tags, setTags] = React.useState(null);
  const [loras, setLoras] = React.useState(null);
  const [characters, setCharacters] = React.useState(null);

  const {acceso, CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const { data: listaWaifus, fetchData: consultarWaifus } = useFetch({
    endpoint: show_characters_for_image,
    metodo: "GET",
    params: { id_imagen: id },
  });
  const { data: listaEtiquetas, fetchData: consultarEtiquetas } = useFetch({
    endpoint: consult_tags,
    metodo: "GET",
    params: { id_imagen: id },
  });
  const { data: listaLoras, fetchData: consultarLoras } = useFetch({
    endpoint: show_lora_models_for_image,
    metodo: "GET",
    params: { id_imagen: id },
  });
  const { data: dataWallpaper, fetchData: consultarWallpaper } = useFetch({
    endpoint: search_view_image,
    metodo: "GET",
    params: { id_imagen: id },
  });

  useEffect(() => {
    if(!acceso) return;
    consultarEtiquetas();
    consultarWaifus();
    consultarLoras();
    consultarWallpaper();
  }, [acceso]);

  useEffect(() => {
    if (listaWaifus.length == 0) return;
    setCharacters(listaWaifus);
  }, [listaWaifus]);

  useEffect(() => {
    if (listaEtiquetas.length == 0) return;
    setTags(listaEtiquetas);
  }, [listaEtiquetas]);

  useEffect(() => {
    if (listaLoras.length == 0) return;
    setLoras(listaLoras);
  }, [listaLoras]);

  useEffect(() => {
    if (dataWallpaper.length == 0) return;
    setWallpaper(dataWallpaper);
  }, [dataWallpaper]);

  console.log("Lista Loras -> ",listaLoras);

  /* useEffect(() => {
    const Consultar_Personajes = async () => {
      try {
        const response = await fetch(
          `${show_characters_for_image}?id_imagen=${id}`,
        );
        const data = await response.json();
        console.log(`personajes consultados => `, data);

        if (!data.Error) {
          const dataCharacters = data.map((character) => ({
            id_imagen: character.id_imagen,
            id_personaje: character.id_personaje,
            nombre: character.nombre,
          }));

          setCharacters(dataCharacters);
        }
      } catch (error) {
        console.error(`Error al consultar personajes - ${error}`);
      }
    };

    Consultar_Personajes();
  }, [id]); */

  /*   useEffect(() => {
    const Consultar_Etiquetas = async () => {
      try {
        const response = await fetch(`${consult_tags}?id_imagen=${id}`);
        const data = await response.json();
        console.log(`Etiquetas consultadas => ${data}`);

        if (!data.Error) {
          const dataTags = data.map((tag) => ({
            id_etiqueta: tag.id_etiqueta,
            nombre_etiqueta: tag.nombre_etiqueta,
          }));

          setTags(dataTags);
        }
      } catch (error) {
        console.error(`Error al consultar etiquetas - ${error}`);
      }
    };

    Consultar_Etiquetas();
  }, [id]); */

/*   useEffect(() => {
    const Consultar_Loras = async () => {
      try {
        const response = await fetch(
          `${show_lora_models_for_image}?id_imagen=${id}`,
        );
        const data = await response.json();
        console.log(`Loras consultados => ${data}`);

        if (!data.Error) {
          const dataLoras = data.map((lora) => ({
            id_modelo_lora: lora.id_modelo_lora,
            nombre_modelo_lora: lora.nombre,
           // nombre_etiqueta: lora.nombre_etiqueta, 
          }));

          setLoras(dataLoras);
        }
      } catch (error) {
        console.error(`Error al consultar loras - ${error}`);
      }
    };

    Consultar_Loras();
  }, [id]); */

/*   useEffect(() => {
    const fetchWallpaperData = async () => {
      try {
        const response = await fetch(`${search_view_image}?id_imagen=${id}`);
        const data = await response.json();
        console.log("Wallpaper data =>", data);

        if (Array.isArray(data) && data.length > 0) {
          const imgData = data.map((img) => ({
            id_imagen: img.id_imagen,
            imagen_listada: img.imagen_listada,
            url: img.url,
            fecha_actualizacion: img.fecha_actualizacion,
            fecha_insercion: img.fecha_insercion,
            id_modelo_base: img.id_modelo_base,
            nombre_modelo_base: img.nombre_modelo_base,
            semilla: img.semilla,
          }));

          setWallpaper(imgData);
        }
      } catch (error) {
        console.error("Error fetching wallpaper data =>", error);
      }
    };

    fetchWallpaperData();
  }, [id]); */

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Wallpaper</h1>
        {wallpaper && (
          <>
            <img
              className="wallpaper"
              src={wallpaper.url}
              alt={`Wallpaper ${wallpaper.id_imagen}`}
            />

            {tags && (
              <>
                <ul className="tags-container">
                  {tags.map((tag) => (
                    <li key={tag.id_etiqueta} className="tag">
                      <p>{tag.nombre_etiqueta}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p>Waifus en el Wallpaper</p>
            {characters && (
              <>
                <ul className="tags-container">
                  {characters.map((character) => (
                    <li key={character.id_personaje} className="tag">
                      {/* <p>{lora.nombre_lora}</p> */}
                      <p>{character.nombre}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p>Modelos Loras</p>
            {loras && (
              <>
                <ul className="tags-container">
                  {loras.map((lora) => (
                    <li key={lora.id_modelo_lora} className="tag">
                      {/* <p>{lora.nombre_lora}</p> */}
                      {/* <p>{lora.id_modelo_lora}</p> */}
                      <p>{lora.nombre}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="link-button">
              <Link to={`/editar_wallpaper/${id}`}>Editar Wallpaper</Link>
            </div>
            <p></p>
            <p>ID Imagen: {wallpaper.id_imagen}</p>
            <p>Imagen Listada: {wallpaper.imagen_listada}</p>
            <p>Fecha Actualización: {wallpaper.fecha_actualizacion}</p>
            <p>Fecha Inserción: {wallpaper.fecha_insercion}</p>
            <p>ID Modelo Base: {wallpaper.id_modelo_base}</p>
            <p>Nombre Modelo Base: {wallpaper.nombre_modelo_base}</p>
            <p>Semilla: {wallpaper.semilla}</p>
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
