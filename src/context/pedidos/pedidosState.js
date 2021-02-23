import React, { useReducer } from "react";

import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import firebase from "../../firebase";

import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
  GUARDAR_ORDEN,
  GUARDAR_MESA,
  OBTENER_ORDENES_DIA,
  INICIAR_NUEVA,
} from "../../types";

const PedidoState = (props) => {
  //Crear state inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idorden: "",
    mesa: "",
    ordenesDia: [],
    contOrdenes: 0,
  };

  //useReducer con dispath para ejecutar funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //obtener las ordenes del dia ya disponibles en firebase
  const obtenerOrdenesdelDia = () => {
    const hoy = new Date(Date.now()).setHours(0, 0, 0, 0);

    //consultar firebase
    firebase.db
      .collection("dias")
      .where("dia", "==", hoy) //solo los sean de hoy
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let ordenesObj = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      let ordenes = [];
      let contOrdenes = 0;
      if (ordenesObj.length > 0) {
        ordenes = ordenesObj[0].ordenes;
        contOrdenes = ordenes.length;
      }
      //tenemos resultados de la base de datos
      dispatch({
        type: OBTENER_ORDENES_DIA,
        payload: {
          ordenes,
          contOrdenes,
        },
      });
    }
  };

  //Iniciar nueva orden
  const iniciarNuevaOrden = () => {
    dispatch({
      type: INICIAR_NUEVA,
    });
  };

  //Selecciona el producto a ordenar
  const seleccionarPlatillo = (platillo) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  //Cuando el usuario confirma un platillo
  const guardarPedido = (pedido) => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };

  //Muestra el total a pagar en el resumen
  const mostrarResumen = (total) => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  //Elimina un articulo del carrito
  const eliminarProducto = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

  //completa la orden
  const pedidoRealizado = (id) => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };

  //guardar orden en el arreglo del dia
  const guardarOrden = (orden) => {
    dispatch({
      type: GUARDAR_ORDEN,
      payload: orden,
    });
  };

  //guarda la mesa de la orden
  const guardarMesa = (mesa) => {
    dispatch({
      type: GUARDAR_MESA,
      payload: mesa,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        seleccionarPlatillo,
        guardarPedido,
        total: state.total,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
        idorden: state.idorden,
        ordenesDia: state.ordenesDia,
        guardarMesa,
        guardarOrden,
        obtenerOrdenesdelDia,
        contOrdenes: state.contOrdenes,
        iniciarNuevaOrden,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
