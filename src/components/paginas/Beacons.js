import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

import Beacon from "../ui/Beacon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Beacons = () => {
  const [beacons, setBeacons] = useState([]);

  const { firebase, usuario } = useContext(FirebaseContext);

  //CONSULTAR BD al cargar
  useEffect(() => {
    const obtenerBeacons = () => {
      firebase.db
        .collection("beacons")
        .get()
        .then((docs) => {
          const beacons = docs.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setBeacons(beacons);
        });
    };

    // const obtenerBeacons = () => {
    //   firebase.db.collection("beacons").onSnapshot(handleSnapshot);
    // };
    if (usuario) {
      obtenerBeacons();
    }
  }, []);

  //Snapshot nos permite utilizar la BD en tiempo real
  function handleSnapshot(snapshot) {
    const beacons = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setBeacons(beacons);
  }

  return (
    <>
      {usuario ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center mt-4">Beacons </h1>
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

          <table className="table w-full">
            <thead>
              <tr className="bg-blue-200 ">
                <th className="p-3">Nombre</th>
                <th>Restaurante</th>
                <th>Status</th>
                <th>Distancia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {beacons.map((beacon) => (
                <Beacon key={beacon.id} beacon={beacon} />
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
