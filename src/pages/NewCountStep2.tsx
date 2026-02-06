import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { BarChart, EyeOff, Info, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewCountStep2() {
  const navigate = useNavigate();

  return (
    <MainLayout title="Configuração de Contagem" showBack>
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-10 w-full">
          <div className="flex items-center w-full max-w-md">
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-green-500 text-white shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <span className="absolute top-10 text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wide whitespace-nowrap">Estoque</span>
            </div>

            <div className="flex-1 h-[2px] bg-green-500 mx-2"></div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-white shadow-md ring-4 ring-red-50 dark:ring-red-900/20">
                2
              </div>
              <span className="absolute top-10 text-[10px] font-bold text-primary uppercase tracking-wide whitespace-nowrap">Relatórios</span>
            </div>

            <div className="flex-1 h-[2px] bg-gray-200 dark:bg-gray-800 mx-2"></div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-100 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700">
                3
              </div>
              <span className="absolute top-10 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wide whitespace-nowrap">Início</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Deseja importar o saldo sistêmico?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Escolha o método de conferência da carga.</p>
        </div>

        <div className="flex flex-col gap-4 mb-8 w-full">
          {/* Option 1: Import */}
          <label className="cursor-pointer group relative">
            <input type="radio" name="report_type" defaultChecked className="peer sr-only" />
            <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-2xl border-2 border-primary shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 text-primary flex items-center justify-center flex-shrink-0">
                <BarChart className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Sim, importar</h3>
                <p className="text-primary font-semibold text-sm mb-1">(Contagem Comparativa)</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  O sistema apresenta o saldo esperado para conferência imediata.
                </p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center bg-primary">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
            </div>
          </label>

          {/* Option 2: Blind */}
          <label className="cursor-pointer group relative">
            <input type="radio" name="report_type" className="peer sr-only" />
            <div className="bg-white dark:bg-[#2d1a1a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4 transition-all hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md peer-checked:border-primary peer-checked:bg-red-50 dark:peer-checked:bg-red-900/10">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <EyeOff className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Não, iniciar em branco</h3>
                <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm mb-1">(Contagem Cega)</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Nenhum dado de saldo será exibido. Maior rigor na conferência.
                </p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-primary transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0"></div>
              </div>
            </div>
          </label>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex gap-3 items-start mb-8 w-full">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            A importação do saldo sistêmico facilita a <span className="font-bold">identificação de divergências em tempo real</span>, permitindo recontagens imediatas se necessário.
          </p>
        </div>

        <Button
          size="xl"
          className="w-full"
          icon={<ArrowRight className="w-6 h-6" />}
          onClick={() => navigate('/new-count/step-3')}
        >
          PRÓXIMO PASSO
        </Button>

        <div className="text-center pb-4 mt-8">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Operador</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Fernanda Rodrigues Da Silva Araujo</p>
        </div>
      </div>
    </MainLayout>
  );
}
