module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // -----------------------------------------------------------
    // REGLAS RELAJADAS PARA DESARROLLO FLUIDO
    // -----------------------------------------------------------

    // Permite exportar constantes junto con componentes sin llorar
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // Desactiva la validación de props (la más molesta en JS puro)
    "react/prop-types": "off",

    // Si declaras una variable y no la usas, solo te avisa (amarillo), no te da error (rojo)
    "no-unused-vars": "warn",

    // Permite escribir "Don't" en el HTML sin tener que escribir "Don&apos;t"
    "react/no-unescaped-entities": "off",

    // Permite usar target="_blank" sin el rel="noreferrer" (menos seguro, pero menos molesto en dev)
    "react/jsx-no-target-blank": "off",

    // Desactiva la regla de nombres de componentes en display (útil para arrow functions)
    "react/display-name": "off",

    // A veces el linter se queja de cosas de React en el scope, pero con Vite/React 17+ no hace falta
    "react/react-in-jsx-scope": "off",
  },
};
