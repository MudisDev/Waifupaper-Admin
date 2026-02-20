import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../routes/NavBar";
import { search_character, edit_profile } from "../config/Url_Config";

export const Editar_Waifu = () => {
  const { id } = useParams();
  const [waifu, setWaifu] = React.useState(null);
  const [editWaifu, setEditWaifu] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

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

        //setImage({ ...editWaifu, imagen: data.url });
        setEditWaifu((prev) => ({
          ...prev,
          imagen: data.url,
        }));

        console.log("Imagen subida EditWaifu =>", editWaifu.imagen);

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
    try {
      const params = new URLSearchParams({
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
      });

      console.log("Params -> ", params);

      //const response = await fetch(`${edit_profile}?id_personaje=${id}&${params.toString()}`);
      const response = await fetch(
        `${edit_profile}?id_personaje=${id}&${params.toString()}`,
      );

      const data = await response.json();
      //const data = await response.text();
      console.log('data => ', data);
      if (data.Success) {
        console.log("Waifu editada con exito");
      } else console.log("Error al editar la waifu Bv");
    } catch (error) {
      console.error("Error al actualizar perfil - ", error);
    }
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

            <input
              type="text"
              value={editWaifu.especie}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, especie: e.target.value })
              }
            />

            <input
              type="text"
              value={editWaifu.personalidades}
              onChange={(e) =>
                setEditWaifu({ ...editWaifu, personalidades: e.target.value })
              }
            />
          </div>

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

          <button disabled={!isModified} onClick={() => Actualizar_Perfil()}>
            Actualizar Perfil
          </button>
        </>
      )}
    </div>
  );
};
