import React from "react";

export const useFetch = ({ endpoint, params = {}, primerElemento = false }) => {
  const [data, setData] = React.useState(primerElemento ? null : []);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (newParams = params) => {
    try {
      setLoading(true);
      const queryParams = newParams ?? params;
      const query = new URLSearchParams(queryParams);
      const url = query.toString()
        ? `${endpoint}?${query.toString()}`
        : endpoint;
      //console.log("URL -> ", url);
      const response = await fetch(url);
      const json = await response.json();
      setData(primerElemento ? json[0] : json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};
