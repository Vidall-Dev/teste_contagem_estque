import { Link, useLocation } from 'react-router-dom';
import {
  Package2,
  History,
  BarChart3,
  RefreshCw,
  Settings,
  PlusSquare,
  Users,
  Warehouse,
  ArrowLeftRight
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: 'Operacional',
      items: [
        { name: 'Nova Contagem', icon: PlusSquare, path: '/new-count/step-1' },
        { name: 'Auditoria em Dupla', icon: Users, path: '/audit-pro/setup' },
      ]
    },
    {
      title: 'Gestão',
      items: [
        { name: 'Histórico', icon: History, path: '#' },
        { name: 'Relatórios', icon: BarChart3, path: '#' },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { name: 'Produtos', icon: Package2, path: '/product/management' },
        { name: 'Estoque', icon: Warehouse, path: '#' },
        { name: 'Regras de Conversão', icon: ArrowLeftRight, path: '#' },
        { name: 'Sincronização', icon: RefreshCw, path: '#', badge: true },
        { name: 'Configurações', icon: Settings, path: '#' },
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a0c0e] sticky top-0 h-screen transition-colors duration-200">
      <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col">
          <h1 className="text-primary text-xl font-black tracking-tight">LogiCheck</h1>
          <p className="text-text-muted dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Gestão Logística</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-8">
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-3">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors group ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-primary' : 'text-gray-500 group-hover:text-primary dark:text-gray-400'}`} />
                  <span className="text-sm">{item.name}</span>
                  {item.badge && (
                    <span className="w-2 h-2 bg-green-500 rounded-full ml-auto shadow-sm shadow-green-500/50"></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden ring-2 ring-white dark:ring-gray-800">
            <span className="material-symbols-outlined text-gray-500 text-sm">person</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-text-main dark:text-white truncate">Carlos Silva</span>
            <span className="text-xs text-text-muted dark:text-gray-400 truncate">Gerente Logístico</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
