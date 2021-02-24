import React from "react";
// import { FirebaseContext } from "../../firebase";

const Campana = ({ campana }) => {
  //Existencia ref acceder a un valor del DOM directamente
  // const existenciaRef = useRef(platillo.existencia);

  //Context de firebase
  // const { firebase } = useContext(FirebaseContext);
  const {
    nombre,
    // bid,
    restaurante,
    // rangoMenor,
    // rangoMayor,
    distancia,
    status,
    // id,
  } = campana;

  return (
    <tr className="text-center">
      <td className="p-3">{nombre}</td>
      <td>{restaurante}</td>
      <td>{status ? "Activo" : "Inactivo"}</td>
      <td>{distancia}</td>
      <td>Acciones</td>
    </tr>
  );
};

export default Campana;
