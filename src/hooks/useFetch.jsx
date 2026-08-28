import React from "react";

export const useFetch = ({ endpoint, metodo, params = {} }) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const metodosPermitidos = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const fetchData = async (newParams = params) => {
    if (!metodosPermitidos.includes(metodo)) {
      console.error({ Error: "Metodo en useFetch invalido" });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryParams = newParams;

      let url = endpoint;
      let opciones = { method: metodo, credentials: "include" };

      if (metodo === "GET") {
        const query = new URLSearchParams(queryParams);

        if (query.toString()) {
          url = `${endpoint}?${query.toString()}`;
        }
      } else {
        opciones.headers = {
          "Content-Type": "application/json",
        };

        opciones.body = JSON.stringify(queryParams);
      }

      const response = await fetch(url, opciones);

      /*  const json = await response.json(); */

      // 👇 Primero obtenemos la respuesta como texto
      const texto = await response.text();

      console.log("Respuesta RAW del servidor:", texto);

      // 👇 Intentamos convertir ese texto a JSON
      let json;

      try {
        json = JSON.parse(texto);
      } catch (e) {
        throw new Error(
          `El servidor no devolvió JSON válido: ${texto}, ERROR CACHADO -> ${e}`,
        );
      }

      if (!response.ok) {
        setError({
          status: response.status,
          ...json,
        });
        return;
      }

      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};
