import Button from '../components/Button';
import Card from '../components/Card';
import { CheckCircle2, Clock, Package, CloudCheck, FileText, User, Calendar, MapPin, Share, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InventoryFinalization() {
  const navigate = useNavigate();

  const details = [
    { label: 'Documento de Transporte (DT)', value: '6000804863', icon: FileText },
    { label: 'Operador', value: 'Fernanda Rodrigues Da Silva Araujo', icon: User },
    { label: 'Data e Hora de Fechamento', value: '03/02/2026 • 15:30', icon: Calendar },
    { label: 'Localização', value: 'Docas - Setor Norte', icon: MapPin },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-200">
      <nav className="bg-white dark:bg-[#1a0c0e] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">LogiCheck</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Contagem Finalizada!</h2>
          <p className="text-gray-500 dark:text-gray-400">O lote foi processado e está pronto para exportação.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
          <Card className="flex flex-col items-center text-center py-6 px-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tempo Total</span>
            <span className="text-xl font-bold mt-1 text-gray-900 dark:text-white">00:42:15</span>
          </Card>

          <Card className="flex flex-col items-center text-center py-6 px-4">
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3 text-primary">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Itens Contados</span>
            <span className="text-xl font-bold mt-1 text-gray-900 dark:text-white">1,248</span>
          </Card>

          <Card className="flex flex-col items-center text-center py-6 px-4">
            <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3 text-green-600 dark:text-green-400">
              <CloudCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Sincronização</span>
            <span className="text-xl font-bold mt-1 text-green-600 dark:text-green-400">Concluída</span>
          </Card>
        </div>

        <Card className="w-full mb-12">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="w-5 h-5 text-gray-400" />
            Detalhes do Lote
          </h3>
          <div className="space-y-1">
            {details.map((detail, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center py-3 ${idx !== details.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
              >
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2 text-sm">
                  <detail.icon className="w-4 h-4 text-gray-400" />
                  {detail.label}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{detail.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            icon={<Share className="w-5 h-5" />}
          >
            Exportar Agora
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            icon={<Home className="w-5 h-5" />}
            onClick={() => navigate('/')}
          >
            Voltar ao Início
          </Button>
        </div>
      </main>
    </div>
  );
}
