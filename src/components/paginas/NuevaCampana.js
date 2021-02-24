import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

const NuevaCampana = () => {
  //state para imagenes
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlimagen, setUrlimagen] = useState("");

  //Context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

  //validacion y leer formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      titulo: "",
      mensaje: "",
      url: "",
      beacon: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Las campañas deben tener al menos 3 caracteres")
        .required("El nombre de la campaña es obligatorio"),
      titulo: Yup.string()
        .min(6, "El titulo debe tener al menos 6 caracteres")
        .required("El nombre del platillo es obligatorio"),
      mensaje: Yup.string()
        .min(10, "El mensaje debe ser más largo")
        .required("El mensaje es obligatorio"),
      url: Yup.string(),
      beacon: Yup.string().required("El beacon es obligatorio"),
    }),
    onSubmit: (campana) => {
      try {
        campana.fecha = Date.now();
        campana.status = true;
        campana.alertas = 0;
        campana.abiertos = 0;
        campana.clicks = 0;
        //asignar restaurante también

        firebase.db.collection("campanas").add(campana);

        //redireccionar
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

  //Imagenes
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };
  const handleUploadError = (error) => {
    setSubiendo(false);
    console.log(error);
  };

  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);

    //almacenar la url de destino
    const url = await firebase.storage
      .ref("campanas")
      .child(nombre)
      .getDownloadURL();

    setUrlimagen(url);
  };
  const handleProgress = (progreso) => {
    setProgreso(progreso);
    //console.log(progreso);
  };
  return (
    <>
      {usuario ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 mt-3 text-center">
            Crear Campaña
          </h1>
          <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre de Campaña
                  </label>
                  <input
                    id="nombre"
                    placeholder="Nombre de campaña"
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
                    htmlFor="titulo"
                  >
                    Título de notificación
                  </label>
                  <input
                    id="titulo"
                    placeholder="Título de notificación"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.titulo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.titulo && formik.errors.titulo ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.titulo}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mensaje"
                  >
                    Mensaje de notificación
                  </label>
                  <textarea
                    id="mensaje"
                    placeholder="Mensaje de notificación"
                    className="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.mensaje}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>

                {formik.touched.mensaje && formik.errors.mensaje ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.mensaje}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="url"
                  >
                    URL/Link a página web
                  </label>
                  <input
                    id="url"
                    placeholder="URL de página web"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.url && formik.errors.url ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.url}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="beacon"
                  >
                    Asignar a Beacon
                  </label>
                  <select
                    id=""
                    name="beacon"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    value={formik.values.beacon}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">-- Seleccione --</option>
                    <option value="bc001">BC001 -Misión 19</option>
                    <option value="bc002">BC002 - La Diferencia</option>
                    <option value="bc003">BC004 - Sabor a Mí</option>
                  </select>
                </div>

                {formik.touched.beacon && formik.errors.beacon ? (
                  <div
                    role="alert"
                    className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  >
                    <p className="font-bold">Hubo un error</p>
                    <p>{formik.errors.categoria}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imagen"
                  >
                    Imagen de Menú
                  </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </div>

                {subiendo && (
                  <div className="h-12 w-full relative border">
                    <div
                      style={{ width: `${progreso}%` }}
                      className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                    >
                      {progreso} %
                    </div>
                  </div>
                )}

                {urlimagen && (
                  <p className="bg-green-500 text-white p-3 text-center my-5">
                    La imagen se subió correctamente
                  </p>
                )}

                <button
                  type="button"
                  className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold"
                >
                  Vista Previa
                </button>

                <input
                  value="Guardar Campaña"
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

export default NuevaCampana;
