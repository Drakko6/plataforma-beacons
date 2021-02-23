import React, { useState } from "react";
import { Route, Routes } from "react-router";

import firebase, { FirebaseContext } from "./firebase";
import PedidoState from "./context/pedidos/pedidosState";

import Login from "./components/paginas/Login";

import Desktop from "./components/paginas/Desktop";
import NuevoBeacon from "./components/paginas/NuevoBeacon";
import NuevaCampana from "./components/paginas/NuevaCampana";
import Beacons from "./components/paginas/Beacons";
import MiCuenta from "./components/paginas/MiCuenta";
import Analitica from "./components/paginas/Analitica";
import VistaPrevia from "./components/paginas/VistaPrevia";

import Sidebar from "./components/ui/Sidebar";
import Registro from "./components/paginas/Registro";

function App() {
  const [usuario, setUsuario] = useState({});

  firebase.auth.onAuthStateChanged((user) => {
    if (user) {
      if (!user.isAnonymous) {
        //hay usuario NO Anonimo
        //consultar BD con id del usuario
        firebase.db
          .collection("usuarios")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setUsuario(doc.data());
          });
      } else {
        setUsuario(false);
      }
    } else {
      setUsuario(false);
    }
  });

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
      }}
    >
      <PedidoState>
        <div className="md:flex min-h-screen">
          {usuario ? <Sidebar /> : null}
          <div className="w-full p-1">
            <Routes>
              {usuario ? (
                <Route exact path="/" element={<Desktop />} />
              ) : (
                <Route exact path="/" element={<Login />} />
              )}

              <Route path="/beacons" element={<Beacons />} />
              <Route path="/nuevo-beacon" element={<NuevoBeacon />} />
              <Route path="/nueva-campana" element={<NuevaCampana />} />
              <Route path="/vista-previa" element={<VistaPrevia />} />
              <Route path="/analitica" element={<Analitica />} />
              <Route path="/mi-cuenta" element={<MiCuenta />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </div>
        </div>
      </PedidoState>
    </FirebaseContext.Provider>
  );
}

export default App;
