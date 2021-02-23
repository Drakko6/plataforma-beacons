import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import Orden from "../ui/Orden";

const Completadas = () => {
  //context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //state de ordenes
  const [ordenes, setOrdenes] = useState([]);

  //state de fecha
  const [fecha, setFecha] = useState("");

  const actualizaState = (e) => {
    let fechaActual = new Date(e.target.value);
    fechaActual.setDate(fechaActual.getDate() + 1);
    fechaActual.setHours(0, 0, 0, 0);

    setFecha(fechaActual.getTime());
  };

  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db
        .collection("dias")
        .where("dia", "==", fecha) //solo los sean del dia
        .onSnapshot(manejarSnapshot);
    };

    if (fecha && usuario) {
      //console.log("se consultó");
      obtenerOrdenes();
    }
  }, [fecha]);

  function manejarSnapshot(snapshot) {
    try {
      let ordenesObj = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      let ordenes = ordenesObj[0].ordenes;

      //filtrar las completadas
      ordenes = ordenes.filter((orden) => orden.completado === true);

      setOrdenes(ordenes);
    } catch (error) {
      //console.log(error);
      setOrdenes([]);
    }

    // //filtrar por día
    // const ordenesFiltradas = [];
    // const fechaActual = new Date(fecha);
    // fechaActual.setHours(0, 0, 0, 0);

    // ordenes.forEach((orden) => {
    //   const fecha = new Date(orden.creado);
    //   fecha.setHours(0, 0, 0, 0);

    //   if (fecha.getTime() === fechaActual.getTime()) {
    //     ordenesFiltradas.push(orden);
    //   }
    // });
  }

  return (
    <>
      {usuario ? (
        <div className=" content-center text-center">
          <h1 className="text-3xl font-light mb-4">
            Órdenes del día completadas
          </h1>

          <form>
            <label className="text-xl font-light mb-3">
              Selecciona la fecha{" "}
            </label>
            <input
              type="date"
              name="fecha"
              className="text-2xl font-bold mb-5  text-blue-700"
              lang="es"
              onChange={actualizaState}
            />
          </form>
          <div className="sm:flex sm:flex-wrap -mx-3">
            {ordenes.map((orden) => (
              <Orden key={orden.id} orden={orden} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center flex">
          No cuentas con los permisos para ver esta página{" "}
        </h1>
      )}
    </>
  );
};

export default Completadas;
