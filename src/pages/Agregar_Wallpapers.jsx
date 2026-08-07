import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../routes/NavBar";
import { useFetch } from "../hooks/useFetch";
import {

  show_base_models,
  show_lora_models,
  show_characters,
  show_tags,
  edit_wallpaper,
} from "../config/Url_Config";
import { useArrayHelpers } from "../hooks/useArrayHelpers";
import { useLoraEditor } from "../hooks/useLoraEditor";
import Select from "react-select";
import { useUploadImage } from "../hooks/useUploadImage";

export const Agregar_Wallpapers = () => {
  const { id: idWaifu } = useParams();
  const [listaWallpapers, setListaWallpapers] = React.useState([]);
  const [waifuSeleccionada, setWaifuSeleccionada] = React.useState("");
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = React.useState("");

  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [modeloLoraSeleccionado, setModeloLoraSeleccionado] =
    React.useState("");

  const crearWallpaper = () => ({
    id_wallpaper: null,
    semilla: "",
    /* url: "", */
    imagen_listada: 0,
    id_modelo_base: "",
    personajes: [],
    etiquetas: [],
    modelos_lora: [],
    prompt_positivo_general: "",
    prompt_negativo_general: "",
  });

  const crearLora = () => ({
    id_modelo_lora: null,
    prompt_positivo: "",
    prompt_negativo: "",
    fuerza: "",
  });

  const [wallpaperEditable, setWallpaperEditable] =
    React.useState(crearWallpaper());

  const [loraEdicion, setLoraEdicion] = useState(crearLora());

  const { data: listaModelosBase, fetchData: consultarModelosBase } = useFetch({
    endpoint: show_base_models,
  });
  const { data: listaModelosLora, fetchData: consultarModelosLora } = useFetch({
    endpoint: show_lora_models,
  });

  const { data: listaEtiquetas, fetchData: consultarEtiquetas } = useFetch({
    endpoint: show_tags,
  });

  const { data: listaWaifus, fetchData: consultarWaifus } = useFetch({
    endpoint: show_characters,
  });

  const { agregarElementoObjetoArray, eliminarElementoObjetoArray } =
    useArrayHelpers();

  const { seleccionarLoraEdicion, guardarCambiosLora } = useLoraEditor();

  const { subirImagen } = useUploadImage();

  useEffect(() => {
    consultarModelosBase();
    consultarModelosLora();
    consultarWaifus();
    consultarEtiquetas();
  }, []);

  const agregarWallpaper = () => {
    const id = Number(listaWallpapers.length) + 1;
    setListaWallpapers([
      ...listaWallpapers,
      {
        ...crearWallpaper(),
        id_wallpaper: id,
        imagen_perfil: image,
      },
    ]);
  };

  const seleccionarWallpaper = (id_wallpaper) => {
    const wallpaper = listaWallpapers.find(
      (w) => w.id_wallpaper == id_wallpaper,
    );
    setWallpaperEditable(wallpaper);

    setModoEdicion(true);
  };

  const guardarCambiosWallpaper = () => {
    setListaWallpapers(
      listaWallpapers.map((wallpaperOriginal) =>
        wallpaperOriginal.id_wallpaper == wallpaperEditable.id_wallpaper
          ? wallpaperEditable
          : wallpaperOriginal,
      ),
    );

    setModoEdicion(false);
    setWallpaperEditable(crearWallpaper());
  };

  const Listar_Imagen = (dato) => {
    setWallpaperEditable({ ...wallpaperEditable, imagen_listada: dato });
  };

  const elementosDisponibles = (
    listaTotal,
    listaEditable,
    idElemento,
    nombreElemento,
  ) => {
    return listaTotal
      .filter(
        (lt) => !listaEditable.some((le) => le[idElemento] == lt[idElemento]),
      )
      .map((e) => ({ value: e[idElemento], label: e[nombreElemento] }));
  };

  const waifusDisponibles = elementosDisponibles(
    listaWaifus,
    /* listaEditableWaifusWallpaper, */
    wallpaperEditable.personajes,
    "id_personaje",
    "nombre",
  );
  const etiquetasDisponibles = elementosDisponibles(
    listaEtiquetas,
    wallpaperEditable.etiquetas,
    "id_etiqueta",
    "nombre",
  );
  const lorasDisponibles = elementosDisponibles(
    listaModelosLora,
    wallpaperEditable.modelos_lora,
    "id_modelo_lora",
    "nombre",
  );

  const listo = (idW) => {
    const wallpaper = listaWallpapers.find((w) => w.id_wallpaper == idW);
    if (!wallpaper) return;
    if (
      wallpaper.id_wallpaper != null &&
      wallpaper.semilla != "" &&
      /* wallpaper.imagen_listada != null && */
      wallpaper.id_modelo_base != null &&
      wallpaper.personajes.length > 0 &&
      wallpaper.etiquetas.length > 0 &&
      wallpaper.modelos_lora.length > 0 &&
      wallpaper.prompt_positivo_general != "" &&
      wallpaper.prompt_negativo_general != ""
      /* wallpaper.url != "" && */
    ) {
      return true;
    }
    return false;
  };

  const probarSubida = () => {

    listaWallpapers.map((wallpaper) => {
      console.log("Wallpaper #", wallpaper.id_wallpaper);

      const etiquetas = wallpaper.etiquetas.map((tag) => tag.id_etiqueta);
      const waifus = wallpaper.personajes.map((waifu) => waifu.id_personaje);
      const loras = wallpaper.modelos_lora.map((lora) => lora.id_modelo_lora);
      const fuerzaLoras = wallpaper.modelos_lora.map((lora) => lora.fuerza);
      const promptsNegativos = wallpaper.modelos_lora
        .map((lora) => lora.prompt_negativo)
        .join("|");
      const promptsPositivos = wallpaper.modelos_lora
        .map((lora) => lora.prompt_positivo)
        .join("|");

      const variables = new URLSearchParams({
        semilla: wallpaper.semilla,
        imagen_listada: wallpaper.imagen_listada,
        id_modelo_base: wallpaper.id_modelo_base,

        //FALTA URL Bv

        prompt_positivo_general: wallpaper.prompt_positivo_general,
        prompt_negativo_general: wallpaper.prompt_negativo_general,

        ids_personajes: waifus,
        ids_etiquetas: etiquetas,

        ids_modelos_lora: loras,
        fuerza_modelos_lora: fuerzaLoras,
        prompts_positivos_modelos_lora: promptsPositivos,
        prompts_negativos_modelos_lora: promptsNegativos,
      });
      console.log(variables);
    });
  };

  const subirWallpapers = async () => {
    for (const wallpaper of listaWallpapers) {
      let urlNueva = null;
      let primerWaifuLista = wallpaper.personajes[0].id_personaje;

      if (wallpaper.imagen_perfil) {
        urlNueva = await subirImagen({
          waifu: primerWaifuLista,
          image: wallpaper.imagen_perfil,
        });
      }
      await subirDatos(wallpaper, urlNueva);
    }
  };

  const subirDatos = async (wallpaper, url_wallpaper_nuevo) => {
    
    const etiquetas = wallpaper.etiquetas.map((tag) => tag.id_etiqueta);
    const waifus = wallpaper.personajes.map((waifu) => waifu.id_personaje);
    const loras = wallpaper.modelos_lora.map((lora) => lora.id_modelo_lora);
    const fuerzaLoras = wallpaper.modelos_lora.map((lora) => lora.fuerza);
    const promptsNegativos = wallpaper.modelos_lora
      .map((lora) => lora.prompt_negativo)
      .join("|");
    const promptsPositivos = wallpaper.modelos_lora
      .map((lora) => lora.prompt_positivo)
      .join("|");

    const variables = new URLSearchParams({
      semilla: wallpaper.semilla,
      imagen_listada: wallpaper.imagen_listada,
      id_modelo_base: wallpaper.id_modelo_base,

      url: url_wallpaper_nuevo,

      prompt_positivo_general: wallpaper.prompt_positivo_general,
      prompt_negativo_general: wallpaper.prompt_negativo_general,

      ids_personajes: waifus,
      ids_etiquetas: etiquetas,

      ids_modelos_lora: loras,
      fuerza_modelos_lora: fuerzaLoras,
      prompts_positivos_modelos_lora: promptsPositivos,
      prompts_negativos_modelos_lora: promptsNegativos,
    });
    console.log(variables);

    try {
      const response = await fetch(`${edit_wallpaper}?${variables.toString()}`);
      const data = await response.json();
      //const texto = await response.text();

      //console.log("RESPUESTA actualizacion -> ", texto);

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

  return (
    <div>
      <NavBar />
      <h1>Agregar Wallpapers</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          /* background: "aquamarine", */
          flexWrap: "wrap",
          width: 800,
          justifyContent: "center",
        }}
      >
        {listaWallpapers.length > 0 ? (
          <>
            {listaWallpapers.map((wallpaper) => (
              <button
                key={wallpaper.id_wallpaper}
                style={{
                  padding: 10,
                  width: 180,
                  height: 320,

                  ...(listo(wallpaper.id_wallpaper)
                    ? { background: "green" }
                    : { background: "red" }),
                }}
                disabled={modoEdicion}
                onClick={() => seleccionarWallpaper(wallpaper.id_wallpaper)}
              >
                <img
                  src={URL.createObjectURL(wallpaper.imagen_perfil)}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: 10, objectFit: "cover" }}
                />
              </button>
            ))}
          </>
        ) : (
          <p>No hay wallpapers agregados Bv</p>
        )}
      </div>
      <p></p>

      <input
        type="file"
        disabled={modoEdicion}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(file);
          if (file) setPreview(URL.createObjectURL(file));
        }}
      />

      <p></p>

      <button disabled={modoEdicion || !image} onClick={agregarWallpaper}>
        Agregar Wallpaper
      </button>

      {modoEdicion ? (
        <>
          <p>Wallpaper #{wallpaperEditable.id_wallpaper}</p>

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
            {wallpaperEditable.etiquetas.length > 0 ? (
              <>
                {wallpaperEditable.etiquetas.map((tag) => (
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
                    <button
                      onClick={() =>
                        eliminarElementoObjetoArray(
                          setWallpaperEditable,
                          "etiquetas",
                          "id_etiqueta",
                          tag.id_etiqueta,
                        )
                      }
                    >
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
            options={etiquetasDisponibles}
            value={etiquetaSeleccionada}
            onChange={setEtiquetaSeleccionada}
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
            }}
          />

          <button
            disabled={!etiquetaSeleccionada}
            onClick={() =>
              agregarElementoObjetoArray(
                setWallpaperEditable,
                "etiquetas",
                {
                  id_etiqueta: etiquetaSeleccionada.value,
                  nombre_etiqueta: etiquetaSeleccionada.label,
                },
                setEtiquetaSeleccionada,
              )
            }
          >
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
            {/* {listaEditableWaifusWallpaper.length > 0 ? ( */}
            {wallpaperEditable.personajes.length > 0 ? (
              <>
                {/* {listaEditableWaifusWallpaper.map((waifu) => ( */}
                {wallpaperEditable.personajes.map((waifu) => (
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
                    <button
                      onClick={() =>
                        eliminarElementoObjetoArray(
                          /* setListaEditableWaifusWallpaper, */
                          setWallpaperEditable,
                          "personajes",
                          "id_personaje",
                          waifu.id_personaje,
                        )
                      }
                    >
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
            instanceId={`waifu-${idWaifu}`}
            options={waifusDisponibles}
            value={waifuSeleccionada}
            onChange={setWaifuSeleccionada}
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
            }}
          />

          <button
            disabled={!waifuSeleccionada}
            onClick={() =>
              agregarElementoObjetoArray(
                /* setListaEditableWaifusWallpaper, */

                setWallpaperEditable,
                "personajes",
                {
                  //id_imagen: id_wallpaper,
                  id_personaje: waifuSeleccionada.value,
                  nombre: waifuSeleccionada.label,
                },
                setWaifuSeleccionada,
              )
            }
          >
            Agregar Waifu
          </button>

          <p>semilla</p>

          <input
            type="text"
            value={wallpaperEditable.semilla}
            onChange={(e) =>
              setWallpaperEditable({
                ...wallpaperEditable,
                semilla: e.target.value,
              })
            }
          />

          <p>Prompts generales</p>

          <input
            type="text"
            placeholder="Prompt Positivo General"
            value={wallpaperEditable.prompt_positivo_general}
            //disabled={!loraEdicion.id_modelo_lora}
            onChange={(e) =>
              setWallpaperEditable((stateAnterior) => ({
                ...stateAnterior,
                prompt_positivo_general: e.target.value,
              }))
            }
          />
          <p></p>
          <input
            type="text"
            placeholder="Prompt Negativo General"
            value={wallpaperEditable.prompt_negativo_general}
            //disabled={!loraEdicion.id_modelo_lora}
            onChange={(e) =>
              setWallpaperEditable((stateAnterior) => ({
                ...stateAnterior,
                prompt_negativo_general: e.target.value,
              }))
            }
          />

          <p>imagen listada</p>

          <p></p>

          {wallpaperEditable.imagen_listada == 1 ? (
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

          <p>id modelo base - {wallpaperEditable?.id_modelo_base} </p>
          <p></p>
          {listaModelosBase.length > 0 ? (
            <select
              value={wallpaperEditable.id_modelo_base}
              onChange={(e) =>
                setWallpaperEditable({
                  ...wallpaperEditable,
                  id_modelo_base: e.target.value,
                })
              }
            >
              {/* <option value={""}  disabled >
                Selecciona un modelo base */}
              <option value={""} /* disabled */>
                Selecciona un modelo base
              </option>
              {listaModelosBase.map((model) => (
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

          <p>loras</p>
          {wallpaperEditable.modelos_lora.length > 0 ? (
            <div
              style={{
                background: "green",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {wallpaperEditable.modelos_lora.map((lora) => (
                <div
                  key={lora.id_modelo_lora}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    background: "gray",
                  }}
                >
                  <p>
                    #{lora.id_modelo_lora} - {lora.nombre}
                  </p>
                  <button>X</button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No hay LoRas Bv</p>
            </div>
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
            {wallpaperEditable.modelos_lora.map((lora) => (
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
                  <p>F {lora.fuerza}</p>
                  <button
                    onClick={() =>
                      eliminarElementoObjetoArray(
                        setWallpaperEditable,
                        "modelos_lora",
                        "id_modelo_lora",
                        lora.id_modelo_lora,
                      )
                    }
                  >
                    X
                  </button>
                </div>

                <div
                  style={{
                    background: "red",
                    width: "250px",
                    gap: "10px",
                    /*  display: "flex",
                              flexDirection: "row", */
                  }}
                >
                  <p>P+ {lora.prompt_positivo}</p>
                </div>

                <div
                  style={{
                    background: "red",
                    width: "250px",
                    gap: "10px",
                    /*  display: "flex",
                              flexDirection: "row", */
                  }}
                >
                  <p>P- {lora.prompt_negativo}</p>
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
                  <button
                    onClick={() =>
                      seleccionarLoraEdicion(
                        wallpaperEditable,
                        lora.id_modelo_lora,
                        setLoraEdicion,
                      )
                    }
                  >
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
              placeholder="Prompt Positivo"
              value={loraEdicion.prompt_positivo}
              disabled={!loraEdicion.id_modelo_lora}
              onChange={(e) =>
                setLoraEdicion((stateAnterior) => ({
                  ...stateAnterior,
                  prompt_positivo: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Prompt Negativo"
              value={loraEdicion.prompt_negativo}
              disabled={!loraEdicion.id_modelo_lora}
              onChange={(e) =>
                setLoraEdicion((stateAnterior) => ({
                  ...stateAnterior,
                  prompt_negativo: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Fuerza LoRa"
              value={loraEdicion.fuerza}
              disabled={!loraEdicion.id_modelo_lora}
              onChange={(e) => {
                setLoraEdicion((stateAnterior) => ({
                  ...stateAnterior,
                  fuerza: e.target.value,
                }));
              }}
            />
            <button
              disabled={
                loraEdicion.fuerza == "" ||
                loraEdicion.prompt_negativo == "" ||
                loraEdicion.prompt_positivo == "" ||
                !loraEdicion.id_modelo_lora
              }
              onClick={() =>
                guardarCambiosLora(setWallpaperEditable, loraEdicion, () =>
                  setLoraEdicion(crearLora()),
                )
              }
            >
              Guardar cambios en LoRa
            </button>
          </div>
          <p></p>
          <Select
            //isMulti
            //instanceId="lora-select"
            instanceId={`lora-${idWaifu}`}
            options={lorasDisponibles}
            value={modeloLoraSeleccionado}
            onChange={setModeloLoraSeleccionado}
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
            }}
          />

          <button
            disabled={!modeloLoraSeleccionado}
            onClick={() =>
              agregarElementoObjetoArray(
                setWallpaperEditable,
                "modelos_lora",
                {
                  id_modelo_lora: modeloLoraSeleccionado.value,
                  nombre: modeloLoraSeleccionado.label,
                  prompt_positivo: "",
                  prompt_negativo: "",
                  fuerza: "",
                },
                setModeloLoraSeleccionado,
              )
            }
          >
            Agregar Lora
          </button>
          <p></p>

          <button onClick={() => guardarCambiosWallpaper()}>
            Finalizar Edicion
          </button>
        </>
      ) : (
        <>
          <p>Selecciona un Wallpaper para editarlo</p>
        </>
      )}
      {!modoEdicion && listaWallpapers.length > 0 && (
        <>
          <button onClick={subirWallpapers}>Subir Wallpapers</button>
        </>
      )}
    </div>
  );
};
