import React from "react";
import NavBar from "../routes/NavBar";
import { useEffect } from "react";
import { show_images } from "../config/Url_Config";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Footer } from "../routes/Footer";
import { useFetch } from "../hooks/useFetch";

export const Galeria = () => {
  const [imagenes, setImagenes] = React.useState([]);

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const { data: dataWallpapers, fetchData: cargarWallpapers } = useFetch({
    endpoint: show_images,
    metodo: "GET",
  });

  useEffect(() => {
    cargarWallpapers();
  }, []);

  useEffect(() => {
    if (dataWallpapers.length == 0) return;
    setImagenes(dataWallpapers);
  }, [dataWallpapers]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
