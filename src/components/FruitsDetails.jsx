import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FruitDetails = ({ frutas }) => {
  const { id } = useParams();
  const [fruta, setFruta] = useState(null);

  useEffect(() => {
    const obtenerFrutaPorId = () => {
      const frutaId = parseInt(id, 10);
      const frutasEnLocalStorage =
        JSON.parse(localStorage.getItem("frutas")) || [];
      const frutaEncontrada = frutasEnLocalStorage.find(
        (f) => f.id === frutaId
      );

      if (frutaEncontrada) {
        setFruta(frutaEncontrada);
      } else {
        setFruta(null);
      }
    };

    obtenerFrutaPorId();
  }, [id]);

  if (!fruta) {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Detalles de la Fruta</h1>
        <div className="bg-white p-4 rounded-md shadow-md">
          <p className="text-xl font-semibold text-red-600">
            Fruta no encontrada
          </p>
          <Link
            to="/dashboard/inventario"
            className="text-blue-600 font-semibold mt-2 block text-center"
          >
            Volver al Inventario
          </Link>
        </div>
      </div>
    );
  }

  const { nombre, imagen, cantidad, precio } = fruta;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Detalles de la Fruta</h1>
      <div className="bg-white p-4 rounded-md shadow-md text-center">
        <img
          src={imagen}
          alt={nombre}
          className="w-48 h-48 object-cover rounded-md mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mt-2">{nombre}</h2>
        <p className="text-lg text-gray-600">
          Precio por unidad: ${precio.toFixed(2)}
        </p>
        <p className="text-lg text-gray-600">
          Cantidad disponible: {cantidad}
        </p>
        <Link
          to="/dashboard/inventario"
          className="text-blue-600 font-semibold mt-4 block"
        >
          Volver al Inventario
        </Link>
      </div>
    </div>
  );
};

export default FruitDetails;
