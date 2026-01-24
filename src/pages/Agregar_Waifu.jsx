import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../routes/NavBar";
import { useEffect } from "react";
import {
  show_kinds,
  show_personalities,
  register_character,
  assign_personality,
} from "../config/Url_Config";

export const Agregar_Waifu = () => {
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const [species, setSpecies] = React.useState([]);
  const [specieSelected, setSpecieSelected] = React.useState("");

  const [personalities, setPersonalities] = React.useState([]);
  const [personalitySelected, setPersonalitySelected] = React.useState("");

  const [nombre, setNombre] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [historia, setHistoria] = React.useState("");
  const [pasatiempo, setPasatiempo] = React.useState("");
  const [ocupacion, setOcupacion] = React.useState("");
  const [dia, setDia] = React.useState("");
  const [mes, setMes] = React.useState("");
  const [edad, setEdad] = React.useState("");

  //https://mudisdev.com/waifupaper/src/php/api/gestor_imagenes/subir_imagen.php

  useEffect(() => {
    const Fetch_Especies = async () => {
      try {
        const response = await fetch(show_kinds);
        const data = await response.json();
        console.log("Especies obtenidas =>", data);

        if (Array.isArray(data)) {
          setSpecies(data);
        }
      } catch (error) {
        console.error("Error al obtener especies =>", error);
      }
    };

    Fetch_Especies();
  }, []);

  useEffect(() => {
    const Fetch_Personalidades = async () => {
      try {
        const response = await fetch(show_personalities);
        const data = await response.json();
        console.log("Personalidades obtenidas =>", data);

        if (Array.isArray(data)) {
          setPersonalities(data);
        }
      } catch (error) {
        console.error("Error al obtener especies =>", error);
      }
    };

    Fetch_Personalidades();
  }, []);

  const Asignar_Personalidad = async (id_personaje) => {
    try {
      const response = await fetch(
        `${assign_personality}?id_personaje=${id_personaje}&id_personalidad=${personalitySelected}`,
      );
      const data = await response.json();
      console.log("Respuesta asignar personalidad => ", data);
      if (!data.Error) {
        alert("Personalidad asignada correctamente");
        alert("Waifu registrada correctamente");
      }
    } catch (e) {
      console.log(`Error al asignar personalidad => ${e}`);
    }
  };

  const Registrar_Personaje = async (imageUrl) => {
    try {
      const response = await fetch(`${register_character}?
      nombre=${nombre}&
                alias=${alias}&
                descripcion=${descripcion}&
                historia=${historia}&
                ocupacion=${ocupacion}&
                pasatiempo=${pasatiempo}&
                dia=${dia}&
                mes=${mes}&
                edad=${edad}&
                id_especie=${specieSelected}&
                imagen_perfil=${imageUrl}`);
      const data = await response.json();
      console.log("Respuesta registro personaje => ", data);

      if (!data.Error) {
        alert("Personaje registrado exitosamente");
        Asignar_Personalidad(data.id_generado);
      }
    } catch (e) {
      console.log(`Error al registrar personaje => ${e}`);
    }
  };

  const Subir_Imagen = async () => {
    const formData = new FormData();
    /* formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('phone', phoneNumber);
        formData.append('email', email); */

    formData.append("id_personaje", 0);

    if (image) {
      formData.append("imagen_perfil", image); // 👈 AQUÍ ESTÁ LA MAGIA
    }

    try {
      const response = await fetch(
        `https://mudisdev.com/waifupaper/src/php/api/gestor_imagenes/subir_imagen.php`,
        {
          //const response = await fetch(`${upload_image_to_server}`, {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      console.log("Respuesta subida imagen => ", data);
      if (data.Success) {
        console.log("IMAGEN SUBIDA => ", data);

        Registrar_Personaje(data.url);
        /* const booleanPublicImage = Boolean(publicImage); */
      } else if (data.Error) {
        console.warn("error", data);
        //ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
      }
    } catch (e) {
      console.log(`Error al subir imagen al servidor => ${e}`);
    }
  };

  const activateButton =
    image &&
    nombre != "" &&
    alias != "" &&
    descripcion != "" &&
    historia != "" &&
    pasatiempo != "" &&
    ocupacion != "" &&
    dia != "" &&
    mes != "" &&
    edad != "" &&
    personalitySelected != "" &&
    specieSelected != ""
      ? false
      : true;

  return (
    <div>
      <NavBar />
      <h1>Agregar Waifu</h1>
      <div className="form-waifu-container">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Historia"
          value={historia}
          onChange={(e) => setHistoria(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pasatiempos"
          value={pasatiempo}
          onChange={(e) => setPasatiempo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ocupacion"
          value={ocupacion}
          onChange={(e) => setOcupacion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Dia"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mes"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        {species.length > 0 && (
          <select
            name="especie"
            value={specieSelected}
            onChange={(e) => setSpecieSelected(e.target.value)}
          >
            <option value={""} /* disabled */>Selecciona una especie</option>
            {species.map((specie) => (
              <option key={specie.id_especie} value={specie.id_especie}>
                {specie.nombre}
              </option>
            ))}
          </select>
        )}

        {personalities.length > 0 && (
          <select
            name="Personalidad"
            value={personalitySelected}
            onChange={(e) => setPersonalitySelected(e.target.value)}
          >
            <option value={""} /* disabled */>
              Selecciona una personalidad
            </option>
            {personalities.map((personality) => (
              <option
                key={personality.id_personalidad}
                value={personality.id_personalidad}
              >
                {personality.nombre}
              </option>
            ))}
          </select>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <>
            <img
              src={preview}
              alt="Preview"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <p> preview - {preview} </p>
            <p> image - {image?.type} </p>
          </>
        )}

        <button disabled={activateButton} onClick={() => Subir_Imagen()}>
          Agregar Waifu
        </button>
      </div>
    </div>
  );
};
