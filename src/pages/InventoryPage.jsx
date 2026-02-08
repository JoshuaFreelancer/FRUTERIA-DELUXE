import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { FruitCard } from "../components/FruitCard";
import { FruitModal } from "../components/FruitModal";
import { FruitForm } from "../components/FruitForm";
import { useSound } from "../hooks/useSound"; // <--- Importamos el hook

export const InventoryPage = ({
  fruits,
  onAddFruit,
  onEditFruit,
  onDeleteFruit,
}) => {
  const playSound = useSound(); // <--- Inicializamos

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [fruitToEdit, setFruitToEdit] = useState(null);

  const categories = [
    "Todos",
    "Tropical",
    "Bosque",
    "Cítrico",
    "Hueso",
    "Exótico",
    "Melones",
  ];

  const filteredFruits = fruits.filter((fruit) => {
    const matchesSearch = fruit.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || fruit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (fruit) => {
    setFruitToEdit(fruit);
    setSelectedFruit(null);
    playSound("pop"); // <--- Sonido al abrir formulario de edición
    setIsFormOpen(true);
  };

  const handleFormSubmit = (fruitData) => {
    if (fruitToEdit) {
      onEditFruit(fruitData);
    } else {
      onAddFruit(fruitData);
    }
    setIsFormOpen(false);
    setFruitToEdit(null);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header con Buscador y Botón Crear */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-4xl text-fruit-wood">Inventario</h2>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar fruta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-fruit-green font-sans"
            />
          </div>

          {/* BOTÓN NUEVA FRUTA CON SONIDO POP */}
          <button
            onClick={() => {
              playSound("pop"); // <--- ¡AQUÍ ESTÁ EL POP!
              setFruitToEdit(null);
              setIsFormOpen(true);
            }}
            className="bg-fruit-green text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-fruit-green-dark transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nueva Fruta</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              // Opcional: playSound('click') aquí si quisieras sonido en filtros
              setSelectedCategory(cat);
            }}
            className={`
              px-5 py-2 rounded-full font-bold whitespace-nowrap transition-all border
              ${
                selectedCategory === cat
                  ? "bg-fruit-wood text-white border-fruit-wood"
                  : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Frutas */}
      {filteredFruits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFruits.map((fruit) => (
            <FruitCard
              key={fruit.id}
              fruit={fruit}
              onClickDetails={(f) => {
                playSound("pop"); // <--- También ponemos pop al abrir detalles
                setSelectedFruit(f);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-50">
          <p className="text-2xl font-bubblegum">No encontramos esa fruta :(</p>
        </div>
      )}

      {/* Modales */}
      {selectedFruit && (
        <FruitModal
          fruit={selectedFruit}
          onClose={() => setSelectedFruit(null)}
          onEdit={handleEditClick}
          onDelete={(id) => {
            onDeleteFruit(id);
            setSelectedFruit(null);
          }}
        />
      )}

      {isFormOpen && (
        <FruitForm
          fruitToEdit={fruitToEdit}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};
