import React, { useReducer } from "react";

import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";
import firebase from "../../firebase";
import _ from "lodash";

//TYPES
import { OBTENER_PRODUCTOS_EXITO } from "../../types";

const FirebaseState = (props) => {
  //console.log(firebase);

  //Crear state inicial
  const initialState = {
    // beacons: [],
    //campanas: [],
  };

  //useReducer con dispath para ejecutar funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
