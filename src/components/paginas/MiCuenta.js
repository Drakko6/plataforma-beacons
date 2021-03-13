import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import * as Yup from "yup";

const MiCuenta = () => {
  //Context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  const lanzarError = () =>
    toast.error("Hubo un error al enviar el correo", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const lanzarSuccess = () =>
    toast.success(
      "El correo se ha enviado. Revisa tu bandeja para cambiar la contraseña",
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  const formik = useFormik({
    initialValues: {
      correo: "",
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
    }),
    onSubmit: (info) => {
      try {
        firebase.auth
          .sendPasswordResetEmail(info.correo)
          .then(function () {
            lanzarSuccess();
          })
          .catch(function (error) {
            lanzarError();
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div>
        {usuario ? (
          <h1 className="text-2xl text-center mt-3">Mi Cuenta</h1>
        ) : (
          <h1 className="text-2xl text-center mt-3">Recupera tu contraseña</h1>
        )}

        <h1 className="text-lg text-center mt-3">
          Ingresa tu correo para cambiar la contraseña
        </h1>

        <div className="flex justify-center mt-10">
          <div className=" w-full  max-w-3xl text-center">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 text-center">
                <label
                  className="block text-gray-800 text-sm font-bold mb-2"
                  htmlFor="correo"
                >
                  Correo
                </label>
                <input
                  autoComplete="off"
                  id="correo"
                  placeholder="Correo"
                  type="text"
                  className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  value={formik.values.correo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.correo && formik.errors.correo ? (
                <div
                  role="alert"
                  className=" text-center mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                >
                  <p className="font-bold">Hubo un error</p>
                  <p>{formik.errors.correo}</p>
                </div>
              ) : null}

              <input
                value="Enviar correo"
                type="submit"
                className="uppercase bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold"
              />
            </form>
            {!usuario ? (
              <Link to="/">
                <p className="text-blue-500 mt-4">Volver a página principal</p>
              </Link>
            ) : null}
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default MiCuenta;
