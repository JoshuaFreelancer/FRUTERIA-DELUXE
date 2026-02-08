import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { InventoryPage } from "./pages/InventoryPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSound } from "./hooks/useSound"; // <--- 1. Importamos el hook
import { initialFruits } from "./data/initialFruits";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  // 2. Inicializamos el sistema de sonido
  const playSound = useSound();

  // Estado de Frutas
  const [fruits, setFruits] = useLocalStorage(
    "fruteria-deluxe-v2",
    initialFruits,
  );

  // Estado de Historial
  const [history, setHistory] = useLocalStorage("fruteria-history-v2", []);

  // --- Función auxiliar para registrar acciones ---
  const logAction = (message) => {
    const newRecord = {
      action: message,
      date: new Date().toLocaleString("es-VE", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setHistory([newRecord, ...history]);
  };

  // --- Lógica CRUD mejorada con Logs y SONIDOS ---

  const addFruit = (newFruitData) => {
    const newFruit = { ...newFruitData, id: uuidv4() };
    setFruits([...fruits, newFruit]);
    logAction(`Agregó la fruta "${newFruit.name}" al inventario.`);

    playSound("success"); // <--- Sonido de éxito
  };

  const editFruit = (updatedFruit) => {
    setFruits(fruits.map((f) => (f.id === updatedFruit.id ? updatedFruit : f)));
    logAction(`Editó los detalles de "${updatedFruit.name}".`);

    playSound("success"); // <--- Sonido de éxito
  };

  const deleteFruit = (id) => {
    const fruitToDelete = fruits.find((f) => f.id === id);
    if (fruitToDelete && window.confirm(`¿Eliminar ${fruitToDelete.name}?`)) {
      setFruits(fruits.filter((f) => f.id !== id));
      logAction(`Eliminó la fruta "${fruitToDelete.name}" del sistema.`);

      playSound("delete"); // <--- Sonido de eliminación
    }
  };

  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={<Dashboard fruits={fruits} history={history} />}
        />
        <Route
          path="/inventory"
          element={
            <InventoryPage
              fruits={fruits}
              onAddFruit={addFruit}
              onEditFruit={editFruit}
              onDeleteFruit={deleteFruit}
            />
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
