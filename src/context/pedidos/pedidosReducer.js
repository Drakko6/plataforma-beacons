import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
  GUARDAR_MESA,
  GUARDAR_ORDEN,
  OBTENER_ORDENES_DIA,
  INICIAR_NUEVA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        platillo: action.payload,
      };
    case CONFIRMAR_ORDENAR_PLATILLO:
      return {
        ...state,
        pedido: [...state.pedido, action.payload],
      };
    case MOSTRAR_RESUMEN:
      return {
        ...state,
        total: action.payload,
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        pedido: state.pedido.filter(
          (articulo) => articulo.id !== action.payload
        ),
      };
    case PEDIDO_ORDENADO:
      return {
        ...state,
        pedido: [],
        total: 0,
        idorden: action.payload,
      };
    case OBTENER_ORDENES_DIA:
      return {
        ...state,
        ordenesDia: action.payload.ordenes,
        contOrdenes: action.payload.contOrdenes,
      };

    case GUARDAR_ORDEN:
      //Comprobar que la orden forma parte de este día
      /* if (state.ordenesDia.length > 0) {
        if (
          new Date(action.payload.creado).setHours(0, 0, 0, 0) ===
          new Date(state.ordenesDia[0].creado).setHours(0, 0, 0, 0)
        ) {
          //es del mismo día
          return {
            ...state,
            ordenesDia: [...state.ordenesDia, action.payload],
          };
        } else {
          //es un nuevo dia
          return {
            ...state,
            ordenesDia: [action.payload],
          };
        }
      }
      */
      return {
        ...state,
        ordenesDia: [...state.ordenesDia, action.payload],
        contOrdenes: state.contOrdenes + 1,
      };

    case GUARDAR_MESA:
      return {
        ...state,
        mesa: action.payload,
      };
    case INICIAR_NUEVA:
      return {
        ...state,
        idorden: "",
        pedido: [],
        total: 0,
      };

    default:
      return state;
  }
};
