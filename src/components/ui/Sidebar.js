import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-dc.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faSignal,
  faChartBar,
  faUser,
  faWindowClose,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);

  const { firebase, usuario, setUsuario } = useContext(FirebaseContext);

  const cerrarSesion = () => {
    firebase.auth
      .signOut()
      .then(() => {
        setUsuario(null);
        navigate("/");
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  const mostrarMenu = () => {
    setMenu(!menu);
  };
  return (
    <>
      <div className="hidden md:block md:w-2/5 xl:w-1/5 bg-indigo-700 ">
        <div className="p-6">
          <div className="flex items-center justify-center">
            <img className="h-24" src={Logo} alt="Logo Donde Comer" />
          </div>

          <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
            Donde Comer
          </p>

          <p className="mt-3 text-gray-300  text-center">
            Bienvenido, {usuario.nombre}
          </p>

          <p className="mt-3 text-gray-300  text-center">
            Administra tus Beacons
          </p>

          <nav className="mt-5">
            <NavLink
              className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
              activeClassName="text-yellow-500"
              end
              to="/"
            >
              <FontAwesomeIcon
                icon={faClipboardList}
                className="mr-3 text-xl"
              />
              Desktop
            </NavLink>

            {/* YA TENEMOS POSIBILIDAD DE CAMBIAR SEGÚN EL TIPO DE USUARIO */}

            <NavLink
              className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
              activeClassName="text-yellow-500"
              end
              to="/beacons"
            >
              <FontAwesomeIcon icon={faSignal} className="mr-3" />
              Beacons
            </NavLink>

            <NavLink
              className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
              activeClassName="text-yellow-500"
              end
              to="/analitica"
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-3" />
              Analítica
            </NavLink>

            <NavLink
              className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
              activeClassName="text-yellow-500"
              end
              to="/mi-cuenta"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Mi cuenta
            </NavLink>
            {usuario.rol === "admin" ? (
              <NavLink
                className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
                activeClassName="text-yellow-500"
                end
                to="/registro"
              >
                <FontAwesomeIcon icon={faUsers} className="mr-3" />
                Registro de usuarios
              </NavLink>
            ) : null}
          </nav>

          <div className="mt-8 p-1 text-gray-400 block hover:bg-red-700  hover:text-gray-200">
            <button onClick={() => cerrarSesion()} type="submit">
              <FontAwesomeIcon icon={faWindowClose} className="mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* para movil*/}

      <div className="block md:hidden">
        <button className="bg-gray-200 p-5" onClick={() => mostrarMenu()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className="heroicon-ui"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>

      {menu ? null : (
        <div className=" block w-6/12 md:hidden bg-indigo-700 ">
          <div className="p-1">
            <nav className="mt-1">
              <NavLink
                className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
                activeClassName="text-yellow-500"
                end
                to="/"
                onClick={() => setMenu(!menu)}
              >
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="mr-3 text-xl"
                />
                Desktop
              </NavLink>

              <NavLink
                className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
                activeClassName="text-yellow-500"
                end
                to="/beacons"
                onClick={() => setMenu(!menu)}
              >
                <FontAwesomeIcon icon={faSignal} className="mr-3" />
                Beacons
              </NavLink>

              <NavLink
                className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
                activeClassName="text-yellow-500"
                end
                to="/analitica"
                onClick={() => setMenu(!menu)}
              >
                <FontAwesomeIcon icon={faChartBar} className="mr-3" />
                Analítica
              </NavLink>
              <NavLink
                className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
                activeClassName="text-yellow-500"
                end
                to="/mi-cuenta"
                onClick={() => setMenu(!menu)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                Mi Cuenta
              </NavLink>

              {usuario.rol === "admin" ? (
                <NavLink
                  className="p-1 text-gray-400 block hover:bg-orange-600 hover:text-gray-200"
                  activeClassName="text-yellow-500"
                  end
                  to="/registro"
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-3" />
                  Registro de usuarios
                </NavLink>
              ) : null}
            </nav>

            <div className="mt-3 p-1 text-gray-400 block hover:bg-red-700  hover:text-gray-200">
              <button onClick={() => cerrarSesion()} type="submit">
                <FontAwesomeIcon icon={faWindowClose} className="mr-3" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
