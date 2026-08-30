import React, { useState } from "react";
import { check_auth } from "../config/Url_Config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const [acceso, setAcceso] = React.useState(false);

  const mostrarAlerta = () => {
    Swal.fire({
      title: "Acceso Denegado",
      text: "No tienes permiso para estar aquí.",
      icon: "error",
      confirmButtonText: "Ir al Inicio",
      confirmButtonColor: "#d33",
      allowOutsideClick: false, // Evita que cierren la alerta haciendo clic afuera
      allowEscapeKey: false, // Evita que la cierren con la tecla Escape
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  const CheckAuth = async () => {
    try {
      const response = await fetch(check_auth, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json(); // Convertir la respuesta a JSON
      console.log("Data de inicio de sesion ", data);

      if (!data.Success) {
        /* alert("No tiene permiso para estar aqui Bv"); */
        setAcceso(false);
        mostrarAlerta();
      } else {
        setAcceso(true);
      }
    } catch (error) {
      console.error("Error al consultar inicio de sesion del usuario:", error);
    }
  };
  return { CheckAuth, acceso };
};
