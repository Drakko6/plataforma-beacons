import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

import Beacon from "../ui/Beacon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Beacons = () => {
  const [platillos, setPLatillos] = useState([]);

  const { firebase, usuario } = useContext(FirebaseContext);

  //CONSULTAR BD al cargar
  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection("productos").onSnapshot(handleSnapshot);
    };
    if (usuario) {
      obtenerPlatillos();
    }
  }, []);

  //Snapshot nos permite utilizar la BD en tiempo real
  function handleSnapshot(snapshot) {
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    //ALMACENA RESULTADOS EN EL STATE
    setPLatillos(platillos);
  }

  return (
    <>
      {usuario ? (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center mt-4">Beacons </h1>
          <div className="text-center">
            <div className=" text-center inline-block mr-5">
              <Link
                to="/nuevo-beacon"
                className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2
            text-white uppercase font-bold text-center "
              >
                <FontAwesomeIcon icon={faPlus} />
                Agregar Beacon
              </Link>
            </div>
            <div className=" text-center inline-block">
              <Link
                to="/nueva-campana"
                className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2
            text-white uppercase font-bold text-center "
              >
                <FontAwesomeIcon icon={faPlus} />
                Nueva Campaña
              </Link>
            </div>
          </div>

          <table class="table w-full">
            <thead>
              <tr class="bg-blue-200 ">
                <th className="p-3">Nombre</th>
                <th>Restaurante</th>
                <th>Status</th>
                <th>Distancia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {platillos.map((platillo) => (
                <Beacon key={platillo.id} platillo={platillo} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center flex">
          No cuentas con los permisos para ver esta página{" "}
        </h1>
      )}
    </>
  );
};

export default Beacons;
