import React, { useEffect, Switch } from "react";
import { Link, useParams } from "react-router-dom";
import {
  edit_image,
  //image_path,
  search_image,
  show_base_models,
  show_lora_models,
} from "../config/Url_Config";
import "../styles/appstyles.css";
import NavBar from "../routes/NavBar";
import { useState } from "react";
import { ColorFill } from "react-ionicons";
import Select from "react-select";

export const Editar_Wallpaper = () => {
  const { id } = useParams();

  const [wallpaper, setWallpaper] = useState(null);
  const [editWallpaper, setEditWallpaper] = useState(null);
  const [baseModel, setBaseModel] = React.useState([]);
  const [loraModel, setLoraModel] = React.useState([]);

  
  const [loraSelected, setLoraSelected] = React.useState([]);

  useEffect(() => {
    const Consultar_Modelos_Lora = async () => {
      try {
        const respose = await fetch(`${show_lora_models}`);
        const data = await respose.json();

        if (Array.isArray(data) && data.length > 0) {
          console.log("Data de los modelos lora -> ", data);

          setLoraModel(data);
        }
      } catch (error) {
        console.error("Error al consultar modelos lora, Error -> ", error);
      }
    };

    Consultar_Modelos_Lora();
  }, []);

  useEffect(() => {
    const Consultar_Modelos_Base = async () => {
      try {
        const respose = await fetch(`${show_base_models}`);
        const data = await respose.json();

        if (Array.isArray(data) && data.length > 0) {
          console.log("Data de los modelos base -> ", data);

          setBaseModel(data);
        }
      } catch (error) {
        console.error("Error al consultar modelos base, Error -> ", error);
      }
    };

    Consultar_Modelos_Base();
  }, []);

  useEffect(() => {
    const Buscar_Wallpaper = async () => {
      try {
        const response = await fetch(`${search_image}?id_imagen=${id}`);
        const data = await response.json();
        console.log("Data ->", data);
        if (Array.isArray(data) && data.length > 0) {
          const wallpaperData = {
            fecha_actualizacion: data[0].fecha_actualizacion,
            fecha_insercion: data[0].fecha_insercion,
            id_imagen: data[0].id_imagen,
            id_modelo_base: data[0].id_modelo_base,
            imagen_listada: data[0].imagen_listada,
            semilla: data[0].semilla,
            url: data[0].url,
          };
          setWallpaper(wallpaperData);
          setEditWallpaper({ ...wallpaperData });
          console.log("Wallpaper data ->", wallpaper);
        } else {
          console.log("No se encontro el wallpaper Bv");
        }
      } catch (error) {
        console.error("Error al buscar wallpaper -> ", error);
      }
    };

    Buscar_Wallpaper();
  }, [id]);

  const Actualizar_Wallpaper = async () => {
    try {
      const params = new URLSearchParams({
        id_imagen: id,
        semilla: editWallpaper?.semilla,
        url: editWallpaper?.url,
        imagen_listada: editWallpaper?.imagen_listada,
        id_modelo_base: editWallpaper?.id_modelo_base,
      });

      const response = await fetch(`${edit_image}?${params.toString()}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        if (data.Success) {
          console.log("Actualizacion de wallpaper exitosa");
        } else {
          console.log("No se pudo actualizar el wallpaper");
        }
      }
    } catch (error) {
      console.error(
        "Error al intentar actualizar el wallpaper, error -> ",
        error,
      );
    }
  };

  const Listar_Imagen = (dato) => {
    setEditWallpaper({ ...editWallpaper, imagen_listada: dato });
  };

  const isModified =
    JSON.stringify(wallpaper) !== JSON.stringify(editWallpaper);

  const loraModelOptions = loraModel.map((lm) => ({
    value: lm.id_modelo_lora,
    label: lm.nombre,
  }));

  return (
    <div>
      <NavBar />
      <h1>Editar Wallpaper</h1>

      {!wallpaper ? (
        <>
          <p>cargando wallpaper</p>
        </>
      ) : (
        <>
          <img style={{ height: 500 }} src={wallpaper.url} />
          <p>Id wallpaper {wallpaper?.id_imagen}</p>

          {/* <input
            type="number"
            value={editWallpaper.id_modelo_base}
            onChange={(e) =>
              setEditWallpaper({
                ...editWallpaper,
                id_modelo_base: e.target.value,
              })
            }
          /> */}
          <p>semilla</p>

          <input
            type="text"
            value={editWallpaper.semilla}
            onChange={(e) =>
              setEditWallpaper({ ...editWallpaper, semilla: e.target.value })
            }
          />
          <p>url</p>
          <input
            type="text"
            value={editWallpaper.url}
            onChange={(e) =>
              setEditWallpaper({ ...editWallpaper, url: e.target.value })
            }
          />
          <p>imagen listada</p>

          {/* <input
            type="number"
            value={editWallpaper.imagen_listada}
            onChange={(e) =>
              setEditWallpaper({
                ...editWallpaper,
                imagen_listada: e.target.value,
              })
            }
          /> */}
          <p></p>

          {editWallpaper.imagen_listada == 1 ? (
            <>
              <button onClick={() => Listar_Imagen(0)}>
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => Listar_Imagen(1)}>
                <ion-icon name="eye-off-outline"></ion-icon>
              </button>
            </>
          )}

          <p></p>

          <p>id modelo base - {editWallpaper?.id_modelo_base} </p>
          <p></p>
          {baseModel.length > 0 ? (
            <select
              value={editWallpaper.id_modelo_base}
              onChange={(e) =>
                setEditWallpaper({
                  ...editWallpaper,
                  id_modelo_base: e.target.value,
                })
              }
            >
              {/* <option value={""}  disabled >
                Selecciona un modelo base */}
              <option value={""} /* disabled */>
                Selecciona un modelo base
              </option>
              {baseModel.map((model) => (
                <option key={model.id_modelo_base} value={model.id_modelo_base}>
                  {model.nombre}
                </option>
              ))}
            </select>
          ) : (
            <>
              <p>No se han cargado los modelos base</p>
            </>
          )}

          <Select
            isMulti
            //instanceId="lora-select"
            instanceId={`lora-${id}`}
            options={loraModelOptions}
            value={loraSelected}
            onChange={setLoraSelected}
            closeMenuOnSelect={false}
            placeholder="Selecciona Loras..."
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#1e1e1e",
                border: "1px solid #444",
                color: "white",
              }),

              menu: (base) => ({
                ...base,
                backgroundColor: "#1e1e1e",
              }),

              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#333" : "#1e1e1e",
                color: "white",
              }),

              multiValue: (base) => ({
                ...base,
                backgroundColor: "#333",
              }),

              multiValueLabel: (base) => ({
                ...base,
                color: "white",
              }),

              multiValueRemove: (base) => ({
                ...base,
                color: "white",
                ":hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }),
            }}
          />

          <p></p>
          <button disabled={!isModified} onClick={() => Actualizar_Wallpaper()}>
            Actualizar Wallpaper
          </button>
        </>
      )}
    </div>
  );
};
