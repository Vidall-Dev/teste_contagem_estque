import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import { Check, Warehouse, FileText, Play, Smartphone, Laptop, Headphones, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewCountStep3() {
  const navigate = useNavigate();

  const recentProducts = [
    { name: 'Iphone 15 Pro Max 256GB Titanium', sku: 'APPLE-IPH-15PM-256', time: 'Há 5 min', qty: '12 un' },
    { name: 'MacBook Air M2 13" 8GB/256GB', sku: 'APPLE-MAC-AIR-M2', time: 'Há 12 min', qty: '05 un' },
    { name: 'AirPods Pro (2nd Generation)', sku: 'APPLE-AIR-PRO-2', time: 'Há 1h', qty: '42 un' },
  ];

  return (
    <MainLayout title="Confirmação e Início" showBack>
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Stepper */}
        <div className="flex items-center justify-center w-full mb-10 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-green-600 dark:text-green-400">Estoque</span>
          </div>
          <div className="w-12 h-0.5 bg-green-500 mx-3"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-green-600 dark:text-green-400">Relatórios</span>
          </div>
          <div className="w-12 h-0.5 bg-primary mx-3"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-primary font-bold">Início</span>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="w-full mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Resumo das Seleções</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-primary flex items-center justify-center shrink-0">
                <Warehouse className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-0.5">Depósito Selecionado</span>
                <span className="block text-lg font-bold text-gray-900 dark:text-white">Depósito Principal</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-0.5">Tipo de Contagem</span>
                <span className="block text-lg font-bold text-gray-900 dark:text-white">Com Relatório Sistêmico</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="w-full mb-12">
          <button
            onClick={() => navigate('/inventory/execution')}
            className="w-full bg-primary hover:bg-red-700 text-white rounded-2xl py-6 px-4 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all group flex flex-col items-center justify-center gap-3"
          >
            <div className="w-10 h-10 bg-white rounded-full text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <span className="text-xl font-bold uppercase tracking-wide">Iniciar Inventário Agora</span>
          </button>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 px-8 leading-relaxed">
            Ao iniciar, o tempo de operação começará a ser contabilizado para o operador: <strong className="text-gray-700 dark:text-gray-300">Fernanda Rodrigues</strong>
          </p>
        </div>

        {/* Recent Products */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Últimos Produtos Contados</h3>
            <span className="text-xs text-gray-400 italic">Depósito Principal</span>
          </div>
          <div className="space-y-3">
            {recentProducts.map((product, idx) => (
              <div
                key={product.sku}
                className="bg-white dark:bg-[#2d1a1a] rounded-xl p-4 flex items-center gap-4 shadow-sm border border-transparent dark:border-gray-800"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                  {idx === 0 ? <Smartphone className="w-5 h-5" /> : idx === 1 ? <Laptop className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">{product.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">SKU: {product.sku}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-[10px] text-gray-400 mb-0.5">{product.time}</span>
                  <span className="block font-bold text-green-600 dark:text-green-400">{product.qty}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
              Ver histórico completo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
