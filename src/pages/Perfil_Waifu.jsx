import React, { useEffect } from "react";
import NavBar from "../routes/NavBar";
import { useParams } from "react-router-dom";
import { search_character } from "../config/Url_Config";
//import { useLocation } from "react-router-dom";

export const Perfil_Waifu = () => {
  //const location = useLocation();
  //const  {waifuData}  = location.state;
  const [waifuData, setWaifuData] = React.useState();
  const { id } = useParams();

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
          <h1>{waifuData.nombre} ({waifuData.alias})</h1>
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
        </>
      )}
    </div>
  );
};
