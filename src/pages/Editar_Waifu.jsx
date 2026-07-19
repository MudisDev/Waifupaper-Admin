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

export const Editar_Waifu = () => {
  const { id } = useParams();
  const [waifu, setWaifu] = React.useState(null);
  const [editWaifu, setEditWaifu] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const [listaEspecies, setListaEspecies] = React.useState([]);
  const [listaPersonalidades, setListaPersonalidades] = React.useState([]);
  const [personalidadesWaifu, setPersonalidadesWaifu] = React.useState([]);

  const [especieSeleccionada, setEspecieSeleccionada] = React.useState("");
  const [personalidadSeleccionada, setPersonalidadSeleccionada] =
    React.useState("");

  useEffect(() => {
    const Consultar_Especies = async () => {
      try {
        const response = await fetch(`${show_kinds}`);
        const data = await response.json();

        console.log("Especies -> ", data);

        if (Array.isArray(data) && data.length > 0) {
          setListaEspecies(data);
        }
      } catch (e) {
        console.log("No se pudo consultar Especies, error: ", e);
      }
    };

    Consultar_Especies();
  }, []);

  useEffect(() => {
    const Consultar_Personalidades_Personaje = async () => {
      try {
        const response = await fetch(
          `${show_personalities_for_character}?id_personaje=${id}`,
        );
        const data = await response.json();

        console.log("Datos de personalidades de la waifu -> ", data);

        if (data.length > 0) {
          setPersonalidadesWaifu(data);
        }
      } catch (e) {
        console.log(
          "No se pudo consultar personalidades del personaje, error -> ",
          e,
        );
      }
    };

    Consultar_Personalidades_Personaje();
  }, []);

  useEffect(() => {
    const Consultar_Personalidades = async () => {
      try {
        const response = await fetch(`${show_personalities}`);
        const data = await response.json();

        console.log("Personalidades -> ", data);

        if (Array.isArray(data) && data.length > 0) {
          setListaPersonalidades(data);
        }
      } catch (e) {
        console.log("No se pudo consultar Personalidades, error: ", e);
      }
    };

    Consultar_Personalidades();
  }, []);

  useEffect(() => {
    const Consultar_Data = async () => {
      try {
        const response = await fetch(`${search_character}?id_personaje=${id}`);
        const data = await response.json();

        console.log("Data de la waifu -> ", data[0]);

        if (!data.Error) {
          const dataWaifu = {
            id_personaje: data[0].id_personaje,
            nombre: data[0].nombre,
            imagen: data[0].imagen_perfil,
            //id_persodata[0] "5",
            alias: data[0].alias,
            descripcion: data[0].descripcion,
            historia: data[0].historia,
            pasatiempo: data[0].pasatiempo,
            ocupacion: data[0].ocupacion,
            dia: data[0].dia,
            mes: data[0].mes,
            edad: data[0].edad,
            especie: data[0].especie,
            id_especie: data[0].id_especie,
            personalidades: data[0].personalidades,
          };
          setWaifu(dataWaifu);
          setEditWaifu({ ...dataWaifu }); // copia real
        }
      } catch (error) {
        console.log("Error al consultar waifu -> ", error);
      }
    };

    Consultar_Data();
  }, []);

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
        setEditWaifu((prev) => ({
          ...prev,
          imagen: data.url,
        }));

        console.log("Imagen subida EditWaifu =>", editWaifu.imagen);

        //Actualizar_Perfil();

        //Registrar_Personaje(data.url);
        /* const booleanPublicImage = Boolean(publicImage); */
      } else if (data.Error) {
        console.warn("error", data);
        //ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
      }
    } catch (e) {
      console.log(`Error al subir imagen al servidor => ${e}`);
    }
  };

  const Actualizar_Perfil = async () => {
    const personalidades = personalidadesWaifu
      .map((pw) => pw.id_personalidad)
      .join(",");
    const params = new URLSearchParams({
      id_personaje: String(editWaifu?.id_personaje),
      nombre: editWaifu?.nombre,
      alias: editWaifu?.alias,
      descripcion: editWaifu?.descripcion,
      historia: editWaifu?.historia,
      pasatiempo: editWaifu?.pasatiempo,
      ocupacion: editWaifu?.ocupacion,
      dia: editWaifu?.dia,
      mes: editWaifu?.mes,
      edad: editWaifu?.edad,
      id_especie: editWaifu?.id_especie,
      //imagen_perfil: editWaifu?.profilePhoto || ''
      imagen_perfil: editWaifu.imagen,
      ids_personalidades: personalidades,
    });

    console.log("Params -> ", params);

    try {
      //const response = await fetch(`${edit_profile}?id_personaje=${id}&${params.toString()}`);
      const response = await fetch(`${edit_character}?${params.toString()}`);

      const data = await response.json();
      //const data = await response.text();
      console.log("data => ", data);

      console.log("SE ACTUALIZO EL PERFIL? ", data);

      /* if (data.Success) {
        console.log("Waifu editada con exito");
      } else console.log("Error al editar la waifu Bv"); */
    } catch (error) {
      console.error("Error al actualizar perfil - ", error);
    }
  };

  const Probar_Datos = () => {
    const personalidades = personalidadesWaifu
      .map((pw) => pw.id_personalidad)
      .join(",");
    const datos = new URLSearchParams({
      id_personaje: String(id),
      nombre: editWaifu?.nombre,
      alias: editWaifu?.alias,
      descripcion: editWaifu?.descripcion,
      historia: editWaifu?.historia,
      pasatiempo: editWaifu?.pasatiempo,
      ocupacion: editWaifu?.ocupacion,
      dia: editWaifu?.dia,
      mes: editWaifu?.mes,
      edad: editWaifu?.edad,
      //imagen_perfil: editWaifu?.profilePhoto || ''
      imagen_perfil: editWaifu.imagen,
      ids_personalidades: personalidades,
    });

    console.log("Datos de Prueba -> ", datos);
  };

  const Personalidades_Disponibles = listaPersonalidades.filter(
    (lp) =>
      !personalidadesWaifu.some(
        (pw) => pw.id_personalidad == lp.id_personalidad,
      ),
  );

  const Especies_Disponibles = listaEspecies.filter(
    (le) => editWaifu?.id_especie !== le.id_especie,
  );

  //console.log("Personalidades disponibles -> ", Personalidades_Disponibles);

  const Agregar_Personalidad = () => {
    const personalidad = listaPersonalidades.find(
      (wp) => wp.id_personalidad == personalidadSeleccionada,
    );
    setPersonalidadesWaifu([
      ...personalidadesWaifu,
      {
        id_personaje: id,
        id_personalidad: personalidad.id_personalidad,
        nombre_personalidad: personalidad.nombre,
      },
    ]);

    setPersonalidadSeleccionada("");
  };

  const Eliminar_Personalidad = (id_p) => {
    setPersonalidadesWaifu(
      personalidadesWaifu.filter((pw) => pw.id_personalidad !== id_p),
    );
  };

  console.log("EditWaifu -> ", editWaifu);

  const Cambiar_Especie = () => {
    const especie = listaEspecies.find(
      (lista) => lista.id_especie == especieSeleccionada,
    );
    setEditWaifu({
      ...editWaifu,
      id_especie: especie.id_especie,
      especie: especie.nombre,
    });

    setEspecieSeleccionada("");
  };

  const isModified = JSON.stringify(waifu) !== JSON.stringify(editWaifu);

  return (
    <div>
      <NavBar />
      <h1>Editar Waifu {id}</h1>

      {!waifu ? (
        <p>Cargando waifu...</p>
      ) : (
        <>
          <div className="form-waifu-container">
            <input
              type="text"
              value={editWaifu.nombre}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, nombre: e.target.value })
              }
            />
            <input
              type="text"
              value={editWaifu.alias}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, alias: e.target.value })
              }
            />
            <img src={editWaifu.imagen} style={{ width: 300 }} />
            <input
              type="text"
              value={editWaifu.descripcion}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, descripcion: e.target.value })
              }
            />

            <input
              type="text"
              value={editWaifu.historia}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, historia: e.target.value })
              }
            />

            <input
              type="text"
              value={editWaifu.pasatiempo}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, pasatiempo: e.target.value })
              }
            />

            <input
              type="text"
              value={editWaifu.ocupacion}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, ocupacion: e.target.value })
              }
            />
            <input
              type="number"
              value={editWaifu.dia}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, dia: e.target.value })
              }
            />
            <input
              type="number"
              value={editWaifu.mes}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, mes: e.target.value })
              }
            />
            <input
              type="number"
              value={editWaifu.edad}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, edad: e.target.value })
              }
            />

            {/* <input
              type="text"
              value={editWaifu.especie}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, especie: e.target.value })
              }
            /> */}

            {/* <input
              type="text"
              value={editWaifu.personalidades}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, personalidades: e.target.value })
              }
            /> */}

            <p>Especie: {editWaifu.especie}</p>

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
                  {Especies_Disponibles.map((especie) => (
                    <option key={especie.id_especie} value={especie.id_especie}>
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
              {personalidadesWaifu.length > 0 ? (
                <div
                  style={{
                    background: "purple",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {personalidadesWaifu.map((personalidad) => (
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
                {Personalidades_Disponibles.map((personalidad) => (
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

          <p>Imagen: {waifu.imagen}</p>

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
              <p> EditWaifu - {editWaifu.imagen} </p>

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
    </div>
  );
};
