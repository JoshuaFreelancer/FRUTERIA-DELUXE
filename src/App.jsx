import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { InventoryPage } from "./pages/InventoryPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSound } from "./hooks/useSound"; 
import { initialFruits } from "./data/initialFruits";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

// --- COMPONENTE DE PROTECCIÓN DE RUTAS ---
const PrivateRoute = ({ children }) => {
  // Verificamos si existe la sesión en localStorage
  const isAuthenticated = localStorage.getItem('user_session');
  
  // Si no está autenticado, lo mandamos al Login, si sí, mostramos el contenido
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  // Inicializamos el sistema de sonido
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

  // --- Lógica CRUD ---

  const addFruit = (newFruitData) => {
    const newFruit = { ...newFruitData, id: uuidv4() };
    setFruits([...fruits, newFruit]);
    logAction(`Agregó la fruta "${newFruit.name}" al inventario.`);
    playSound("success");
  };

  const editFruit = (updatedFruit) => {
    setFruits(fruits.map((f) => (f.id === updatedFruit.id ? updatedFruit : f)));
    logAction(`Editó los detalles de "${updatedFruit.name}".`);
    playSound("success");
  };

  const deleteFruit = (id) => {
    const fruitToDelete = fruits.find((f) => f.id === id);
    if (fruitToDelete && window.confirm(`¿Eliminar ${fruitToDelete.name}?`)) {
      setFruits(fruits.filter((f) => f.id !== id));
      logAction(`Eliminó la fruta "${fruitToDelete.name}" del sistema.`);
      playSound("delete");
    }
  };

  return (
    <Routes>
      {/* 1. Ruta Pública: Login (Sin MainLayout) */}
      <Route path="/login" element={<AuthPage />} />

      {/* 2. Rutas Privadas: Protegidas (Con MainLayout) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard fruits={fruits} history={history} />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <MainLayout>
              <InventoryPage
                fruits={fruits}
                onAddFruit={addFruit}
                onEditFruit={editFruit}
                onDeleteFruit={deleteFruit}
              />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* 3. Comodín: Cualquier otra ruta redirige al login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;