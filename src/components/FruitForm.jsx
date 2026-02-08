import { useState, useEffect } from "react";
import { initialFruits } from "../data/initialFruits"; // Para sacar las imágenes disponibles
import { useSound } from "../hooks/useSound";

export const FruitForm = ({ fruitToEdit, onSubmit, onCancel }) => {
  const playSound = useSound(); // <--- Inicializar
  // Extraemos las imágenes únicas de tu data inicial para el selector
  const availableImages = initialFruits.map((f) => f.image);

  // Estado para animación de error
  const [isShake, setIsShake] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Tropical",
    price: "",
    quantity: "",
    description: "",
    image: availableImages[0], // Imagen por defecto
    bgColor: "bg-white",
    colorAccent: "shadow-gray-400",
  });

  // Si nos pasan una fruta (Modo Edición), rellenamos el formulario
  useEffect(() => {
    if (fruitToEdit) {
      setFormData(fruitToEdit);
    }
  }, [fruitToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- VALIDACIÓN CON SONIDO DE ERROR ---
    if (!formData.name.trim() || formData.price <= 0 || formData.quantity < 0) {
      playSound("error"); // <--- ¡AQUÍ SUENA EL ERROR!

      // Activamos animación de vibración
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500); // Quitamos la clase después de 0.5s
      return;
    }

    // Convertir números (el input devuelve strings)
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    onSubmit(processedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fruit-wood/50 backdrop-blur-sm animate-fadeIn">
      <div
        className={`
        bg-fruit-base w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-white
        ${isShake ? "animate-shake" : "animate-scaleIn"} // <--- Clase condicional
      `}
      >
        {/* Header */}
        <div className="bg-fruit-green p-4 text-center">
          <h2 className="font-bubblegum text-2xl text-white tracking-wide">
            {fruitToEdit ? "Editar Fruta" : "Nueva Fruta Fresca"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          {/* Selector Visual de Imágenes */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
              Selecciona la Fruta
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {availableImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: img })}
                  className={`
                    flex-shrink-0 w-16 h-16 rounded-xl border-2 p-1 transition-all
                    ${formData.image === img ? "border-fruit-orange bg-orange-50 scale-110" : "border-gray-200 hover:border-gray-300"}
                  `}
                >
                  <img
                    src={img}
                    alt="fruta"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Nombre y Categoría */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-fruit-text mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-fruit-green focus:ring-2 focus:ring-green-100 transition-all font-boogaloo text-lg"
                placeholder="Ej. Mango"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-fruit-text mb-1">
                Categoría
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-fruit-green"
              >
                <option>Tropical</option>
                <option>Bosque</option>
                <option>Cítrico</option>
                <option>Hueso</option>
                <option>Exótico</option>
                <option>Melones</option>
              </select>
            </div>
          </div>

          {/* Precio y Cantidad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-fruit-text mb-1">
                Precio ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-boogaloo text-xl text-fruit-green-dark"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-fruit-text mb-1">
                Stock
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-boogaloo text-xl text-fruit-wood"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold text-fruit-text mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-fruit-green resize-none text-sm"
              placeholder="Describe el sabor y textura..."
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-3 pt-4 p-6">
            <button
              type="button"
              onClick={() => {
                playSound("ui-click"); // <--- Sonido Click al cancelar
                onCancel();
              }}
              className="flex-1 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-fruit-green text-white font-bold rounded-xl hover:bg-fruit-green-dark hover:shadow-lg transition-all"
            >
              {fruitToEdit ? "Guardar Cambios" : "Añadir al Inventario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
