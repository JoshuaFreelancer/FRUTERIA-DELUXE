import { createPortal } from "react-dom"; // <--- 1. IMPORTAR ESTO
import { X, Edit2, Trash2 } from "lucide-react";
import { useSound } from "../hooks/useSound";

export const FruitModal = ({ fruit, onClose, onEdit, onDelete }) => {
  const playSound = useSound();

  if (!fruit) return null;

  const handleClose = () => {
    playSound("ui-click");
    onClose();
  };

  // 2. ENVOLVEMOS TODO EL JSX EN createPortal
  return createPortal(
    // Overlay: Subimos el Z-Index a un valor muy alto para asegurar (z-[9999])
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-fruit-wood/40 backdrop-blur-sm transition-all animate-fadeIn">
      
      {/* Contenedor del Modal */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-scaleIn">
        {/* Botón Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-fruit-red hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Lado Izquierdo: Visual */}
          <div
            className={`w-full md:w-2/5 ${fruit.bgColor} flex items-center justify-center p-8 relative overflow-hidden`}
          >
            <div
              className={`absolute w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-30 -top-10 -left-10 ${fruit.colorAccent.replace("shadow-", "bg-")}`}
            ></div>

            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-48 h-48 object-contain drop-shadow-2xl relative z-10 animate-float"
            />
          </div>

          {/* Lado Derecho: Información */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded-lg uppercase tracking-wider">
                  {fruit.category}
                </span>
                {fruit.quantity < 5 && (
                  <span className="px-3 py-1 bg-red-100 text-xs font-bold text-red-600 rounded-lg uppercase tracking-wider">
                    ¡Poco Stock!
                  </span>
                )}
              </div>

              <h2 className="font-bubblegum text-4xl text-fruit-wood mb-4">
                {fruit.name}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {fruit.description}
              </p>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-fruit-base p-4 rounded-2xl border border-stone-100">
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Precio
                  </p>
                  <p className="font-boogaloo text-2xl text-fruit-green-dark">
                    ${fruit.price.toFixed(2)}
                  </p>
                </div>
                <div className="bg-fruit-base p-4 rounded-2xl border border-stone-100">
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Stock
                  </p>
                  <p className="font-boogaloo text-2xl text-fruit-wood">
                    {fruit.quantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  playSound("ui-click");
                  onEdit(fruit);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-fruit-orange text-white font-bold py-3 rounded-xl hover:bg-orange-500 transition-colors"
              >
                <Edit2 size={18} /> Editar
              </button>
              <button
                onClick={() => {
                  playSound("ui-click");
                  onDelete(fruit.id);
                }}
                className="flex items-center justify-center p-3 text-fruit-red bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body // <--- 3. AQUÍ ESPECIFICAMOS DÓNDE SE INYECTA (Al final del body)
  );
};