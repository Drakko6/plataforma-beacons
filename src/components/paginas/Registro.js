import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Registro = () => {
  //Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

  //para hacer toast
  const lanzarError = () =>
    toast.error("El usuario ya existe", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //validacion y leer formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
      tipo: "",
      restaurante: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres")
        .required("La contraseña es obligatoria"),

      tipo: Yup.string().required("El tipo de usuario es obligatorio"),

      restaurante: Yup.string(),
      // .required("El restaurante es obligatorio para los clientes"),
    }),
    onSubmit: (usuario) => {
      try {
        //Autenticar con email y password con auth
        firebase.auth
          .createUserWithEmailAndPassword(usuario.email, usuario.password)
          .then((user) => {
            //Si no, agregar el usuario a collection
            const nuevoUsuario = {
              email: user.user.email,
              nombre: usuario.nombre,
              rol: usuario.tipo,
            };

            if (usuario.restaurante && usuario.rol === "client") {
              nuevoUsuario.restaurante = usuario.restaurante;
            }

            firebase.db
              .collection("usuarios")
              .doc(user.user.uid)
              .set(nuevoUsuario);

            //redireccionar
            navigate("/");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            lanzarError();
          });

        //checar si el usuario existe (buscar en bd con id )

        //Si ya existe, desloguear y lanzar error
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center mt-3">
          Nuevo Usuario
        </h1>
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-3xl">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  autoComplete="off"
                  id="nombre"
                  placeholder="Nombre de usuario"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div
                  role="alert"
                  className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                >
                  <p className="font-bold">Hubo un error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Correo
                </label>
                <input
                  autoComplete="off"
                  id="email"
                  placeholder="Correo de usuario"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div
                  role="alert"
                  className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                >
                  <p className="font-bold">Hubo un error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Contraseña
                </label>
                <input
                  autoComplete="off"
                  id="password"
                  placeholder="Contraseña"
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div
                  role="alert"
                  className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                >
                  <p className="font-bold">Hubo un error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Tipo de Usuario
                </label>
                <select
                  id=""
                  name="tipo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Seleccione --</option>
                  <option value="admin">Administrador</option>
                  <option value="client">Cliente</option>
                </select>
              </div>

              {formik.touched.tipo && formik.errors.tipo ? (
                <div
                  role="alert"
                  className="mb-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                >
                  <p className="font-bold">Hubo un error</p>
                  <p>{formik.errors.tipo}</p>
                </div>
              ) : null}

              {formik.values.tipo === "client" && (
                <>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="restaurante"
                    >
                      Propietario de Restaurante
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
                </>
              )}

              <input
                value="Agregar Usuario"
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold"
              />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Registro;
