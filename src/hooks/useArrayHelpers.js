export const useArrayHelpers = () => {
  
  const eliminarElementoArray = (setter, propiedad, idElemento) => {
    setter((stateAnterior) =>
      stateAnterior.filter((elemento) => elemento[propiedad] !== idElemento),
    );
  };

  const eliminarElementoObjetoArray = (setter, propiedad, propiedadId, id) => {
    setter((stateAnterior) => ({
      ...stateAnterior,
      [propiedad]: stateAnterior[propiedad].filter(
        (elemento) => elemento[propiedadId] !== id,
      ),
    }));
  };

  const agregarElementoArray = (setter, objeto, limpiarSeleccion) => {
    setter((estadoAnterior) => [...estadoAnterior, objeto]);
    limpiarSeleccion("");
  };

  const agregarElementoObjetoArray = (
    setter,
    propiedad,
    objeto,
    limpiarSeleccion,
  ) => {
    setter((estadoAnterior) => ({
      ...estadoAnterior,
      [propiedad]: [...estadoAnterior[propiedad], objeto],
    }));
    limpiarSeleccion("");
  };

  return {
    eliminarElementoArray,
    eliminarElementoObjetoArray,
    agregarElementoArray,
    agregarElementoObjetoArray,
  };
};
