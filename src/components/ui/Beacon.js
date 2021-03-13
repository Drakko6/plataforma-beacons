import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const Beacon = ({ beacon }) => {
  //Existencia ref acceder a un valor del DOM directamente
  // const existenciaRef = useRef(platillo.existencia);

  const { firebase } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [seElimino, setSeElimino] = useState(false);

  const {
    nombre,
    bid,
    restaurante,
    rangoMenor,
    rangoMayor,
    distancia,
    status,
  } = beacon;

  const confirmarEliminacion = () => {
    //solo mostrar alerta
    setShowAlert(true);
  };

  const eliminarBeacon = (beacon) => {
    //eliminar en firebase
    try {
      firebase.db
        .collection("beacons")
        .doc(beacon.bid)
        .delete()
        .then(() => {
          setShowAlert(false);
          setSeElimino(true);
        })
        .catch((error) => {
          console.error("Error borrando: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!seElimino ? (
        <tr className="text-center">
          <td className="p-3">{nombre}</td>
          <td>{restaurante}</td>
          <td>{status ? "Activo" : "Inactivo"}</td>
          <td>{distancia}</td>
          <td>
            <FontAwesomeIcon
              onClick={() =>
                navigate(
                  "editar/" +
                    encodeURIComponent(nombre) +
                    "/" +
                    encodeURIComponent(bid) +
                    "/" +
                    encodeURIComponent(rangoMayor) +
                    "/" +
                    encodeURIComponent(rangoMenor) +
                    "/" +
                    encodeURIComponent(distancia) +
                    "/" +
                    encodeURIComponent(restaurante),
                  { replace: true }
                )
              }
              icon={faEdit}
              className="mr-3 text-xl cursor-pointer	"
              color="green"
            />

            <FontAwesomeIcon
              icon={faEye}
              className="mr-3 text-xl cursor-pointer	"
              color="cornflowerblue"
            />

            <FontAwesomeIcon
              onClick={() => confirmarEliminacion()}
              icon={faTrashAlt}
              className="mr-3 text-xl cursor-pointer	"
              color="red"
            />
          </td>

          <SweetAlert
            warning
            showCancel
            confirmBtnText="Confirmar"
            confirmBtnBsStyle="primary"
            cancelBtnText="Cancelar"
            title="¿Seguro que quieres eliminar?"
            onConfirm={() => eliminarBeacon(beacon)}
            show={showAlert}
            onCancel={() => setShowAlert(false)}
            closeOnClickOutside
            cancelBtnBsStyle="danger"
          >
            Una vez eliminado, no podrás recuperarlo
          </SweetAlert>
        </tr>
      ) : null}
    </>
  );
};

export default Beacon;
