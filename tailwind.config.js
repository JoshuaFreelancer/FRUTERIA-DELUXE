/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Tipografía lúdica que ya tenías
      fontFamily: {
        bubblegum: ["Bubblegum Sans", "sans-serif"],
        boogaloo: ["Boogaloo"],
      },
      // Nueva Paleta de Colores "Frutería Deluxe"
      colors: {
        "fruit-base": "#FFFDF7", // Fondo crema suave (mejor que blanco puro para comida)
        "fruit-card": "#FFFFFF", // Blanco puro para las tarjetas
        "fruit-green": {
          light: "#86EFAC", // Verde menta suave
          DEFAULT: "#22C55E", // Verde hoja fresco (Tailwind Green-500)
          dark: "#15803D", // Verde bosque para hovers
        },
        "fruit-orange": "#FB923C", // Naranja papaya para botones de acción/editar
        "fruit-red": "#F43F5E", // Rojo sandía para borrar/errores
        "fruit-yellow": "#FACC15", // Amarillo plátano para alertas/estrellas
        "fruit-text": "#334155", // Gris azulado oscuro para lectura (Slate-700)
        "fruit-wood": "#451a03", // Marrón café para títulos muy destacados
      },
      // Utilidades para la isometría y animaciones
      boxShadow: {
        isometric: "10px 10px 20px rgba(0, 0, 0, 0.1)",
        float:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};
