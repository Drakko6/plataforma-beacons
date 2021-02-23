import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import _ from "lodash";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analitica = () => {
  //context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //state de platillos
  const [platillos, setPLatillos] = useState([]);

  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db
        .collection("productos")
        .where("vendidos", ">=", 1)
        .onSnapshot(handleSnapshot);
    };
    if (usuario) {
      obtenerPlatillos();
    }
  }, []);

  //Snapshot nos permite utilizar la BD en tiempo real
  function handleSnapshot(snapshot) {
    let platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //Ordenar por vendidos
    platillos = _.orderBy(platillos, "vendidos", "desc");

    //Sacar los primeros 5
    platillos = _.slice(platillos, 0, 5);

    //ALMACENA RESULTADOS EN EL STATE
    setPLatillos(platillos);
  }

  return (
    <>
      {usuario ? (
        <div className="content-center text-center">
          <h1 className=" flex  justify-center text-3xl font-light mb-4">
            Productos más vendidos
          </h1>
          {/*{platillos.map((platillo) => (
        <Vendido key={platillo.id} platillo={platillo} />
      ))}*/}

          <ResponsiveContainer width={700} height={500}>
            <BarChart
              data={platillos}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="vendidos" fill="#3581B8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h1 className="text-center flex">
          No cuentas con los permisos para ver esta página{" "}
        </h1>
      )}
    </>
  );
};

export default Analitica;
