import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
// import _ from "lodash";
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

  //state de beacons
  const [beacons, setBeacons] = useState([]);

  return (
    <>
      {usuario ? (
        <div className="content-center text-center">
          <h1 className=" flex  justify-center text-3xl font-light mb-4">
            Analítica
          </h1>
          {/*{platillos.map((platillo) => (
        <Vendido key={platillo.id} platillo={platillo} />
      ))}*/}

          <ResponsiveContainer width={700} height={500}>
            <BarChart
              data={beacons}
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
