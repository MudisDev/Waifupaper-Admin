import React, { useEffect, Switch } from "react";
import { Link, useParams } from "react-router-dom";
import {
  consult_tags,
  edit_wallpaper,
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
import { useFetch } from "../hooks/useFetch";
import { useArrayHelpers } from "../hooks/useArrayHelpers";
import { useLoraEditor } from "../hooks/useLoraEditor";
import { useUploadImage } from "../hooks/useUploadImage";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const Editar_Wallpaper = () => {
  const { id: id_wallpaper } = useParams();

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  //const [wallpaper, setWallpaper] = useState(null);
  /* const [wallpaperOriginal, setWallpaperOriginal] = useState(null);
  const [wallpaperEditable, setWallpaperEditable] = useState(null); */
  const crearWallpaper = () => ({
    id_imagen: null,
    semilla: "",
    url: "",
    imagen_listada: null,
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

  const [wallpaperOriginal, setWallpaperOriginal] = useState(crearWallpaper());
  const [wallpaperEditable, setWallpaperEditable] = useState(crearWallpaper());
  const [loraEdicion, setLoraEdicion] = useState(crearLora());
  /*  const [
     listaEditableModelosLoraWallpaper,
    setListaEditableModelosLoraWallpaper,
  ] = React.useState([]); */
  /* const [listaEditableWaifusWallpaper, setListaEditableWaifusWallpaper] =
    React.useState([]); */
  //const [listCharacters, setListCharacters] = React.useState([]);
  /* const [listaEditableEtiquetasWallpaper, setListaEditableEtiquetasWallpaper] =
    React.useState([]); */

  const [modeloLoraSeleccionado, setModeloLoraSeleccionado] =
    React.useState("");
  const [waifuSeleccionada, setWaifuSeleccionada] = React.useState("");
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = React.useState("");
  /*   const [promptPositivo, setPromptPositivo] = React.useState("");
  const [promptNegativo, setPromptNegativo] = React.useState("");
  const [fuerzaLora, setFuerzaLora] = React.useState("");
  const [idEditarLora, setIdEditarLora] = React.useState(null); */

  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const { data: listaModelosLora, fetchData: consultarModelosLora } = useFetch({
    endpoint: show_lora_models,
  });
  const { data: listaModelosBase, fetchData: consultarModelosBase } = useFetch({
    endpoint: show_base_models,
  });
  const { data: listaEtiquetas, fetchData: consultarEtiquetas } = useFetch({
    endpoint: show_tags,
  });

  const { data: listaWaifus, fetchData: consultarWaifus } = useFetch({
    endpoint: show_characters,
  });

  const {
    data: listaModelosLoraWallpaper,
    fetchData: consultarModelosLoraWallpaper,
  } = useFetch({
    endpoint: show_lora_models_for_image,
    params: { id_imagen: id_wallpaper },
  });

  const { data: listaWaifusWallpaper, fetchData: consultarWaifusWallpaper } =
    useFetch({
      endpoint: show_characters_for_image,
      params: { id_imagen: id_wallpaper },
    });

  const {
    data: listaEtiquetasWallpaper,
    fetchData: consultarEtiquetasWallpaper,
  } = useFetch({
    endpoint: consult_tags,
    params: { id_imagen: id_wallpaper },
  });

  const { data: wallpaperBv, fetchData: buscarWallpaper } = useFetch({
    endpoint: search_image,
    params: { id_imagen: id_wallpaper },
    primerElemento: true,
  });

  const { agregarElementoObjetoArray, eliminarElementoObjetoArray } =
    useArrayHelpers();
  const { seleccionarLoraEdicion, guardarCambiosLora } = useLoraEditor();

  const {
    /* url: urlNueva, */
    /*  error: errorUpload, */
    subirImagen,
  } = useUploadImage();

  useEffect(() => {
    consultarModelosLora();
    consultarModelosBase();
    consultarEtiquetas();
    consultarWaifus();

    consultarEtiquetasWallpaper();
    consultarModelosLoraWallpaper();
    consultarWaifusWallpaper();
    buscarWallpaper();
  }, []);

  useEffect(() => {
    if (
      wallpaperBv &&
      listaModelosLoraWallpaper.length > 0 &&
      listaWaifusWallpaper.length > 0 &&
      listaEtiquetasWallpaper.length > 0
    ) {
      const wallpaper = {
        id_imagen: wallpaperBv.id_imagen,
        semilla: wallpaperBv.semilla,
        url: wallpaperBv.url,
        imagen_listada: wallpaperBv.imagen_listada,
        id_modelo_base: wallpaperBv.id_modelo_base,

        personajes: [...listaWaifusWallpaper],
        etiquetas: [...listaEtiquetasWallpaper],
        modelos_lora: [...listaModelosLoraWallpaper],

        prompt_positivo_general: wallpaperBv.prompt_positivo_general ?? "",
        prompt_negativo_general: wallpaperBv.prompt_negativo_general ?? "",
      };

      setWallpaperOriginal(wallpaper);
      setWallpaperEditable(structuredClone(wallpaper));

      //setListaEditableModelosLoraWallpaper([...listaModelosLoraWallpaper]);
      //setListaEditableWaifusWallpaper([...listaWaifusWallpaper]);
      //setListaEditableEtiquetasWallpaper([...listaEtiquetasWallpaper]);
    }
  }, [
    listaModelosLoraWallpaper,
    listaWaifusWallpaper,
    listaEtiquetasWallpaper,
    wallpaperBv,
  ]);

  console.log("lista loras Wallpaper ->", listaModelosLoraWallpaper);

  console.log("wallpaper Bv -> ", wallpaperBv);

  const Actualizar_Datos = async (url_wallpaper_nuevo) => {
    const loras = wallpaperEditable.modelos_lora.map(
      (lora) => lora.id_modelo_lora,
    );
    /* const waifus = listaEditableWaifusWallpaper.map( */
    const waifus = wallpaperEditable.personajes.map(
      (waifu) => waifu.id_personaje,
    );
    const etiquetas = wallpaperEditable.etiquetas.map((tag) => tag.id_etiqueta);
    const positivos_modelos_lora = wallpaperEditable.modelos_lora
      .map((lora) => lora.prompt_positivo)
      .join("|");
    const negativos_modelos_lora = wallpaperEditable.modelos_lora
      .map((lora) => lora.prompt_negativo)
      .join("|");
    const fuerza_modelos_lora = wallpaperEditable.modelos_lora.map(
      (lora) => lora.fuerza,
    );

    const params = new URLSearchParams({
      /* id_imagen: id,
      semilla: editWallpaper?.semilla,
      url: editWallpaper?.url,
      imagen_listada: editWallpaper?.imagen_listada,
      id_modelo_base: editWallpaper?.id_modelo_base, */
      id_imagen: id_wallpaper,
      semilla: wallpaperEditable?.semilla,
      url: url_wallpaper_nuevo ?? wallpaperEditable.url,
      imagen_listada: wallpaperEditable?.imagen_listada,
      id_modelo_base: wallpaperEditable?.id_modelo_base,
      //loras: JSON.stringify(loraModelImage),
      ids_modelos_lora: loras,
      //waifus: JSON.stringify(charactersImage),
      ids_personajes: waifus,
      ids_etiquetas: etiquetas,
      fuerza_modelos_lora: fuerza_modelos_lora,

      prompt_positivo_general: wallpaperEditable?.prompt_positivo_general,
      prompt_negativo_general: wallpaperEditable?.prompt_negativo_general,

      prompts_positivos_modelos_lora: positivos_modelos_lora,
      prompts_negativos_modelos_lora: negativos_modelos_lora,
    });

    console.log("Prueba de valores Bv -> ", params);

    try {
      const response = await fetch(`${edit_wallpaper}?${params.toString()}`);
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

  const waifus = wallpaperEditable.personajes.map((w) => w.id_personaje);

  const waifu = waifus[0];
  console.log("Primera Waifu -> ", waifu);

  const Actualizar_Wallpaper = async () => {
    let urlNueva = null;

    if (image) urlNueva = await subirImagen({ waifu, image });
    await Actualizar_Datos(urlNueva);
  };

  const Listar_Imagen = (dato) => {
    setWallpaperEditable({ ...wallpaperEditable, imagen_listada: dato });
  };

  const isModified =
    JSON.stringify(wallpaperOriginal) !== JSON.stringify(wallpaperEditable);

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

  /* const eliminarElementoArray = (setter, propiedad, idElemento) => {
    setter((stateAnterior) =>
      stateAnterior.filter((elemento) => elemento[propiedad] !== idElemento),
    );
  };

  const eliminarElementoObjetoArray = (setter, propiedad, propiedadId, id) => {
    setter((stateAnterior) => ({
      ...stateAnterior,
      [propiedad]: stateAnterior[propiedad].filter(
        (elemento) => elemento[propiedadId] !== id,
      ),
    }));
  };

  const agregarElementoArray = (setter, objeto, limpiarSeleccion) => {
    setter((estadoAnterior) => [...estadoAnterior, objeto]);
    limpiarSeleccion("");
  };

  const agregarElementoObjetoArray = (
    setter,
    propiedad,
    objeto,
    limpiarSeleccion,
  ) => {
    setter((estadoAnterior) => ({
      ...estadoAnterior,
      [propiedad]: [...estadoAnterior[propiedad], objeto],
    }));
    limpiarSeleccion("");
  }; */

  /*   const Editar_Lora = (id_lora) => {
    const lora = wallpaperEditable.modelos_lora.find(
      (lora) => lora.id_modelo_lora == id_lora,
    );

    if (!lora) return;

    setLoraEdicion({
      id_modelo_lora: lora.id_modelo_lora,
      prompt_positivo: lora.prompt_positivo,
      prompt_negativo: lora.prompt_negativo,
      fuerza: lora.fuerza,
    });
  };
 */

  /* const Editar_Lora = (wallpaper, idLora, setLoraEdicion) => {
    const lora = wallpaper.modelos_lora.find(
      (lora) => lora.id_modelo_lora == idLora,
    );

    if (!lora) return;

    setLoraEdicion({
      ...lora,
    });
  };

  const Guardar_Lora = (setWallpaper, loraEdicion, limpiarFormulario) => {
    setWallpaper((prev) => ({
      ...prev,
      modelos_lora: prev.modelos_lora.map((lora) =>
        lora.id_modelo_lora == loraEdicion.id_modelo_lora
          ? {
              ...lora,
              ...loraEdicion,
            }
          : lora,
      ),
    }));

    limpiarFormulario();
  }; */

  const Probar_Actualizacion = () => {
    const loras = wallpaperEditable.modelos_lora.map(
      (lora) => lora.id_modelo_lora,
    );
    /* const waifus = listaEditableWaifusWallpaper.map( */
    const waifus = wallpaperEditable.personajes.map(
      (waifu) => waifu.id_personaje,
    );
    const etiquetas = wallpaperEditable.etiquetas.map((tag) => tag.id_etiqueta);
    const positivos_modelos_lora = wallpaperEditable.modelos_lora
      .map((lora) => lora.prompt_positivo)
      .join("|");
    const negativos_modelos_lora = wallpaperEditable.modelos_lora
      .map((lora) => lora.prompt_negativo)
      .join("|");
    const fuerza_modelos_lora = wallpaperEditable.modelos_lora.map(
      (lora) => lora.fuerza,
    );

    const variables = new URLSearchParams({
      id_imagen: id_wallpaper,
      url: wallpaperEditable?.url,
      semilla: wallpaperEditable?.semilla,
      imagen_listada: wallpaperEditable?.imagen_listada,
      id_modelo_base: wallpaperEditable?.id_modelo_base,
      //loras: JSON.stringify(loraModelImage),
      ids_personajes: waifus,
      ids_etiquetas: etiquetas,
      //waifus: JSON.stringify(charactersImage),
      prompt_positivo_general: wallpaperEditable?.prompt_positivo_general,
      prompt_negativo_general: wallpaperEditable?.prompt_negativo_general,
      ids_modelos_lora: loras,
      prompts_positivos_modelos_lora: positivos_modelos_lora,
      prompts_negativos_modelos_lora: negativos_modelos_lora,
      fuerza_modelos_lora: fuerza_modelos_lora,
    });

    console.log("Actualizacion de Prueba Bv -> ", variables);
  };

  /* const Subir_Imagen = async () => {
    // const waifus = listaEditableWaifusWallpaper.map( 
    const waifus = wallpaperEditable.personajes.map(
      (waifu) => waifu.id_personaje,
    );
    const waifu = waifus[0];

    const formData = new FormData();
    // formData.append('username', username);
    //    formData.append('password', password);
    //    formData.append('name', name);
    //    formData.append('phone', phoneNumber);
    //    formData.append('email', email); 

    formData.append("id_personaje", waifu);

    if (image) {
      formData.append("imagen_perfil", image); // 👈 AQUÍ ESTÁ LA MAGIA
    }

    try {
      const response = await fetch(`${image_server}`, {
        //const response = await fetch(`${upload_image_to_server}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Respuesta subida imagen => ", data);
      if (data.Success) {
        console.log("IMAGEN SUBIDA => ", data);

        Actualizar_Datos(data.url);
        // const booleanPublicImage = Boolean(publicImage); 
      } else if (data.Error) {
        console.warn("error", data);
        //ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
      }
    } catch (e) {
      console.log(`Error al subir imagen al servidor => ${e}`);
    }
  }; */

  return (
    <div>
      <NavBar />
      <h1>Editar Wallpaper</h1>

      {!wallpaperOriginal ? (
        <>
          <p>cargando wallpaper</p>
        </>
      ) : (
        <>
          <img style={{ height: 500 }} src={wallpaperOriginal.url} />
          <p>Id wallpaper {wallpaperOriginal?.id_imagen}</p>

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
            instanceId={`waifu-${id_wallpaper}`}
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
                  id_imagen: id_wallpaper,
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

          <p>url</p>
          <p>{wallpaperEditable.url}</p>
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
              {/* setter,
    propiedad,
    propiedadId,
    idEditado,
    datosEditados,
    setterDatos,
    borrar, */}
              Guardar cambios en LoRa
            </button>
            {/*         value={editWallpaper.url}
            onChange={(e) =>
              setEditWallpaper({ ...editWallpaper, url: e.target.value }) */}
          </div>
          <p></p>
          <Select
            //isMulti
            //instanceId="lora-select"
            instanceId={`lora-${id_wallpaper}`}
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
