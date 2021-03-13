import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import LogoCompleto from "../../assets/logo-completo.svg";
import Logo from "../../assets/logo-dc.svg";
import App from "../../assets/app.png";
import Play from "../../assets/play.png";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const lanzarError = () =>
    toast.error("Usuario o contraseña incorrectos", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      correo: "",
      password: "",
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("Contraseña requerida"),
    }),
    onSubmit: (usuario) => {
      try {
        //autenticar

        firebase.auth
          .signInWithEmailAndPassword(usuario.correo, usuario.password)
          .catch((error) => {
            //Toast con usuario o contraseña incorrectas
            lanzarError();
          });

        firebase.auth.onAuthStateChanged((user) => {
          if (user) {
            //hay usuario, redireccionar

            navigate("/");
          } else {
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      {isDesktopOrLaptop && (
        <div className="p-2  justify-center bg-white w-full h-screen">
          <div className="flex bg-blue-700 ">
            <div className="bg-white ml-32">
              <img
                src={LogoCompleto}
                className="h-32 mt-5"
                alt="Logo Donde Comer"
              />
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex justify-center mt-16 ml-16 md:block md:w-3/5 xl:w-1/2">
              <h2 className="block text-xl font-bold mb-6 text-center text-gray-700">
                Acceso al Panel de Clientes
              </h2>

              <div className="block  max-w-3xl text-center">
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

                  <div className="mb-4">
                    <label
                      className=" text-center  block text-gray-800 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      autoComplete="off"
                      id="password"
                      placeholder="Contraseña"
                      type="password"
                      className=" text-center  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.password && formik.errors.password ? (
                    <div
                      role="alert"
                      className=" text-center mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                    >
                      <p className="font-bold">Hubo un error</p>
                      <p>{formik.errors.password}</p>
                    </div>
                  ) : null}

                  <input
                    value="Ingresar"
                    type="submit"
                    className="uppercase bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold"
                  />
                </form>

                <Link to="/recuperar-password">
                  <h6 className="mt-6 hover:text-blue-600">
                    ¿Has olvidado tu contraseña?
                  </h6>
                </Link>

                <ToastContainer />
              </div>
            </div>

            <div className="flex justify-center mt-24 md:block md:w-3/5 xl:w-1/2 ml-16">
              <div className="block">
                <div className="flex items-center justify-center">
                  <img src={Logo} className="h-40" alt="Logo Donde Comer" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-center text-orange-700 mt-5">
                  Descarga la app
                </h1>
                <div className="flex items-center justify-center">
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Play} className="h-16" alt="PlayStore" />
                  </a>
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={App} className="h-16" alt="AppStore" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTabletOrMobile && (
        <div className="p-2  justify-center bg-white w-full h-screen">
          <div className="flex bg-blue-700 ">
            <div className="bg-white ml-12">
              <img
                src={LogoCompleto}
                className="h-20 mt-5"
                alt="Logo Donde Comer"
              />
            </div>
          </div>

          <div className="block w-full">
            <div className="block justify-center mt-5 ml-5 md:block md:w-3/5 xl:w-1/2">
              <h2 className="block text-xl font-bold mb-6 text-center text-gray-700">
                Acceso al Panel de Clientes
              </h2>

              <div className="block  max-w-3xl text-center">
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

                  <div className="mb-4">
                    <label
                      className=" text-center  block text-gray-800 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      autoComplete="off"
                      id="password"
                      placeholder="Contraseña"
                      type="password"
                      className=" text-center  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.password && formik.errors.password ? (
                    <div
                      role="alert"
                      className=" text-center mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                    >
                      <p className="font-bold">Hubo un error</p>
                      <p>{formik.errors.password}</p>
                    </div>
                  ) : null}

                  <input
                    value="Ingresar"
                    type="submit"
                    className="uppercase bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold"
                  />
                </form>

                <Link to="/recuperar-password">
                  <h6 className="mt-6 hover:text-blue-600">
                    ¿Has olvidado tu contraseña?
                  </h6>
                </Link>

                <ToastContainer />
              </div>
            </div>

            <div className="flex justify-center mt-16 md:block md:w-3/5 xl:w-1/2 ml-6">
              <div className="block">
                <div className="flex items-center justify-center">
                  <img src={Logo} className="h-32" alt="Logo Donde Comer" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-center text-orange-700 mt-5">
                  Descarga la app
                </h1>
                <div className="flex items-center justify-center">
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Play} className="h-16" alt="PlayStore" />
                  </a>
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={App} className="h-16" alt="AppStore" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
