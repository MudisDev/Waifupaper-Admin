import React from "react";

export const useLoraEditor = () => {
  const seleccionarLoraEdicion = (wallpaper, idLora, setLoraEdicion) => {
    const lora = wallpaper.modelos_lora.find(
      (lora) => lora.id_modelo_lora == idLora,
    );

    if (!lora) return;

    setLoraEdicion({
      ...lora,
    });
  };

  const guardarCambiosLora = (setWallpaper, loraEdicion, limpiarFormulario) => {
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
  };

  return { seleccionarLoraEdicion, guardarCambiosLora };
};
