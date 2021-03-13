import React from "react";
// import { FirebaseContext } from "../../firebase";

const Campana = ({ campana }) => {
  //Existencia ref acceder a un valor del DOM directamente
  // const existenciaRef = useRef(platillo.existencia);

  //Context de firebase
  // const { firebase } = useContext(FirebaseContext);

  const { nombre, fecha, clicks, alertas, status } = campana;

  const fechaFormateada = new Date(fecha).toLocaleDateString();
  return (
    <tr className="text-center">
      <td className="p-3">{nombre}</td>
      <td>{fechaFormateada}</td>
      <td>{status ? "Activo" : "Inactivo"}</td>
      <td>{alertas}</td>
      <td>{clicks}</td>
    </tr>
  );
};

export default Campana;
