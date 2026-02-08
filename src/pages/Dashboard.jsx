import { DollarSign, Package, AlertTriangle, TrendingUp } from "lucide-react";
import { HistoryPanel } from "../components/HistoryPanel";

export const Dashboard = ({ fruits, history }) => {
  // <--- Recibimos history
  // ... (Tus cálculos de totalStock, totalValue, lowStockFruits siguen igual)
  const totalStock = fruits.reduce((acc, f) => acc + f.quantity, 0);
  const totalValue = fruits.reduce((acc, f) => acc + f.quantity * f.price, 0);
  const lowStockFruits = fruits.filter((f) => f.quantity < 10);

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <header>
        <h2 className="text-4xl text-fruit-wood mb-2">Resumen del Negocio</h2>
        <p className="text-gray-500 font-sans">Bienvenido de nuevo, Jesús.</p>
      </header>

      {/* Grid Principal: Métricas arriba */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ... (Tus 3 tarjetas de métricas que ya tenías: Valor, Stock, Alertas) ... */}
        {/* Tarjeta 1: Valor Total */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-green-100 text-fruit-green-dark rounded-2xl">
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">
              Valor del Inventario
            </p>
            <p className="text-3xl font-boogaloo text-fruit-wood">
              ${totalValue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tarjeta 2: Stock Total */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
            <Package size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">
              Frutas en Stock
            </p>
            <p className="text-3xl font-boogaloo text-fruit-wood">
              {totalStock} Unid.
            </p>
          </div>
        </div>

        {/* Tarjeta 3: Alertas */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-red-100 text-fruit-red rounded-2xl">
            <AlertTriangle size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">
              Stock Bajo
            </p>
            <p className="text-3xl font-boogaloo text-fruit-wood">
              {lowStockFruits.length} Alertas
            </p>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Dividida en Alertas (Izq) e Historial (Der) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Alertas de Stock (Ocupa 2 espacios) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[400px]">
            <h3 className="text-2xl text-fruit-wood mb-6 flex items-center gap-2">
              <TrendingUp className="text-fruit-orange" />
              Necesitan Reposición
            </h3>

            {lowStockFruits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lowStockFruits.map((fruit) => (
                  <div
                    key={fruit.id}
                    className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={fruit.image}
                      alt={fruit.name}
                      className="w-14 h-14 object-contain"
                    />
                    <div>
                      <p className="font-bold text-fruit-wood text-lg">
                        {fruit.name}
                      </p>
                      <p className="text-sm text-fruit-red font-bold flex items-center gap-1">
                        <AlertTriangle size={14} /> Solo quedan {fruit.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center opacity-60">
                <Package size={64} className="text-green-300 mb-4" />
                <p className="text-xl font-boogaloo text-fruit-green">
                  ¡Todo está bien surtido!
                </p>
                <p className="text-gray-400">
                  No hay alertas de stock bajo por ahora.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Historial (Ocupa 1 espacio) */}
        <div className="lg:col-span-1 h-[500px]">
          <HistoryPanel history={history} />
        </div>
      </div>
    </div>
  );
};
