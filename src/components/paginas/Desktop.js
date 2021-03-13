import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";

import Campana from "../ui/Campana";
const Desktop = () => {
  const [campanas, setCampanas] = useState([]);

  const { firebase, usuario } = useContext(FirebaseContext);

  //CONSULTAR BD al cargar
  useEffect(() => {
    const obtenerCampanas = () => {
      firebase.db
        .collection("campanas")
        .get()
        .then((docs) => {
          const campanas = docs.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setCampanas(campanas);
        });
    };

    // const obtenerCampanas = () => {
    //   firebase.db.collection("campanas").onSnapshot(handleSnapshot);
    // };

    if (usuario) {
      obtenerCampanas();
    }
  }, []);

  //Snapshot nos permite utilizar la BD en tiempo real
  // function handleSnapshot(snapshot) {
  //   const campanas = snapshot.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //   });
  //   //ALMACENA RESULTADOS EN EL STATE
  //   setCampanas(campanas);
  // }

  return (
    <>
      {usuario ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center mt-4">Desktop </h1>

          <table className="table w-full">
            <thead>
              <tr className="bg-blue-200 ">
                <th className="p-3">Nombre de Campaña</th>
                <th>Fecha de inicio</th>
                <th>Status</th>
                <th>Alertas</th>
                {/* <th>Abiertos</th> */}
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {campanas.map((campana) => (
                <Campana key={campana.id} campana={campana} />
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

export default Desktop;
