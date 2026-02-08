import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, ArrowRight } from "lucide-react";
import { useSound } from "../../hooks/useSound";

// RUTAS OPTIMIZADAS (Sin imports relativos largos)

const bgVideo = "/assets/videos/market-loop.mp4";
const bgPoster = "/assets/videos/market-poster.jpg"; // Opcional: crea esta imagen para carga instantánea

export const AuthPage = () => {
  const navigate = useNavigate();
  const playSound = useSound();

  // Estados

  const [isRegistering, setIsRegistering] = useState(false);

  const [isShake, setIsShake] = useState(false); // Para la animación de error

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica

    if (!formData.email || !formData.password) {
      triggerError();
      return;
    }

    if (isRegistering && !formData.name) {
      triggerError();
      return;
    }

    // --- Login Simulado ---

    localStorage.setItem(
      "user_session",

      JSON.stringify({
        name: formData.name || "Admin",
        email: formData.email,
      }),
    );

    playSound("success");
    navigate("/");
  };

  // Función para vibrar y sonar error

  const triggerError = () => {
    playSound("error");
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-bubblegum bg-fruit-wood">
      {/* 1. VIDEO DE FONDO (Con estilo Mix-Blend-Multiply restaurado) */}

      <div className="absolute inset-0 z-0">
        <video
          src={bgVideo}
          poster={bgPoster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90" // Opacidad alta para que se vea bien el video
        />

        {/* CAPA OSCURA RESTAURADA: Esto es lo que te gustaba */}

        <div className="absolute inset-0 bg-fruit-wood/50 mix-blend-multiply" />
      </div>

      {/* 2. TARJETA DE CRISTAL */}

      <div
        className={`
        relative z-10 w-full max-w-md p-8 
        bg-white/10 backdrop-blur-md border border-white/20 
        rounded-[2.5rem] shadow-2xl 
        transition-all duration-300
        ${isShake ? "animate-shake" : "animate-scaleIn"}

      `}
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl text-white mb-2 drop-shadow-lg tracking-wide">
            Frutería <span className="text-fruit-green-light">Deluxe</span>
          </h1>

          <p className="text-gray-200 font-sans text-sm font-medium tracking-wider">
            {isRegistering
              ? "Unete a nuestra gestión de inventario"
              : "Bienvenido de nuevo"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <div className="relative group animate-fadeIn">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-fruit-green-light transition-colors"
                size={20}
              />

              <input
                type="text"
                name="name"
                placeholder="Tu Nombre"
                onChange={handleChange}
                className="w-full bg-black/20 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-fruit-green-light focus:bg-black/40 transition-all"
              />
            </div>
          )}

          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-fruit-green-light transition-colors"
              size={20}
            />

            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              onChange={handleChange}
              className="w-full bg-black/20 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-fruit-green-light focus:bg-black/40 transition-all"
            />
          </div>

          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-fruit-green-light transition-colors"
              size={20}
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full bg-black/20 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-fruit-green-light focus:bg-black/40 transition-all"
            />
          </div>

          <button
            type="submit"
            onClick={() => playSound("ui-click")}
            className="w-full bg-fruit-green hover:bg-fruit-green-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {isRegistering ? "Crear Cuenta" : "Ingresar al Sistema"}
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Toggle Login/Register */}

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              playSound("pop");
              setIsRegistering(!isRegistering);
              setIsShake(false);
            }}
            className="text-white/70 hover:text-white text-sm font-sans hover:underline decoration-wavy underline-offset-4 transition-colors"
          >
            {isRegistering
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate aquí"}
          </button>
        </div>
      </div>

      {/* Footer Decorativo */}

      <div className="absolute bottom-4 text-white/40 text-xs font-sans uppercase">
        © 2026 Frutería Deluxe System v2.0
      </div>
    </div>
  );
};
