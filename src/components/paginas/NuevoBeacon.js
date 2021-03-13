import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";

const NuevoBeacon = () => {
  //state para imagenes

  //Context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

  //validacion y leer formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      bid: "",
      rangoMenor: "",
      rangoMayor: "",
      distancia: "",
      restaurante: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre del beacon es obligatorio"),
      bid: Yup.string()
        .min(3, "El ID debe tener al menos 3 caracteres")
        .required("El ID del beacon es obligatorio"),
      rangoMenor: Yup.number().min(1, "Debes agregar un número"),
      // .required("El rang es obligatorio"),
      rangoMayor: Yup.number().min(1, "Debes agregar un número"),
      // .required("El rang es obligatorio"),

      distancia: Yup.number().min(1, "Debes agregar un número"),
      // .required("El rang es obligatorio"),

      restaurante: Yup.string().required("El restaurante es obligatorio"),
    }),
    onSubmit: (beacon) => {
      try {
        beacon.status = true;
        beacon.fecha = Date.now();
        beacon.userEmail = usuario.email;

        firebase.db.collection("beacons").doc(beacon.bid).set(beacon);

        // firebase.db.collection("beacons").add(beacon);
        //redireccionar
        navigate("/beacons");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      {usuario ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center mt-3">
            Agregar Beacon
          </h1>
          <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre del Beacon
                  </label>
                  <input
                    autoComplete="off"
                    id="nombre"
                    placeholder="Nombre de Beacon"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.nombre}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bid"
                  >
                    ID del Beacon
                  </label>
                  <input
                    autoComplete="off"
                    id="bid"
                    placeholder="ID de Beacon"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.bid}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.bid && formik.errors.bid ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.bid}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rangoMenor"
                  >
                    Rango Menor
                  </label>
                  <input
                    autoComplete="off"
                    id="rangoMenor"
                    placeholder="Rango Menor"
                    min="0"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.rangoMenor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.rangoMenor && formik.errors.rangoMenor ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.rangoMenor}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rangoMayor"
                  >
                    Rango Mayor
                  </label>
                  <input
                    autoComplete="off"
                    id="rangoMayor"
                    placeholder="Rango Mayor"
                    min="0"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.rangoMayor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.rangoMayor && formik.errors.rangoMayor ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.rangoMayor}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="distancia"
                  >
                    Distancia
                  </label>
                  <input
                    autoComplete="off"
                    id="distancia"
                    placeholder="Distancia"
                    min="0"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.distancia}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.distancia && formik.errors.distancia ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.distancia}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="restaurante"
                  >
                    Asignar a Restaurante
                  </label>
                  <select
                    id="restaurante"
                    name="restaurante"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.restaurante}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {/* AQUI SE PINTARAN LOS RESTAURANTES HACIENDO PETICION A API */}
                    <option value="">-- Seleccione --</option>
                    <option value="mision 19">Mision 19</option>
                    <option value="la diferencia">La Diferencia</option>
                    <option value="villa marina">Villa Marina</option>
                    <option value="los compas">Los Compas</option>
                  </select>
                </div>

                {formik.touched.restaurante && formik.errors.restaurante ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.restaurante}</p>
                  </div>
                ) : null}

                <input
                  value="Guardar Beacon"
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold"
                />
              </form>
            </div>
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

export default NuevoBeacon;
