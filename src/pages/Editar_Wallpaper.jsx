import React, { useEffect, Switch } from "react";
import { Link, useParams } from "react-router-dom";
import {
  consult_tags,
  edit_wallpaper,
  image_server,
  //image_path,
  search_image,
  show_base_models,
  show_characters,
  show_characters_for_image,
  show_lora_models,
  show_lora_models_for_image,
  show_tags,
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
  const [availableLoras, setAvailableLoras] = React.useState([]);
  const [loraModelImage, setLoraModelImage] = React.useState([]);
  const [charactersImage, setCharactersImage] = React.useState([]);
  const [listCharacters, setListCharacters] = React.useState([]);
  const [listTags, setListTags] = React.useState([]);
  const [tagsImage, setTagsImage] = React.useState([]);

  const [loraSelected, setLoraSelected] = React.useState(null);
  const [waifuSelected, setWaifuSelected] = React.useState(null);
  const [tagSelected, setTagSelected] = React.useState(null);
  const [editarPrompt, setEditarPrompt] = React.useState("");
  const [editarFuerza, setEditarFuerza] = React.useState("");
  const [idEditarLora, setIdEditarLora] = React.useState(null);

  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  useEffect(() => {
    const Consultar_Modelos_Lora = async () => {
      try {
        const respose = await fetch(`${show_lora_models}`);
        const data = await respose.json();

        if (Array.isArray(data) && data.length > 0) {
          console.log("Data de los modelos lora -> ", data);

          setAvailableLoras(data);
        }
      } catch (error) {
        console.error("Error al consultar modelos lora, Error -> ", error);
      }
    };

    Consultar_Modelos_Lora();
  }, []);

  useEffect(() => {
    const Consultar_Modelos_Lora_Imagen = async () => {
      try {
        const respose = await fetch(
          `${show_lora_models_for_image}?id_imagen=${id}`,
        );
        const data = await respose.json();

        if (Array.isArray(data) && data.length > 0) {
          console.log("Data de los modelos lora del WALLPAPER -> ", data);

          setLoraModelImage(data);
        }
      } catch (error) {
        console.error("Error al consultar modelos lora, Error -> ", error);
      }
    };

    Consultar_Modelos_Lora_Imagen();
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
    const Consultar_Etiquetas = async () => {
      try {
        const response = await fetch(`${show_tags}`);
        const data = await response.json();

        console.log("Data de las etiquetas -> ", data);

        if (Array.isArray(data) && data.length > 0) {
          setListTags(data);
        }
      } catch (e) {
        console.log("Error al consultar etiquetas -> ", e);
      }
    };

    Consultar_Etiquetas();
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

  useEffect(() => {
    const Consultar_Personajes_Por_Imagen = async () => {
      try {
        const respose = await fetch(
          `${show_characters_for_image}?id_imagen=${id}`,
        );
        const data = await respose.json();

        if (Array.isArray(data) && data.length > 0) {
          console.log("Data de las waifus del WALLPAPER -> ", data);

          /* const waifus = data.map((waifu) => {waifu.nombre}); */

          setCharactersImage(data);
        }
      } catch (error) {
        console.error("Error al consultar Waifus, Error -> ", error);
      }
    };

    Consultar_Personajes_Por_Imagen();
  }, []);

  useEffect(() => {
    const Consultar_Etiquetas_Wallpaper = async () => {
      try {
        const response = await fetch(`${consult_tags}?id_imagen=${id}`);
        const data = await response.json();

        console.log("Data de las etiquetas del Wallpaper -> ", data);

        if (Array.isArray(data) && data.length > 0) {
          setTagsImage(data);
        }
      } catch (e) {
        console.log("Error al consultar etiquetas del wallpaper", e);
      }
    };

    Consultar_Etiquetas_Wallpaper();
  }, []);

  const Actualizar_Datos = async (url_wallpaper_nuevo) => {
    const loras = loraModelImage.map((lora) => lora.id_modelo_lora);
    const waifus = charactersImage.map((waifu) => waifu.id_personaje);
    const etiquetas = tagsImage.map((tag) => tag.id_etiqueta);
    const prompts_modelos_lora = loraModelImage
      .map((lora) => lora.prompt)
      .join("|");
    const fuerza_modelos_lora = loraModelImage.map((lora) => lora.fuerza);

    const params = new URLSearchParams({
      /* id_imagen: id,
      semilla: editWallpaper?.semilla,
      url: editWallpaper?.url,
      imagen_listada: editWallpaper?.imagen_listada,
      id_modelo_base: editWallpaper?.id_modelo_base, */
      id_imagen: id,
      semilla: editWallpaper?.semilla,
      url: url_wallpaper_nuevo ?? editWallpaper.url,
      imagen_listada: editWallpaper?.imagen_listada,
      id_modelo_base: editWallpaper?.id_modelo_base,
      //loras: JSON.stringify(loraModelImage),
      ids_modelos_lora: loras,
      //waifus: JSON.stringify(charactersImage),
      ids_personajes: waifus,
      ids_etiquetas: etiquetas,
      fuerza_modelos_lora: fuerza_modelos_lora,
      prompts_modelos_lora: prompts_modelos_lora,
    });

    console.log("Prueba de valores Bv -> ", params);

    try {
      const response = await fetch(`${edit_wallpaper}?${params.toString()}`);
      const data = await response.json();

      console.log("Estado de actualizacion -> ", data);

      //SOLO REGRESA TRUE 
      //POR LO QUE AQUI MARCA QUE NO SE ACTUALIZO PERO SI LO HACE BV
      if (data.Success) console.log("Actualizacion de wallpaper exitosa");
      else console.log("No se pudo actualizar el wallpaper");

      
    } catch (error) {
      console.error(
        "Error al intentar actualizar el wallpaper, error -> ",
        error,
      );
    }
  };

  const Actualizar_Wallpaper = () => {
    if (image) Subir_Imagen();
    else Actualizar_Datos(null);
  };

  const Listar_Imagen = (dato) => {
    setEditWallpaper({ ...editWallpaper, imagen_listada: dato });
  };

  const isModified =
    JSON.stringify(wallpaper) !== JSON.stringify(editWallpaper);

  /* const loraModelOptions = availableLoras.map((lm) => ({
    value: lm.id_modelo_lora,
    label: lm.nombre,
  })); */

  const loraModelOptions = availableLoras
    .filter(
      (lm) =>
        !loraModelImage.some((img) => img.id_modelo_lora == lm.id_modelo_lora),
    )
    .map((lm) => ({
      value: lm.id_modelo_lora,
      label: lm.nombre,
    }));

  const EliminarLora = (id) => {
    setLoraModelImage(
      loraModelImage.filter((lora) => lora.id_modelo_lora !== id),
    );
  };

  const AgregarLora = () => {
    setLoraModelImage([
      ...loraModelImage,
      {
        id_modelo_lora: loraSelected.value,
        nombre: loraSelected.label,
        prompt: "",
        fuerza: "",
      },
    ]);

    setLoraSelected(null);
  };

  const Editar_Lora = (id_lora) => {
    const lora = loraModelImage.find((lora) => lora.id_modelo_lora == id_lora);

    if (!lora) return;

    setIdEditarLora(lora.id_modelo_lora);
    setEditarFuerza(lora.fuerza);
    setEditarPrompt(lora.prompt);
  };

  const Guardar_Lora = () => {
    setLoraModelImage(
      loraModelImage.map((lora) =>
        lora.id_modelo_lora == idEditarLora
          ? {
              ...lora,
              /* id_modelo_lora: idEditarLora,
              nombre: loraSelected.label, */
              prompt: editarPrompt,
              fuerza: editarFuerza,
            }
          : lora,
      ),
    );

    setEditarFuerza("");
    setEditarPrompt("");
    setIdEditarLora(null);
  };

  const ListaWaifus = listCharacters
    .filter(
      (waifu) =>
        !charactersImage.some((img) => img.id_personaje == waifu.id_personaje),
    )

    .map((waifu) => ({
      value: waifu.id_personaje,
      label: waifu.nombre,
    }));

  const Eliminar_Waifu = (id) => {
    setCharactersImage(
      charactersImage.filter((waifu) => waifu.id_personaje !== id),
    );
  };

  const Agregar_Waifu = () => {
    setCharactersImage([
      ...charactersImage,
      {
        id_imagen: id,
        id_personaje: waifuSelected.value,
        nombre: waifuSelected.label,
      },
    ]);

    setWaifuSelected(null);
  };

  const Lista_Etiquetas = listTags
    .filter(
      (tag) => !tagsImage.some((img) => img.id_etiqueta == tag.id_etiqueta),
    )
    .map((tag) => ({
      value: tag.id_etiqueta,
      label: tag.nombre,
    }));

  const Agregar_Etiqueta = () => {
    setTagsImage([
      ...tagsImage,
      { id_etiqueta: tagSelected.value, nombre_etiqueta: tagSelected.label },
    ]);

    setTagSelected(null);
  };

  const Eliminar_Etiqueta = (id_etiqueta) => {
    setTagsImage(tagsImage.filter((tag) => tag.id_etiqueta !== id_etiqueta));
  };

  /*   id_modelo_base: e.target.value, */

  const LoraSelectNulo = loraSelected == null;

  useEffect(() => {
    const Consultar_Personajes = async () => {
      try {
        const response = await fetch(`${show_characters}`);

        const data = await response.json();

        console.log("Lista de Waifus -> ", data);

        if (Array.isArray(data) && data.length > 0) {
          /*  const waifus = data.map((waifu) => ({
            value: waifu.id_personaje,
            label: waifu.nombre,
          })); */

          setListCharacters(data);
        }
      } catch (error) {
        console.log("Error al consultar personajes, error -> ", error);
      }
    };

    Consultar_Personajes();
  }, []);

  const Probar_Actualizacion = () => {
    const loras = loraModelImage.map((lora) => lora.id_modelo_lora);
    const waifus = charactersImage.map((waifu) => waifu.id_personaje);
    const etiquetas = tagsImage.map((tag) => tag.id_etiqueta);
    const prompts_modelos_lora = loraModelImage
      .map((lora) => lora.prompt)
      .join("|");
    const fuerza_modelos_lora = loraModelImage.map((lora) => lora.fuerza);

    const variables = new URLSearchParams({
      id_imagen: id,
      url: editWallpaper?.url,
      semilla: editWallpaper?.semilla,
      imagen_listada: editWallpaper?.imagen_listada,
      id_modelo_base: editWallpaper?.id_modelo_base,
      //loras: JSON.stringify(loraModelImage),
      ids_etiquetas: etiquetas,
      ids_modelos_lora: loras,
      //waifus: JSON.stringify(charactersImage),
      ids_personajes: waifus,
      prompts_modelos_lora: prompts_modelos_lora,
      fuerza_modelos_lora: fuerza_modelos_lora,
    });

    console.log("Actualizacion de Prueba Bv -> ", variables);
  };

  const Subir_Imagen = async () => {
    const waifus = charactersImage.map((waifu) => waifu.id_personaje);
    const waifu = waifus[0];

    const formData = new FormData();
    /* formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('phone', phoneNumber);
        formData.append('email', email); */

    formData.append("id_personaje", waifu);

    if (image) {
      formData.append("imagen_perfil", image); // 👈 AQUÍ ESTÁ LA MAGIA
    }

    try {
      const response = await fetch(
        `${image_server}`,
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

        Actualizar_Datos(data.url);
        /* const booleanPublicImage = Boolean(publicImage); */
      } else if (data.Error) {
        console.warn("error", data);
        //ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
      }
    } catch (e) {
      console.log(`Error al subir imagen al servidor => ${e}`);
    }
  };

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

          <p>Etiquetas del Wallpaper</p>

          <div
            style={{
              width: "900px",
              background: "gray",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {tagsImage.length > 0 ? (
              <>
                {tagsImage.map((tag) => (
                  <div
                    key={tag.id_etiqueta}
                    style={{
                      background: "black",
                      width: "220px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <p>{tag.nombre_etiqueta}</p>
                    <button onClick={() => Eliminar_Etiqueta(tag.id_etiqueta)}>
                      X
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p>No hay etiquetas Bv</p>
              </>
            )}
          </div>

          <Select
            //isMulti
            //instanceId="lora-select"
            instanceId={`Etiqueta`}
            options={Lista_Etiquetas}
            value={tagSelected}
            onChange={setTagSelected}
            closeMenuOnSelect={true}
            placeholder="Selecciona Etiquetas..."
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

          <button disabled={!tagSelected} onClick={() => Agregar_Etiqueta()}>
            Agregar Etiqueta
          </button>

          <p>Waifus en el Wallpaper:</p>

          <div
            style={{
              width: "900px",
              background: "yellow",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {charactersImage.length > 0 ? (
              <>
                {charactersImage.map((waifu) => (
                  <div
                    key={waifu.id_personaje}
                    style={{
                      background: "blue",
                      width: "220px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <p>{waifu.nombre}</p>
                    <button onClick={() => Eliminar_Waifu(waifu.id_personaje)}>
                      X
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p>No hay Waifus Bv</p>
              </>
            )}
          </div>

          <Select
            //isMulti
            //instanceId="lora-select"
            instanceId={`waifu-${id}`}
            options={ListaWaifus}
            value={waifuSelected}
            onChange={setWaifuSelected}
            closeMenuOnSelect={true}
            placeholder="Selecciona Waifus..."
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

          <button disabled={!waifuSelected} onClick={() => Agregar_Waifu()}>
            Agregar Waifu
          </button>

          <p>semilla</p>

          <input
            type="text"
            value={editWallpaper.semilla}
            onChange={(e) =>
              setEditWallpaper({ ...editWallpaper, semilla: e.target.value })
            }
          />
          <p>url</p>
          <p>{editWallpaper.url}</p>
          {/*   <input
            type="text"
            value={editWallpaper.url}
            onChange={(e) =>
              setEditWallpaper({ ...editWallpaper, url: e.target.value })
            }
          /> */}
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
              <p style={{ fontWeight: "bold" }}>Listada</p>
            </>
          ) : (
            <>
              <button onClick={() => Listar_Imagen(1)}>
                <ion-icon name="eye-off-outline"></ion-icon>
              </button>
              <p style={{ fontWeight: "bold" }}>No listada</p>
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

          <p style={{ fontWeight: "bold" }}>Loras del Wallpaper</p>

          <div
            style={{
              width: "900px",
              background: "green",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {loraModelImage.map((lora) => (
              <div
                key={lora.id_modelo_lora}
                style={{ background: "white", width: "100%" }}
              >
                <div
                  style={{
                    background: "red",
                    width: "250px",
                    gap: "10px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>{lora.nombre}</p>
                  <button onClick={() => EliminarLora(lora.id_modelo_lora)}>
                    X
                  </button>
                </div>

                <div
                  style={{
                    background: "red",
                    width: "250px",
                    gap: "10px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>{lora.prompt}</p>
                  <p>{lora.fuerza}</p>
                </div>
                <div
                  style={{
                    background: "red",
                    width: "250px",
                    gap: "10px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <button onClick={() => Editar_Lora(lora.id_modelo_lora)}>
                    Editar este lora Bv
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p>Editar Lora</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="Prompt"
              value={editarPrompt}
              onChange={(e) => {
                setEditarPrompt(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Fuerza"
              value={editarFuerza}
              onChange={(e) => {
                setEditarFuerza(e.target.value);
              }}
            />
            <button
              disabled={
                editarFuerza == "" || editarPrompt == "" || !idEditarLora
              }
              onClick={Guardar_Lora}
            >
              Editar Lora
            </button>
            {/*         value={editWallpaper.url}
            onChange={(e) =>
              setEditWallpaper({ ...editWallpaper, url: e.target.value }) */}
          </div>
          <p></p>
          <Select
            //isMulti
            //instanceId="lora-select"
            instanceId={`lora-${id}`}
            options={loraModelOptions}
            value={loraSelected}
            onChange={setLoraSelected}
            closeMenuOnSelect={true}
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

          <button disabled={!loraSelected} onClick={() => AgregarLora()}>
            Agregar Lora
          </button>
          <p></p>
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

          <p></p>
          {/* <button disabled={!isModified} onClick={() => Actualizar_Wallpaper()}> */}
          <button disabled={!isModified} onClick={Actualizar_Wallpaper}>
            Actualizar Wallpaper
          </button>
        </>
      )}
    </div>
  );
};
