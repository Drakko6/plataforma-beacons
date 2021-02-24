import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";

const MiCuenta = () => {
  //Context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

  return (
    <>
      {usuario ? (
        <div>
          <h1 className="text-2xl text-center mt-3">Mi Cuenta</h1>
        </div>
      ) : (
        <h1 className="text-center flex">
          No cuentas con los permisos para ver esta página{" "}
        </h1>
      )}
    </>
  );
};

export default MiCuenta;
