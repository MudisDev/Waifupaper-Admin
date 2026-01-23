import React from "react";
import { Link } from "react-router-dom";
import { show_images_for_character } from "../config/Url_Config";
import "../styles/appstyles.css";
import NavBar from "../routes/NavBar";


export const Editar_Wallpapers = () => {
  const [wallpapers, setWallpapers] = React.useState([]);
  const [waifuId, setWaifuId] = React.useState();

  const Buscar_Wallpapers = () => {
    fetch(`${show_images_for_character}?id_personaje=${waifuId}`)
    //fetch(`https://www.mudisdev.com/waifupaper/src/php/api/lista/mostrar_imagenes_por_personaje.php?id_personaje=${waifuId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Wallpapers encontrados =>", data);

        if (Array.isArray(data) && data.length > 0) {
          const wallpapersData = data.map((wallpaper) => ({
            id_imagen: wallpaper.id_imagen,
            url: wallpaper.url,
          }));

          setWallpapers(wallpapersData);
        }
      })
      .catch((error) => {
        console.error("Error al encontrar wallpapers =>", error);
      });
  };

  return (
    <div>
      <NavBar/>
      {/* <textarea rows="10" cols="50"></textarea> */}
      <div>
        <input type="text" placeholder="ID de la waifu Bv" value={waifuId} onChange={(e) => setWaifuId(e.target.value)} />
        <button onClick={() => Buscar_Wallpapers()}>Buscar wallpapers</button>
      </div>

      <div className="wallpapers-container">
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id_imagen}>
            <img src={wallpaper.url} />
          </div>
        ))}
      </div>
    </div>
  );
};
