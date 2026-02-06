import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Warehouse, Truck, RotateCcw, ChevronRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Stock {
  id: string;
  name: string;
  description: string;
  type: string;
}

export default function NewCountStep1() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

  async function fetchStocks() {
    setLoading(true);
    const { data, error } = await supabase.from('stocks').select('*');
    if (error) {
      console.error('Error fetching stocks:', error);
    } else {
      setStocks(data || []);
      if (data && data.length > 0) setSelectedStock(data[0].id);
    }
    setLoading(false);
  }

  const handleNext = () => {
    if (selectedStock) {
      localStorage.setItem('logicheck_new_stock_id', selectedStock);
      navigate('/new-count/step-2');
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'principal': return Warehouse;
      case 'advanced': return Truck;
      case 'return': return RotateCcw;
      default: return Warehouse;
    }
  };

  const getColor = (type: string) => {
    switch(type) {
      case 'principal': return 'text-primary';
      case 'advanced': return 'text-blue-600';
      case 'return': return 'text-amber-600';
      default: return 'text-primary';
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
      case 'principal': return 'bg-red-50 dark:bg-red-900/20';
      case 'advanced': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'return': return 'bg-amber-50 dark:bg-amber-900/20';
      default: return 'bg-red-50 dark:bg-red-900/20';
    }
  };

  return (
    <MainLayout title="Configuração de Nova Contagem" showBack>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Stepper */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -z-10 -translate-y-1/2"></div>

            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-4 z-10">
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-white dark:bg-[#2d1a1a] text-primary flex items-center justify-center font-bold shadow-sm">
                1
              </div>
              <span className="text-sm font-bold text-primary whitespace-nowrap">Estoque</span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-4 z-10">
              <div className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2d1a1a] text-gray-400 flex items-center justify-center font-bold">
                2
              </div>
              <span className="text-sm font-medium text-gray-400 whitespace-nowrap">Relatórios</span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-4 z-10">
              <div className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2d1a1a] text-gray-400 flex items-center justify-center font-bold">
                3
              </div>
              <span className="text-sm font-medium text-gray-400 whitespace-nowrap">Início</span>
            </div>
          </div>
        </div>

        {/* Stock Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {loading ? (
            <div className="col-span-3 text-center p-10 text-gray-500">Carregando estoques...</div>
          ) : stocks.map((stock) => {
            const Icon = getIcon(stock.type);
            return (
              <Card
                key={stock.id}
                hoverable
                active={selectedStock === stock.id}
                onClick={() => setSelectedStock(stock.id)}
                className="p-8 flex flex-col h-full group"
              >
                <div className={`w-14 h-14 rounded-2xl ${getBgColor(stock.type)} flex items-center justify-center mb-6 ${getColor(stock.type)}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{stock.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {stock.description}
                </p>
                <div className="flex items-center text-primary font-bold text-sm tracking-wide mt-auto group-hover:gap-2 transition-all">
                  SELECIONAR <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="w-full max-w-lg mb-8">
          <Button
            size="xl"
            className="w-full"
            icon={<CheckCircle className="w-6 h-6" />}
            onClick={handleNext}
            disabled={!selectedStock}
          >
            CONFIGURAR RELATÓRIO
          </Button>
        </div>

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Operador: <span className="font-semibold text-gray-700 dark:text-gray-200">Fernanda Rodrigues Da Silva Araujo</span>
        </div>
      </div>
    </MainLayout>
  );
}
