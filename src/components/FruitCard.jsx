import { useState } from 'react';

export const FruitCard = ({ fruit, onClickDetails }) => {
  // Estado para manejar el hover del video (si decides implementarlo a futuro)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative group 
        ${fruit.bgColor} 
        rounded-3xl p-6 
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-xl
        border-2 border-white/50
        cursor-pointer
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Encabezado: Stock y Precio --- */}
      <div className="flex justify-between items-start mb-4">
        <span className={`
          text-xs font-bold px-3 py-1 rounded-full 
          ${fruit.quantity < 10 ? 'bg-fruit-red text-white animate-pulse' : 'bg-white text-fruit-text'}
        `}>
          {fruit.quantity} unid.
        </span>
        <span className="font-boogaloo text-xl text-fruit-wood">
          ${fruit.price.toFixed(2)}
        </span>
      </div>

      {/* --- Imagen Isométrica Flotante --- */}
      <div className="relative h-40 w-full flex items-center justify-center my-2 perspective-500">
        {/* Sombra dinámica del color de la fruta */}
        <div className={`
          absolute bottom-2 w-24 h-6 rounded-[100%] blur-md opacity-40 transition-opacity duration-300
          ${fruit.colorAccent.replace('shadow-', 'bg-')} // Truco: convertimos la clase shadow a bg
          group-hover:opacity-60 group-hover:scale-110
        `}></div>

        {/* Imagen con animación de flotar */}
        <img 
          src={fruit.image} 
          alt={fruit.name}
          className="w-32 h-32 object-contain drop-shadow-2xl animate-float z-10"
        />
      </div>

      {/* --- Info Principal --- */}
      <div className="text-center mt-4">
        <h3 className="font-bubblegum text-2xl text-fruit-wood leading-none mb-1">
          {fruit.name}
        </h3>
        <p className="text-sm text-gray-500 font-medium opacity-80">
          {fruit.category}
        </p>
      </div>

      {/* --- Botón de Acción (Solo aparece en Hover) --- */}
      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
        <button 
          onClick={() => onClickDetails(fruit)}
          className="w-full bg-fruit-wood text-fruit-base font-bold py-2 rounded-xl hover:bg-fruit-green hover:shadow-lg transition-colors font-bubblegum tracking-wide"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};