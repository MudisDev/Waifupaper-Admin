import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../routes/NavBar";
import { useFetch } from "../hooks/useFetch";
import {
  show_kinds,
  show_personalities,
  show_tags,
  show_base_models,
  show_lora_models,
  show_characters,
} from "../config/Url_Config";

export const Agregar_Wallpapers = () => {
  const { id } = useParams();
  const [listaWallpapers, setListaWallpapers] = React.useState([]);
  const [waifuSeleccionada, setWaifuSeleccionada] = React.useState("");
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [modeloLoraSeleccionado, setModeloLoraSeleccionado] =
    React.useState("");

  const crearWallpaper = () => ({
    id_wallpaper: null,
    imagen_perfil: "",
    imagen_listado: null,
    semilla: "",
    //prompt: "",
    //negative_prompt: "",
    id_modelo_base: null,
    modelos_lora: [],
    ids_etiquetas: [],
    ids_personajes: [],
    //prompts_modelos_lora: [],
    //fuerza_modelos_lora: [],
  });

  const [wallpaperEditable, setWallpaperEditable] =
    React.useState(crearWallpaper());

  const { data: listaEspecies, fetchData: consultarEspecies } = useFetch({
    endpoint: show_kinds,
  });
  const { data: listaPersonalidades, fetchData: consultarPersonalidades } =
    useFetch({ endpoint: show_personalities });
  const { data: listaEtiquetas, fetchData: consultarEtiquetas } = useFetch({
    endpoint: show_tags,
  });
  const { data: listaModelosBase, fetchData: consultarModelosBase } = useFetch({
    endpoint: show_base_models,
  });
  const { data: listaModelosLora, fetchData: consultarModelosLora } = useFetch({
    endpoint: show_lora_models,
  });

  const { data: listaWaifus, fetchData: consultarWaifus } = useFetch({
    endpoint: show_characters,
  });

  useEffect(() => {
    consultarEspecies();
    consultarPersonalidades();
    consultarModelosBase();
    consultarModelosLora();
    consultarEtiquetas();
    consultarWaifus();
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

  const lorasDisponibles = wallpaperEditable.id_wallpaper
    ? listaModelosLora.filter(
        (lora) =>
          !wallpaperEditable.modelos_lora.some(
            (wallpaper) => wallpaper.id_modelo_lora == lora.id_modelo_lora,
          ),
      )
    : listaModelosLora;

  const agregarLora = () => {
    setWallpaperEditable({
      ...wallpaperEditable,
      modelos_lora: [
        ...wallpaperEditable.modelos_lora,
        {
          id_modelo_lora: modeloLoraSeleccionado.value,
          nombre: modeloLoraSeleccionado.label,
          prompt_positivo: "",
          prompt_negativo: "",
          fuerza: 0,
        },
      ],
    });
    setModeloLoraSeleccionado("");
  };

  const eliminarLora = () => {};

  const editarLora = () => {};

  return (
    <div>
      <NavBar />
      <h1>Agregar Wallpapers</h1>

      {/* <p>semilla</p>
      <p>lora</p>
      <p>etiquetas</p>
      <p>waifus</p>
      <p>imagen</p>
      <p>imagen listada</p>
      <p>modelo base</p> */}

      {/* <select
        name="personalidad"
        value={waifuSeleccionada}
        onChange={(e) => setWaifuSeleccionada(e.target.value)}
      >
        <option value={""} disabled>
          Selecciona una waifu
        </option>
        {listaWaifus.map((waifu) => (
          <option key={waifu.id_personalidad} value={waifu.id_personalidad}>
            {waifu.nombre}
          </option>
        ))}
      </select> */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          background: "aquamarine",
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
                style={{ padding: 0, width: 180, height: 320 }}
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
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(file);
          if (file) setPreview(URL.createObjectURL(file));
        }}
      />

      {/* {preview && (
        <>
          <img
            src={preview}
            alt="Preview"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
          <p> preview - {preview} </p>
          <p> image - {image?.type} </p>
        </>
      )} */}

      <p></p>

      <button disabled={modoEdicion || !image} onClick={agregarWallpaper}>
        Agregar Wallpaper
      </button>

      {modoEdicion ? (
        <>
          <p>Wallpaper #{wallpaperEditable.id_wallpaper}</p>
          <p>semilla</p>
          <input
            type="text"
            value={wallpaperEditable.semilla ?? ""}
            onChange={(e) =>
              setWallpaperEditable({
                ...wallpaperEditable,
                semilla: e.target.value,
              })
            }
          />
          <p>loras</p>
          {wallpaperEditable.modelos_lora.length > 0 ? (
            <div style={{background: "green", width: "100%", display: "flex", flexDirection: "row", gap:10}}>
              {wallpaperEditable.modelos_lora.map((lora) => (
                <div key={lora.id_modelo_lora} style={{display: "flex", flexDirection: "row", background: "gray"}}>
                  <p>#{lora.id_modelo_lora} - {lora.nombre}</p>
                  <button>X</button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No hay LoRas Bv</p>
            </div>
          )}
          <select
            name="modelos lora"
            value={modeloLoraSeleccionado}
            onChange={(e) => setModeloLoraSeleccionado(e.target.value)}
          >
            <option value={""} disabled>
              Selecciona un modelo lora
            </option>
            {lorasDisponibles.map((lora) => (
              <option key={lora.id_modelo_lora} value={lora.id_modelo_lora}>
                {lora.nombre}
              </option>
            ))}
          </select>
          <p></p>
          <button disabled={modeloLoraSeleccionado == ""} onClick={agregarLora}>
            Agregar Lora
          </button>

          <p>etiquetas</p>
          <p>waifus</p>
          <p>imagen</p>
          <p>imagen listada</p>
          <p>modelo base</p>

          <button onClick={() => guardarCambiosWallpaper()}>
            Finalizar Edicion
          </button>
        </>
      ) : (
        <>
          <p>Selecciona un Wallpaper para editarlo</p>
        </>
      )}
    </div>
  );
};
