import React from "react";
import { image_server } from "../config/Url_Config";

export const useUploadImage = () => {
  /*   const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null); */

  const subirImagen = async ({ waifu, image }) => {
    /* const waifus = wallpaper.personajes.map((waifu) => waifu.id_personaje);
    const waifu = waifus[0]; */

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
      const response = await fetch(`${image_server}`, {
        //const response = await fetch(`${upload_image_to_server}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Respuesta subida imagen => ", data);
      if (data.Success) {
        console.log("IMAGEN SUBIDA => ", data);

        return data.url;
      } else {
        console.warn(data);
        return null;
      }
      //setUrl(data.url);
      //Actualizar_Datos(data.url);
      /* const booleanPublicImage = Boolean(publicImage); */
      //}
      /* else if (data.Error) {
        console.warn("error", data); */
      //ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
    } catch (e) {
      console.log(`Error al subir imagen al servidor => ${e}`);
      return null;
    }
  };

  return { subirImagen };
};
