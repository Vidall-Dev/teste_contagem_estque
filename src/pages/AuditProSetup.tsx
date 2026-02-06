import Button from '../components/Button';
import Card from '../components/Card';
import { Group, MapPin, Settings2, Info, ArrowDown, Rocket, UserPlus, ArrowLeftRight, Bolt, Bell, Package } from 'lucide-react';

export default function AuditProSetup() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-manrope text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101622] px-6 md:px-10 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 bg-audit-primary rounded-lg text-white">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight">AuditPro Inventory</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Controle de Estoque Corporativo</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-audit-primary">Dashboard</a>
          <a href="#" className="text-audit-primary text-sm font-bold border-b-2 border-audit-primary pb-1">Inventários</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-audit-primary">Equipes</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-audit-primary">Relatórios</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-audit-primary/20">
            <img
              alt="Avatar"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6ititNIY9mnyon2Z2IQD2MFZOINUXnkkz93z9hZixAlG0hLc1JVd5XBiYP0e-kGi85rV8wZ1nK2XzYW-UYuD-heVpm6HYP1ILNzOGEZbj_44bCNDYxbqkJTLGF6KrM1FQXjdSw8PMHehx-QzjbMAs2x2pPr7H-G0eYhi8L12T8gSD7xl_hB0t7xEJVpYxf6UpHy75TXW_-_4_Q4hg08YO0Q621d-ExEQSx1_I4Yz80qRVCwAYDY7ZQPxNdE5bvcXhw2eTo_XZn-8"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full p-6 md:p-10">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-audit-primary font-bold text-sm uppercase tracking-wider mb-2">
            <UserPlus className="w-4 h-4" />
            <span>Modo de Operação</span>
          </div>
          <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold leading-tight tracking-tight">Configuração de Auditoria em Dupla</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-2 max-w-2xl">
            Configure o par de operadores e as regras de validação. Esta operação exige que ambos os auditores confirmem a mesma quantidade para validar o item.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Location */}
            <Card className="bg-white dark:bg-[#1a2233] p-6 border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-audit-primary/10 rounded-lg text-audit-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold">1. Seleção de Local</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Setor de Inventário</span>
                  <select className="w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white focus:ring-2 focus:ring-audit-primary/20 transition-all">
                    <option disabled selected value="">Selecione o setor (ex: Corredor A, Câmara Fria)</option>
                    <option value="corredor-a">Corredor A - Perecíveis</option>
                    <option value="corredor-b">Corredor B - Bebidas</option>
                  </select>
                </label>
              </div>
            </Card>

            {/* Section 2: Operators */}
            <Card className="bg-white dark:bg-[#1a2233] p-6 border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-audit-primary/10 rounded-lg text-audit-primary">
                  <Group className="w-5 h-5" />
                </div>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold">2. Pareamento de Operadores</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                  <div className="bg-audit-primary/10 dark:bg-audit-primary/20 h-10 w-10 rounded-full flex items-center justify-center border border-audit-primary/30 z-10 shadow-sm text-audit-primary">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                  <div className="absolute h-px w-20 bg-audit-primary/20"></div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Auditador Principal</h3>
                  <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                      <UserPlus className="w-8 h-8" />
                    </div>
                    <select className="w-full text-sm font-medium h-10 px-3 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <option value="">Selecionar Operador A</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Auditador de Check</h3>
                  <div className="p-6 rounded-xl border-2 border-audit-primary/30 bg-audit-primary/5 dark:bg-audit-primary/10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 overflow-hidden border-2 border-audit-primary shadow-md">
                      <img
                        alt="Operador B"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxTN0heeO8FYzJis5P8jsxTYdyk0m9eti6MO31DHpYINJfbyjAe3A861ZIgRzem9keReStJA7AlhMY1tnLQAd_0KXNaOogN9MTV3GOno3kadfRGLU6wGDqL47PQsI8v0EBk4uzOVV-kaHlohpxoHwomwtpnflW-9-jWCWRKvpTmcwgn3qLJmhWLeNpVgrEyPZaFOCd2maVC8jrq_xwH75_b06LC17LNqp2dAJ7Z_GkPCi3WJUqPFWZ-dE3yvUrCKV6V8XeHJpptPc"
                      />
                    </div>
                    <select className="w-full text-sm font-bold h-10 px-3 rounded-lg border-audit-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                      <option selected value="op-2">Ana Oliveira (ID: 109)</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section 3: Rules */}
            <Card className="bg-white dark:bg-[#1a2233] p-6 border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-audit-primary/10 rounded-lg text-audit-primary">
                  <Settings2 className="w-5 h-5" />
                </div>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold">3. Regras de Negócio</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Esconder saldo sistêmico de ambos', desc: 'Impede que os operadores vejam o estoque esperado pelo sistema.', checked: true },
                  { title: 'Bloquear item em caso de divergência', desc: 'O item será travado e exigirá supervisão se os valores não baterem.', checked: false },
                ].map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">{rule.title}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{rule.desc}</span>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${rule.checked ? 'bg-audit-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${rule.checked ? 'translate-x-5' : ''}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Info Card */}
            <div className="bg-audit-primary p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Como funciona?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                  <p className="text-sm font-medium opacity-90">Ambos auditores contam o mesmo SKU simultaneamente ou em sequência.</p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 opacity-50" />
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10 border border-white/20">
                  <div className="w-6 h-6 rounded-full bg-white text-audit-primary flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tight">Validação Automática</p>
                    <p className="text-xs opacity-80 mt-1">O item só é finalizado se as duas contagens forem 100% idênticas.</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 opacity-50" />
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                  <p className="text-sm font-medium opacity-90">Divergências são reportadas em tempo real ao painel de supervisão.</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <Card className="bg-white dark:bg-[#1a2233] p-6 border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Resumo da Configuração</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Modo:</span>
                  <span className="font-bold text-audit-primary">Auditoria Dupla Blind</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Setor:</span>
                  <span className="font-bold text-gray-900 dark:text-white">Câmara Fria 01</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Offline:</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <Bolt className="w-3 h-3" /> Habilitado
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button variant="audit" className="w-full py-4" icon={<Rocket className="w-5 h-5" />}>
                  Iniciar Auditoria em Conjunto
                </Button>
                <p className="text-center text-[10px] text-gray-400 mt-3 px-4 leading-tight">
                  Ao iniciar, as ordens de serviço serão disparadas para os terminais móveis dos auditores selecionados.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
