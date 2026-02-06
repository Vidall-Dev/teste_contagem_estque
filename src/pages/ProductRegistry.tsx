import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Info, Box, Package2, Save, QrCode, Barcode } from 'lucide-react';

export default function ProductRegistry() {
  return (
    <MainLayout
      title="Detalhes do Produto"
      subtitle="Edição de Ficha Técnica"
      showBack
    >
      <div className="max-w-5xl mx-auto space-y-6 pb-24">
        {/* Section 1: General Data */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5">
            <h3 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Dados Gerais
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
            <div className="md:col-span-12">
              <Input
                label="Nome do Produto"
                defaultValue="Refrigerante Cola Premium 2L"
                placeholder="Ex: Coca-Cola 2L Original"
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="SKU"
                defaultValue="REF-2024-001"
                icon={<QrCode className="w-5 h-5" />}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="EAN / GTIN"
                defaultValue="7894900011517"
                icon={<Barcode className="w-5 h-5" />}
              />
            </div>
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoria</label>
              <select className="w-full h-12 px-4 rounded-xl bg-white dark:bg-[#2d1a1a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-all">
                <option>Bebidas Não Alcoólicas</option>
                <option>Bebidas Alcoólicas</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Section 2: Logistics & Packaging */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 flex justify-between items-center">
            <h3 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              Configuração de Embalagem
            </h3>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Fator de Conversão Ativo</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unidade de Medida</label>
              <select className="w-full h-12 px-4 rounded-xl bg-white dark:bg-[#2d1a1a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-primary">
                <option value="UN">UN - Unidade</option>
                <option value="CX">CX - Caixa</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Unidade base de venda.</p>
            </div>

            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Unidades / Pacote', value: 6, unit: 'UN' },
                { label: 'Pacotes / Lastro', value: 12, unit: 'CX' },
                { label: 'Lastros / Pallet', value: 5, unit: 'CAM' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-transparent hover:border-gray-200 transition-colors">
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">{item.label}</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      defaultValue={item.value}
                      className="w-full h-10 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 text-xl font-bold text-gray-900 dark:text-white p-0"
                    />
                    <span className="text-xs font-medium text-gray-400 ml-2">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-12">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex flex-col sm:row items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full">
                    <Package2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Resumo da Paletização</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Configuração calculada automaticamente</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-600 dark:text-blue-300 uppercase font-semibold">Total por Pallet</p>
                  <p className="text-2xl font-black text-blue-900 dark:text-white leading-none">360 <span className="text-sm font-normal text-blue-700 dark:text-blue-300">UN</span></p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a0c0e] border-t border-gray-100 dark:border-gray-800 p-4 shadow-lg z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Button variant="ghost" className="hidden sm:flex">Cancelar</Button>
          <Button variant="primary" size="lg" className="w-full sm:w-auto flex-1 sm:flex-none" icon={<Save className="w-5 h-5" />}>
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
