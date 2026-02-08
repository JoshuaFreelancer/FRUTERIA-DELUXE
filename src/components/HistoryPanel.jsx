import { History, PlusCircle, Edit3, Trash2, Clock } from 'lucide-react';

export const HistoryPanel = ({ history }) => {
  
  // Función auxiliar para decidir qué icono y color mostrar según la acción
  const getActionStyle = (text) => {
    if (text.includes('Agregó') || text.includes('creada')) {
      return { icon: <PlusCircle size={18} />, color: 'bg-green-100 text-green-700', border: 'border-green-200' };
    }
    if (text.includes('Editó') || text.includes('modificada')) {
      return { icon: <Edit3 size={18} />, color: 'bg-orange-100 text-orange-700', border: 'border-orange-200' };
    }
    if (text.includes('Eliminó')) {
      return { icon: <Trash2 size={18} />, color: 'bg-red-100 text-red-700', border: 'border-red-200' };
    }
    return { icon: <Clock size={18} />, color: 'bg-gray-100 text-gray-700', border: 'border-gray-200' };
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-fruit-wood text-white rounded-xl">
          <History size={24} />
        </div>
        <h2 className="text-2xl text-fruit-wood font-bubblegum tracking-wide">
          Historial de Movimientos
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {history.length > 0 ? (
          history.map((record, index) => {
            const style = getActionStyle(record.action);
            return (
              <div 
                key={index} 
                className={`flex gap-4 p-4 rounded-2xl border ${style.border} bg-fruit-base hover:shadow-md transition-shadow`}
              >
                {/* Icono de la acción */}
                <div className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full ${style.color}`}>
                  {style.icon}
                </div>
                
                {/* Texto y Fecha */}
                <div className="flex-1">
                  <p className="text-fruit-text font-medium text-sm leading-snug">
                    {record.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-bold">
                    {record.date}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 opacity-50">
            <Clock size={48} className="mx-auto mb-2 text-gray-300" />
            <p className="text-gray-400">Aún no hay movimientos registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};