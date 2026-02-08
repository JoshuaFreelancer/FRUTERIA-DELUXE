import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingBasket, LogOut } from "lucide-react";
import { useSound } from "../hooks/useSound";

export const MainLayout = ({ children }) => {
  const playSound = useSound(); // <--- Inicializar

  return (
    <div className="flex h-screen bg-fruit-base font-bubblegum overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-2xl z-20">
        <div className="p-8">
          <h1 className="text-3xl text-fruit-wood leading-none">
            Frutería <br />
            <span className="text-fruit-green text-4xl">Deluxe</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => playSound("click")} // <--- CLICK AQUÍ
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-fruit-green text-white shadow-lg shadow-green-200" : "text-gray-400 hover:bg-gray-50"}`
            }
          >
            <LayoutDashboard size={22} />
            <span className="text-lg tracking-wide">Dashboard</span>
          </NavLink>

          <NavLink
            to="/inventory"
            onClick={() => playSound("click")} // <--- CLICK AQUÍ
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-fruit-orange text-white shadow-lg shadow-orange-200" : "text-gray-400 hover:bg-gray-50"}`
            }
          >
            <ShoppingBasket size={22} />
            <span className="text-lg tracking-wide">Inventario</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => playSound("click")} // <--- CLICK AQUÍ TAMBIÉN
            className="flex items-center gap-3 px-4 py-3 text-fruit-red hover:bg-red-50 w-full rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 pointer-events-none"></div>

        {children}
      </main>
    </div>
  );
};
