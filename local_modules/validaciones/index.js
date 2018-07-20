
function validar(funcion, datos) {
  let respuesta = {};
  for (let i = 0; i < datos.length; i += 1) {
    for (let j = 0; j < datos[i].funcion.length; j += 1) {
      respuesta = funcion[datos[i].funcion[j]](datos[i].valor, datos[i].nombre, datos[i].objeto);
      if (respuesta.valido === false) {
        return respuesta;
      }
    }
  }
  return respuesta;
}


function requerido(dato, nombre, objeto) {
  if (!dato || dato === undefined) {
    return {
      valido: false,
      mensaje: `El campo ${nombre} es requerido`,
      objeto,
    };
  }
  return { valido: true };
}

function numero(dato, nombre, objeto) {
  if (isNaN(dato)) {
    return {
      valido: false,
      mensaje: `El campo ${nombre} tiene que ser número`,
      objeto,
    };
  }
  return { valido: true };
}


module.exports = {
  requerido,
  validar,
  numero,
};
