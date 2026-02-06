import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { QrCode, History, ListTodo, ChevronRight, Truck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Batch {
  id: string;
  dt_number: string;
  operator_name: string;
  started_at: string;
  status: string;
}

export default function Dashboard() {
  const [lastCounts, setLastCounts] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatches();
  }, []);

  async function fetchBatches() {
    setLoading(true);
    const { data, error } = await supabase
      .from('inventory_batches')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching batches:', error);
    } else {
      setLastCounts(data || []);
    }
    setLoading(false);
  }

  return (
    <MainLayout title="LogiCheck" subtitle="Gestão de Estoque">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div>
          <span className="text-gray-500 dark:text-gray-400 text-lg">Olá,</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            Fernanda Rodrigues Da Silva Araujo
          </h2>
        </div>

        <div className="bg-white dark:bg-[#2d1a1a] border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex items-center gap-4 shadow-soft min-w-[320px]">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
            <History className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Última Atividade</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {lastCounts.length > 0
                ? `DT ${lastCounts[0].dt_number} • ${new Date(lastCounts[0].started_at).toLocaleDateString('pt-BR')}`
                : 'Nenhuma atividade recente'}
            </div>
          </div>
        </div>
      </div>

      <Link to="/new-count/step-1">
        <div className="bg-white dark:bg-[#2d1a1a] border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-soft mb-12 group cursor-pointer hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300">
          <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/30 mb-8 group-hover:scale-110 group-active:scale-95 transition-transform duration-300 ease-out">
            <QrCode className="w-16 h-16" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Iniciar Nova Contagem</h3>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Escaneie o código ou insira o número da DT</p>
        </div>
      </Link>

      <div className="mb-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <ListTodo className="w-5 h-5 text-primary" />
            Últimas Contagens
          </h3>
          <a href="#" className="text-primary font-semibold text-sm hover:underline">Ver todas</a>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center p-10 text-gray-500">Carregando contagens...</div>
          ) : lastCounts.length === 0 ? (
            <div className="text-center p-10 text-gray-500">Nenhuma contagem encontrada.</div>
          ) : lastCounts.map((count) => (
            <Link
              to={`/inventory/execution?id=${count.id}`}
              key={count.id}
              className="bg-white dark:bg-[#2d1a1a] border border-gray-100 dark:border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-hover hover:border-primary/20 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Truck className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">DT {count.dt_number}</span>
                  <div className="hidden sm:flex gap-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      count.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {count.status === 'completed' ? 'Concluída' : 'Em Andamento'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {new Date(count.started_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                  Operador: {count.operator_name}
                </div>
              </div>

              <div className="hidden sm:block">
                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
