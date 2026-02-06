import { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { Search, QrCode, Filter, Minus, Plus, ChevronDown, CheckCircle, CloudOff, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InventoryExecution() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const products = [
    {
      id: 1,
      sku: '10293',
      name: 'CERV ITA PILS 350ML - LATA',
      desc: 'CX C/ 12 UN • Estoque Teórico: 1450',
      status: 'Em Andamento',
      counts: { pallets: 2, lastros: 4, pacs: 0, units: 5 },
      total: 385
    },
    {
      id: 2,
      sku: '88210',
      name: 'REFRIG COCA COLA 2L',
      desc: 'Total: 890 un',
      status: 'Contado',
      counts: { pallets: 0, lastros: 0, pacs: 0, units: 0 },
      total: 890
    },
    {
      id: 3,
      sku: '32911',
      name: 'AGUA MINERAL 500ML S/ GAS',
      desc: 'FARDO C/ 12',
      status: 'Pendente',
      counts: { pallets: 0, lastros: 0, pacs: 0, units: 0 },
      total: 0
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-32 transition-colors duration-200">
      <Header title="Contagem #1234" subtitle="Setor de Bebidas • 12 Out 2023" showBack />

      {/* Status Bar (Screen 2 style) */}
      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-1.5 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Offline</span>
        </div>
        <div className="flex items-center gap-2">
          <EyeOff className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Contagem Cega</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Area */}
        <div className="sticky top-20 z-20 mb-6 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2">
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input
                className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#2d1a1a] border-transparent focus:border-primary/30 rounded-xl shadow-soft focus:ring-4 focus:ring-primary/10 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all"
                placeholder="Buscar produto por nome, código ou EAN..."
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-primary transition-colors">
                  <QrCode className="w-5 h-5" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-primary transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {['Todos', 'Pendentes (32)', 'Contados (13)', 'Divergentes (2)'].map((filter, i) => (
              <button
                key={i}
                className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  i === 0
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white dark:bg-[#2d1a1a] border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-[#2d1a1a] rounded-xl overflow-hidden transition-all duration-300 border ${
                expandedId === product.id
                  ? 'shadow-hover border-primary/20 ring-2 ring-primary/5'
                  : 'shadow-soft border-transparent hover:border-gray-200 dark:hover:border-gray-800'
              }`}
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase tracking-wider">
                        SKU: {product.sku}
                      </span>
                      {product.status === 'Em Andamento' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 uppercase tracking-wider">
                          Em Andamento
                        </span>
                      )}
                      {product.status === 'Contado' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Contado
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base font-bold transition-opacity ${product.status === 'Contado' ? 'text-gray-900 dark:text-white opacity-75' : 'text-gray-900 dark:text-white'}`}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.desc}</p>
                  </div>
                  <div className={`h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 transition-transform duration-300 ${expandedId === product.id ? 'rotate-180 bg-primary/10 text-primary' : ''}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {expandedId === product.id && (
                <div className="p-5 bg-gray-50/50 dark:bg-black/20 border-t border-dashed border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Pallets', 'Lastros', 'Pacs', 'Unidades'].map((label) => (
                      <div key={label} className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">{label}</label>
                        <div className="flex items-center bg-white dark:bg-[#1a0c0e] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden h-12">
                          <button className="w-12 h-full flex items-center justify-center text-primary hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <Minus className="w-5 h-5" />
                          </button>
                          <input
                            type="number"
                            className="flex-1 w-full h-full text-center border-none bg-transparent focus:ring-0 text-gray-900 dark:text-white font-bold text-lg p-0"
                            defaultValue={product.counts[label.toLowerCase() as keyof typeof product.counts]}
                          />
                          <button className="w-12 h-full flex items-center justify-center text-primary hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Total calculado: <strong className="text-gray-900 dark:text-white ml-1">{product.total} un</strong>
                    </span>
                    <button className="text-xs font-bold text-primary hover:text-red-700 underline underline-offset-2">
                      Limpar dados
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Floating Footer Action */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        <div className="bg-orange-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold shadow-lg">
          <CloudOff className="w-4 h-4" />
          <span>MODO OFFLINE: DADOS SALVOS LOCALMENTE</span>
        </div>
        <div className="p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <Button
              size="xl"
              className="w-full shadow-2xl"
              icon={<CheckCircle className="w-6 h-6" />}
              onClick={() => navigate('/inventory/finalization')}
            >
              Finalizar Contagem (45)
            </Button>
          </div>
        </div>
        <div className="h-1 bg-gray-200 dark:bg-gray-800">
          <div className="h-full bg-primary w-[45%] transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
}
