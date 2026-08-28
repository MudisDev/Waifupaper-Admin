import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../routes/NavBar";
import { useEffect } from "react";
import {
  show_kinds,
  show_personalities,
  image_server,
  add_character,
} from "../config/Url_Config";
import { useFetch } from "../hooks/useFetch";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Footer } from "../routes/Footer";

export const Agregar_Waifu = () => {
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [especieSeleccionada, setEspecieSeleccionada] = React.useState("");
  const [personalidadSeleccionada, setPersonalidadSeleccionada] =
    React.useState("");
  const [personalidadesEditables, setPersonalidadesEditables] = React.useState(
    [],
  );

  const { CheckAuth: VerificarAutorizacion } = useCheckAuth();

  useEffect(() => {
    VerificarAutorizacion();
  }, []);

  const [waifuEditable, setWaifuEditable] = React.useState({
    nombre: "",
    alias: "",
    descripcion: "",
    historia: "",
    pasatiempo: "",
    ocupacion: "",
    dia: "",
    mes: "",
    edad: "",
  });

  const { data: listaEspecies, fetchData: consultarEspecies } = useFetch({
    endpoint: show_kinds, metodo: "GET"
  });
  const { data: listaPersonalidades, fetchData: consultarPersonalidades } =
    useFetch({ endpoint: show_personalities , metodo: "GET"});

  const { data: registroData, fetchData: registrarWaifu } = useFetch({
    endpoint: add_character,
    metodo: "POST",
  });

  useEffect(() => {
    consultarEspecies();
    consultarPersonalidades();
  }, []);

  const Registrar_Personaje = async (imageUrl) => {
    const personalidades = personalidadesEditables.map(
      (waifu) => waifu.id_personalidad,
    );

    const params = new URLSearchParams({
      nombre: waifuEditable?.nombre,
      alias: waifuEditable?.alias,
      descripcion: waifuEditable?.descripcion,
      historia: waifuEditable?.historia,
      ocupacion: waifuEditable?.ocupacion,
      pasatiempo: waifuEditable?.pasatiempo,
      dia: waifuEditable?.dia,
      mes: waifuEditable?.mes,
      edad: waifuEditable?.edad,
      id_especie: especieSeleccionada,
      imagen_perfil: imageUrl,
      ids_personalidades: personalidades,
    });

    registrarWaifu(params);
    console.log("Status Registro Waifu -> ", registroData);
  };

  const Registrar_Waifu = () => {
    if (image) Subir_Imagen();
  };

  const Probar_Datos = () => {
    const personalidades = personalidadesEditables.map(
      (waifu) => waifu.id_personalidad,
    );

    const variables = new URLSearchParams({
      nombre: waifuEditable?.nombre,
      alias: waifuEditable?.alias,
      descripcion: waifuEditable?.descripcion,
      historia: waifuEditable?.historia,
      ocupacion: waifuEditable?.ocupacion,
      pasatiempo: waifuEditable?.pasatiempo,
      dia: waifuEditable?.dia,
      mes: waifuEditable?.mes,
      edad: waifuEditable?.edad,
      id_especie: especieSeleccionada,
      ids_personalidades: personalidades,
      imagen_perfil: url,
    });

    console.log("Datos a subir -> ", variables);
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
      const response = await fetch(`${image_server}`, {
        //const response = await fetch(`${upload_image_to_server}`, {
        method: "POST",
        body: formData,
      });

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
    waifuEditable?.nombre != "" &&
    waifuEditable?.alias != "" &&
    waifuEditable?.descripcion != "" &&
    waifuEditable?.historia != "" &&
    waifuEditable?.pasatiempo != "" &&
    waifuEditable?.ocupacion != "" &&
    waifuEditable?.dia != "" &&
    waifuEditable?.mes != "" &&
    waifuEditable?.edad != "" &&
    personalidadesEditables.length == 0 &&
    especieSeleccionada != ""
      ? true
      : false;

  const Agregar_Personalidad = () => {
    const personalidad = listaPersonalidades.find(
      (p) => p.id_personalidad == personalidadSeleccionada,
    );
    setPersonalidadesEditables([
      ...personalidadesEditables,
      {
        id_personalidad: personalidad.id_personalidad,
        nombre: personalidad.nombre,
      },
    ]);

    setPersonalidadSeleccionada("");
  };

  const Eliminar_Personalidad = (id_personalidad) => {
    setPersonalidadesEditables(
      personalidadesEditables.filter(
        (p) => p.id_personalidad !== id_personalidad,
      ),
    );
  };

  const Personalidades_Disponibles = listaPersonalidades.filter(
    (p) =>
      !personalidadesEditables.some(
        (w) => w.id_personalidad == p.id_personalidad,
      ),
  );

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Agregar Waifu</h1>
        <div className="form-waifu-container">
          <input
            type="text"
            placeholder="Nombre"
            value={waifuEditable.nombre}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, nombre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Alias"
            value={waifuEditable.alias}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, alias: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripcion"
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
            placeholder="Historia"
            value={waifuEditable.historia}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, historia: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Pasatiempos"
            value={waifuEditable.pasatiempo}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, pasatiempo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ocupacion"
            value={waifuEditable.ocupacion}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, ocupacion: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Dia"
            value={waifuEditable.dia}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, dia: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Mes"
            value={waifuEditable.mes}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, mes: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Edad"
            value={waifuEditable.edad}
            onChange={(e) =>
              setWaifuEditable({ ...waifuEditable, edad: e.target.value })
            }
          />

          {listaEspecies.length > 0 && (
            <select
              name="especie"
              value={especieSeleccionada}
              onChange={(e) => setEspecieSeleccionada(e.target.value)}
            >
              <option value={""} /* disabled */>Selecciona una especie</option>
              {listaEspecies.map((specie) => (
                <option key={specie.id_especie} value={specie.id_especie}>
                  {specie.nombre}
                </option>
              ))}
            </select>
          )}

          {personalidadesEditables.length > 0 ? (
            <>
              {personalidadesEditables.map((personality) => (
                <div
                  key={personality.id_personalidad}
                  style={{
                    background: "red",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <div>{personality.nombre}</div>
                  <button
                    onClick={() =>
                      Eliminar_Personalidad(personality.id_personalidad)
                    }
                  >
                    X
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p>No hay personalidades asignadas</p>
          )}

          {listaPersonalidades.length > 0 && (
            <>
              <select
                name="Personalidad"
                value={personalidadSeleccionada}
                onChange={(e) => setPersonalidadSeleccionada(e.target.value)}
              >
                <option value={""} disabled>
                  Selecciona una personalidad
                </option>
                {Personalidades_Disponibles.map((personality) => (
                  <option
                    key={personality.id_personalidad}
                    value={personality.id_personalidad}
                  >
                    {personality.nombre}
                  </option>
                ))}
              </select>

              <button
                disabled={personalidadSeleccionada == ""}
                onClick={Agregar_Personalidad}
              >
                Agregar Personalidad
              </button>
            </>
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

          {/* <button disabled={activateButton} onClick={() => Subir_Imagen()}> */}
          <button disabled={activateButton} onClick={Registrar_Waifu}>
            Agregar Waifu
          </button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
