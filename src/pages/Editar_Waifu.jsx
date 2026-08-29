import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../routes/NavBar";
import {
  search_character,
  show_kinds,
  show_personalities,
  image_server,
  show_personalities_for_character,
  edit_character,
} from "../config/Url_Config";
import { useFetch } from "../hooks/useFetch";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Footer } from "../routes/Footer";
import { useUploadImage } from "../hooks/useUploadImage";

export const Editar_Waifu = () => {
  const [waifuOriginal, setWaifuOriginal] = React.useState(null);
  const [waifuEditable, setWaifuEditable] = React.useState(null);

  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const [personalidadesEditables, setPersonalidadesEditables] = React.useState(
    [],
  );

  const [especieSeleccionada, setEspecieSeleccionada] = React.useState("");
  const [personalidadSeleccionada, setPersonalidadSeleccionada] =
    React.useState("");

  const { id } = useParams();
  const { data: listaPersonalidades, fetchData: consultarPersonalidades } =
    useFetch({ endpoint: show_personalities, metodo: "GET" });
  const {
    data: personalidadesOriginales,
    fetchData: consultarPersonalidadesWaifu,
  } = useFetch({
    endpoint: show_personalities_for_character,
    metodo: "GET",
    params: { id_personaje: id },
  });
  const { data: waifuData, fetchData: consultarWaifu } = useFetch({
    endpoint: search_character,
    metodo: "GET",
    params: { id_personaje: id },
  });
  const { data: listaEspecies, fetchData: consultarEspecies } = useFetch({
    endpoint: show_kinds,
    metodo: "GET",
  });
  const { data: waifuActualizada, fetchData: actualizarWaifu } = useFetch({
    endpoint: edit_character,
    metodo: "POST",
  });

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  const { subirImagen } = useUploadImage();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  useEffect(() => {
    consultarPersonalidades();
    consultarPersonalidadesWaifu();
    consultarEspecies();
    consultarWaifu();
  }, []);

  useEffect(() => {
    if (!Array.isArray(personalidadesOriginales)) return;
    setPersonalidadesEditables(personalidadesOriginales);
  }, [personalidadesOriginales]);

  console.log("WAIFU EDITABLE -> ", waifuEditable);

  useEffect(() => {
    if (!waifuData) return;
    setWaifuOriginal(waifuData);
    setWaifuEditable({ ...waifuData });
  }, [waifuData]);

  const Subir_Imagen = async () => {
    /* const formData = new FormData();

    formData.append("id_personaje", 0);

    if (image) {
      formData.append("imagen_perfil", image); // 👈 AQUÍ ESTÁ LA MAGIA
    } */

    let waifu = 0;
    let urlNueva = null;
    if (image) urlNueva = await subirImagen({ waifu, image });

    if (urlNueva) {
      setWaifuEditable((prev) => ({
        ...prev,
        imagen_perfil: urlNueva,
      }));
    }
    /* 
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

        //setImage({ ...editWaifu, imagen: data.url });
        setWaifuEditable((prev) => ({
          ...prev,
          imagen_perfil: data.url,
        }));

        console.log("Imagen subida EditWaifu =>", waifuEditable.imagen);

        //Actualizar_Perfil();

        //Registrar_Personaje(data.url);
        //const booleanPublicImage = Boolean(publicImage);
      } else if (data.Error) {
        console.warn("error", data);
        //ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
      }
    } catch (e) {
      console.log(`Error al subir imagen al servidor => ${e}`);
    } */
  };

  const Actualizar_Perfil = async () => {
    const personalidades = personalidadesEditables.map(
      (pw) => pw.id_personalidad,
    );
    const params = {
      id_personaje: String(waifuEditable?.id_personaje),
      nombre: waifuEditable?.nombre,
      alias: waifuEditable?.alias,
      descripcion: waifuEditable?.descripcion,
      historia: waifuEditable?.historia,
      pasatiempo: waifuEditable?.pasatiempo,
      ocupacion: waifuEditable?.ocupacion,
      dia: waifuEditable?.dia,
      mes: waifuEditable?.mes,
      edad: waifuEditable?.edad,
      id_especie: waifuEditable?.id_especie,
      imagen_perfil: waifuEditable.imagen_perfil,
      ids_personalidades: personalidades,
    };

    actualizarWaifu(params);
  };

  const Probar_Datos = () => {
    const personalidades = personalidadesEditables
      .map((pw) => pw.id_personalidad)
      .join(",");
    const datos = new URLSearchParams({
      id_personaje: String(id),
      nombre: waifuEditable?.nombre,
      alias: waifuEditable?.alias,
      descripcion: waifuEditable?.descripcion,
      historia: waifuEditable?.historia,
      pasatiempo: waifuEditable?.pasatiempo,
      ocupacion: waifuEditable?.ocupacion,
      dia: waifuEditable?.dia,
      mes: waifuEditable?.mes,
      edad: waifuEditable?.edad,
      imagen_perfil: waifuEditable.imagen,
      ids_personalidades: personalidades,
    });

    console.log("Datos de Prueba -> ", datos);
  };

  const personalidadesDisponibles = listaPersonalidades.filter(
    (lp) =>
      !personalidadesEditables.some(
        (pw) => pw.id_personalidad == lp.id_personalidad,
      ),
  );

  const especiesDisponibles = listaEspecies.filter(
    (le) => waifuEditable?.id_especie !== le.id_especie,
  );

  const Agregar_Personalidad = () => {
    const personalidad = listaPersonalidades.find(
      (wp) => wp.id_personalidad == personalidadSeleccionada,
    );
    setPersonalidadesEditables([
      ...personalidadesEditables,
      {
        id_personaje: id,
        id_personalidad: personalidad.id_personalidad,
        nombre_personalidad: personalidad.nombre,
      },
    ]);

    setPersonalidadSeleccionada("");
  };

  const Eliminar_Personalidad = (id_p) => {
    setPersonalidadesEditables(
      personalidadesEditables.filter((pw) => pw.id_personalidad !== id_p),
    );
  };

  const Cambiar_Especie = () => {
    const especie = listaEspecies.find(
      (lista) => lista.id_especie == especieSeleccionada,
    );
    setWaifuEditable({
      ...waifuEditable,
      id_especie: especie.id_especie,
      especie: especie.nombre,
    });

    setEspecieSeleccionada("");
  };

  const isModified =
    JSON.stringify(waifuOriginal) !== JSON.stringify(waifuEditable);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Editar Waifu {id}</h1>

        {!waifuOriginal ? (
          <p>Cargando waifu...</p>
        ) : (
          <>
            <div className="form-waifu-container">
              <input
                type="text"
                value={waifuEditable.nombre}
                onChange={(e) =>
                  setWaifuEditable({ ...waifuEditable, nombre: e.target.value })
                }
              />
              <input
                type="text"
                value={waifuEditable.alias}
                onChange={(e) =>
                  setWaifuEditable({ ...waifuEditable, alias: e.target.value })
                }
              />
              <img src={waifuEditable.imagen_perfil} style={{ width: 300 }} />
              <input
                type="text"
                value={waifuEditable.descripcion}
                onChange={(e) =>
                  setWaifuEditable({
                    ...waifuEditable,
                    descripcion: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={waifuEditable.historia}
                onChange={(e) =>
                  setWaifuEditable({
                    ...waifuEditable,
                    historia: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={waifuEditable.pasatiempo}
                onChange={(e) =>
                  setWaifuEditable({
                    ...waifuEditable,
                    pasatiempo: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={waifuEditable.ocupacion}
                onChange={(e) =>
                  setWaifuEditable({
                    ...waifuEditable,
                    ocupacion: e.target.value,
                  })
                }
              />
              <input
                type="number"
                value={waifuEditable.dia}
                onChange={(e) =>
                  setWaifuEditable({ ...waifuEditable, dia: e.target.value })
                }
              />
              <input
                type="number"
                value={waifuEditable.mes}
                onChange={(e) =>
                  setWaifuEditable({ ...waifuEditable, mes: e.target.value })
                }
              />
              <input
                type="number"
                value={waifuEditable.edad}
                onChange={(e) =>
                  setWaifuEditable({ ...waifuEditable, edad: e.target.value })
                }
              />

              <p>Especie: {waifuEditable.especie}</p>

              {listaEspecies.length > 0 ? (
                <>
                  <select
                    name="especie"
                    value={especieSeleccionada}
                    onChange={(e) => setEspecieSeleccionada(e.target.value)}
                  >
                    <option value={""} disabled>
                      Selecciona una especie
                    </option>
                    {especiesDisponibles.map((especie) => (
                      <option
                        key={especie.id_especie}
                        value={especie.id_especie}
                      >
                        {especie.nombre}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={Cambiar_Especie}
                    disabled={especieSeleccionada == ""}
                  >
                    Cambiar Especie
                  </button>
                </>
              ) : (
                <p>No hay lista de especies Bv</p>
              )}
              <p>Personalidades:</p>
              <div>
                {personalidadesEditables.length > 0 ? (
                  <div
                    style={{
                      background: "purple",
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {personalidadesEditables.map((personalidad) => (
                      <div
                        key={personalidad.id_personalidad}
                        style={{
                          background: "blue",
                          display: "flex",
                          flexDirection: "row",
                          width: "150px",
                          gap: "10px",
                        }}
                      >
                        <p>{personalidad.nombre_personalidad}</p>
                        <button
                          onClick={() =>
                            Eliminar_Personalidad(personalidad.id_personalidad)
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No hay personalidades de la Waifu Bv</p>
                )}
              </div>

              {listaPersonalidades.length > 0 ? (
                <select
                  name="personalidad"
                  value={personalidadSeleccionada}
                  onChange={(e) => setPersonalidadSeleccionada(e.target.value)}
                >
                  <option value={""} disabled>
                    Selecciona una personalidad
                  </option>
                  {personalidadesDisponibles.map((personalidad) => (
                    <option
                      key={personalidad.id_personalidad}
                      value={personalidad.id_personalidad}
                    >
                      {personalidad.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No hay lista de especies Bv</p>
              )}
            </div>
            <p></p>
            <button
              disabled={personalidadSeleccionada == ""}
              onClick={Agregar_Personalidad}
            >
              Agregar Personalidad
            </button>

            <p>Imagen: {waifuEditable.imagen}</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);

                /* setEditWaifu({...editWaifu, imagen: file} ) */

                if (file) setPreview(URL.createObjectURL(file));
              }}
            />

            <p></p>

            {preview && (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <p> preview - {preview} </p>
                <p> image - {image?.type} </p>
                <p> EditWaifu - {waifuEditable.imagen} </p>

                <button onClick={() => Subir_Imagen()}>Subir imagen</button>
              </>
            )}

            <p></p>

            {/* <button disabled={!isModified} onClick={Probar_Datos}> */}
            <button disabled={!isModified} onClick={Actualizar_Perfil}>
              Actualizar Perfil
            </button>
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
