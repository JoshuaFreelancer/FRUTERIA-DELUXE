import { NavLink, useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBasket, LogOut } from "lucide-react";
import { useSound } from "../hooks/useSound";

const defaultAvatar = "/assets/images/Default_avatar.png";

export const MainLayout = ({ children }) => {
  const playSound = useSound();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user_session")) || {
    name: "Invitado",
    email: "user@fruteria.com",
  };

  const handleLogout = () => {
    playSound("ui-click");
    localStorage.removeItem("user_session");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen w-full bg-fruit-base font-bubblegum overflow-hidden flex flex-col">
      {/* 1. ÁREA DE CONTENIDO */}
      <main className="w-full h-full overflow-y-auto p-8 pb-32 relative scroll-smooth z-0">
        {/* Decoración de fondo */}
        <div className="fixed top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -z-10 pointer-events-none"></div>

        {children}
      </main>

      {/* 2. DOCKER FLOTANTE */}
      {/* CAMBIO CLAVE: z-30 (antes z-50). Así los Modales (z-50) se pondrán encima. */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-scaleIn w-max max-w-[95vw]">
        <div className="flex items-center gap-1 px-4 py-2 bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-full transition-all hover:scale-[1.01]">
          {/* LOGO INTEGRADO */}
          <Link
            to="/"
            onClick={() => playSound("ui-click")}
            className="px-3 flex flex-col items-start justify-center leading-none group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            <span className="text-[10px] text-fruit-wood font-bold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
              Frutería
            </span>
            <span className="text-xl text-fruit-green font-bubblegum drop-shadow-sm">
              Deluxe
            </span>
          </Link>

          <div className="w-[1px] h-8 bg-gray-200 mx-2"></div>

          {/* LINKS */}
          <NavLink
            to="/"
            onClick={() => playSound("click")}
            className={({ isActive }) =>
              `group relative p-3 rounded-full transition-all duration-300 ease-out hover:-translate-y-2
               ${isActive ? "bg-fruit-green text-white shadow-lg shadow-green-200" : "text-gray-400 hover:text-fruit-green hover:bg-green-50"}`
            }
          >
            <LayoutDashboard size={24} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fruit-wood text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/inventory"
            onClick={() => playSound("click")}
            className={({ isActive }) =>
              `group relative p-3 rounded-full transition-all duration-300 ease-out hover:-translate-y-2
               ${isActive ? "bg-fruit-orange text-white shadow-lg shadow-orange-200" : "text-gray-400 hover:text-fruit-orange hover:bg-orange-50"}`
            }
          >
            <ShoppingBasket size={24} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fruit-wood text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Inventario
            </span>
          </NavLink>

          <div className="w-[1px] h-8 bg-gray-200 mx-2"></div>

          {/* PERFIL */}
          <div className="group relative cursor-default transition-transform hover:-translate-y-2 pl-1">
            <div className="relative">
              <img
                src={defaultAvatar}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-fruit-wood text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap flex flex-col items-center">
              <span>{user.name}</span>
              <span className="text-[10px] text-gray-400 font-normal">
                Gerente
              </span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-100"></div>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="group relative p-3 rounded-full text-gray-400 hover:bg-red-50 hover:text-fruit-red transition-all duration-300 hover:-translate-y-2"
          >
            <LogOut size={22} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fruit-red text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Salir
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
