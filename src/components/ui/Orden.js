import React, { useContext, Fragment } from "react";
import { FirebaseContext } from "../../firebase";

const Orden = ({ orden }) => {
  //console.log(orden);
  //const [tiempoentrega, setTiempoEntrega] = useState(0);

  //context de firebase
  const { firebase } = useContext(FirebaseContext);

  //define el tiempo de entrega
  // const definirTiempo = (id) => {
  //   try {
  //     firebase.db.collection("ordenes").doc(id).update({
  //       tiempoentrega,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //completa una orden
  const completarOrden = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({
        completado: true,
      });

      //Obtener todas las ordenes del día
      const hoy = new Date(Date.now()).setHours(0, 0, 0, 0);

      //consultar firebase para sacar la que se refiere
      firebase.db
        .collection("dias")
        .where("dia", "==", hoy) //solo los sean de hoy
        .onSnapshot(manejarSnapshot);

      function manejarSnapshot(snapshot) {
        //sacar el objeto completo del día
        let ordenesObj = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        //arreglo con las ordenes
        const ordenes = ordenesObj[0].ordenes;

        //recorrer las ordenes y guardar el completado true
        ordenes.forEach((orden, i) => {
          if (orden.id === id) {
            //esta es la orden, actualizar completado
            ordenes[i].completado = true;
          }
        });

        //ya se actualizó el objeto, actualizar con nuevo arreglo
        firebase.db.collection("dias").doc(ordenesObj[0].id).update({
          ordenes: ordenes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sm: w-1/2 lg:w-1/3 mb-4 ml-3">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold">
          Orden: {orden.num}
        </h1>
        {orden.orden.map((platillos) => (
          <Fragment key={platillos.id}>
            <p className="text-gray-600">
              {platillos.cantidad} {platillos.nombre}
            </p>
            <p className="text-gray-700 font-bold">
              Observaciones:{" "}
              <span className="text-gray-600 font-light">
                {platillos.observaciones}
              </span>
            </p>
          </Fragment>
        ))}

        <p className="text-gray-700 font-bold">
          Total a Pagar: $ {orden.total}
        </p>

        {/* {orden.tiempoentrega === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Tiempo de Entrega
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="40"
              placeholder="20"
              value={tiempoentrega.toString()}
              onChange={(e) => setTiempoEntrega(parseInt(e.target.value))}
            />

            <button
              onClick={() => definirTiempo(orden.id)}
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            >
              Definir tiempo
            </button>
          </div>
        )}

        {orden.tiempoentrega > 0 && (
          <p className="text-gray-700">
            Tiempo de Entrega:
            <span className="font-bold"> {orden.tiempoentrega} minutos</span>
          </p>
        )} */}

        {!orden.completado && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold "
            onClick={() => completarOrden(orden.id)}
          >
            Marcar como lista
          </button>
        )}
      </div>
    </div>
  );
};

export default Orden;
