import React from "react";
import NavBar from "../routes/NavBar";
import { useEffect } from "react";
import { show_images } from "../config/Url_Config";
import { Link } from "react-router-dom";

export const Galeria = () => {
  const [imagenes, setImagenes] = React.useState([]);

  useEffect(() => {
    const Cargar_Imagenes = async () => {
      try {
        const response = await fetch(`${show_images}`);
        const data = await response.json();
        console.log("Imagenes obtenidas =>", data);

        if (Array.isArray(data) && data.length > 0) {
          // Aquí puedes procesar los datos de las imágenes
          const imgData = data.map((img) => ({
            id_imagen: img.id_imagen,
            imagen_listada: img.imagen_listada,
            url: img.url,
            /* fecha_actualizacion: img.fecha_actualizacion,
            fecha_insercion: img.fecha_insercion,
            id_modelo_base: img.id_modelo_base,
            semilla: img.semilla, */
          }));

          setImagenes(imgData);
        }
      } catch (error) {
        console.error("Error al obtener imagenes =>", error);
      }
    };

    Cargar_Imagenes();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Galeria</h1>

      {imagenes && imagenes.length > 0 && (
        <div className="galeria-container">
          {imagenes.map((img) => (
            <div className="galeria-card" key={img.id_imagen}>
                <Link to={`/wallpaper/${img.id_imagen}`}>
              <img src={img.url} alt={`Imagen ${img.id_imagen}`} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
