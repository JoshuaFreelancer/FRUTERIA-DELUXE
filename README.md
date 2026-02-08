# 🍎 Frutería Deluxe 2.0

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73C9D?style=for-the-badge&logo=vite&logoColor=white)

> **Gestión de inventario inteligente con una experiencia de usuario inmersiva.**

**Frutería Deluxe 2.0** es una aplicación web moderna diseñada para administrar el stock de productos frescos. A diferencia de los paneles de administración tradicionales, este proyecto se enfoca en una **UX/UI avanzada** (Diseño Isométrico + Glassmorphism), retroalimentación auditiva y una arquitectura de componentes sólida.

---

## ✨ Características Principales

### 🎨 Experiencia de Usuario (UX/UI)
* **Diseño Isométrico:** Tarjetas de productos con efecto 2.5D y sombras dinámicas.
* **Navegación "Dock" Flotante:** Menú inferior estilo macOS con animaciones de escalado y tooltips inteligentes.
* **Login Cinematográfico:** Pantalla de autenticación con video de fondo en loop y formulario con efecto de cristal (Glassmorphism).
* **Feedback Auditivo:** Sistema de sonidos (`useSound`) para acciones como clicks, éxito, errores y borrado.

### 🛠️ Funcionalidades Técnicas
* **Gestión de Inventario (CRUD):** Crear, Leer, Actualizar y Eliminar productos con validaciones en tiempo real.
* **Persistencia de Datos:** Hook personalizado `useLocalStorage` para mantener el estado del inventario e historial entre sesiones.
* **Historial de Cambios:** Registro de auditoría que traza cada acción realizada en el sistema.
* **Rutas Protegidas:** Sistema de autenticación simulado que restringe el acceso al Dashboard mediante `PrivateRoute`.
* **Modales con React Portals:** Implementación avanzada de modales usando `createPortal` para solucionar conflictos de *Stacking Context* (z-index).

---

## 🚀 Tecnologías Utilizadas

* **Core:** React 18 + Vite
* **Estilos:** Tailwind CSS (Animaciones personalizadas `shake`, `fadeIn`, `float`)
* **Enrutamiento:** React Router DOM v6
* **Iconos:** Lucide React
* **Utilidades:** UUID (Generación de IDs únicos)

---

## 📂 Estructura del Proyecto

La arquitectura sigue patrones de diseño escalables:

```bash
src/
├── assets/          # Recursos estáticos (Videos, Sonidos, Imágenes)
├── components/      # Componentes UI reutilizables (FruitCard, Modal, Forms)
├── data/            # Datos iniciales (Seed data)
├── hooks/           # Custom Hooks (Lógica reutilizable)
│   ├── useLocalStorage.js  # Persistencia de estado
│   └── useSound.js         # Motor de audio
├── layouts/         # Plantillas de diseño (MainLayout con Dock)
├── pages/           # Vistas principales (Dashboard, Inventory, Auth)
└── App.jsx          # Configuración de Rutas y Estado Global
