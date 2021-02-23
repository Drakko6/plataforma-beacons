import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";

const MiCuenta = () => {
  //Context con las operaciones de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

  //validacion y leer formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los platillos deben tener al menos 3 caracteres")
        .required("El nombre del platillo es obligatorio"),
      precio: Yup.number()
        .min(1, "Debes agregar un número")
        .required("El precio es obligatorio"),

      categoria: Yup.string().required("La categoría es obligatoria"),
      descripcion: Yup.string()
        .min(10, "La descripción debe ser más larga")
        .required("La descripción del platillo es obligatoria"),
    }),
    onSubmit: (platillo) => {
      try {
        platillo.existencia = true;
        platillo.vendidos = 0;
        firebase.db.collection("productos").add(platillo);

        //redireccionar
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

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
