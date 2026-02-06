import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Search, Plus, Edit3, Trash2, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  sku: string;
  logistics_rules?: any;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        sku,
        logistics_rules (
          units_per_package,
          packages_per_layer,
          layers_per_pallet,
          unit_measure
        )
      `)
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      // Handle the fact that logistics_rules might come back as an array
      const mapped = (data || []).map((p: any) => ({
        ...p,
        logistics_rules: Array.isArray(p.logistics_rules) ? p.logistics_rules[0] : p.logistics_rules
      }));
      setProducts(mapped);
    }
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Erro ao excluir produto');
    } else {
      fetchProducts();
    }
  }

  return (
    <MainLayout title="Gerenciamento de Produtos" subtitle="Painel de Auditoria de Regras Logísticas">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
          <div className="relative group w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-primary" />
            <input
              className="block w-full py-2 pl-9 pr-3 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:ring-primary focus:border-primary dark:bg-[#2d1a1a] dark:border-gray-800 dark:text-white"
              placeholder="Buscar SKU..."
            />
          </div>
          <Link to="/product/registry">
            <Button size="sm" icon={<Plus className="w-4 h-4" />} className="w-full sm:w-auto">
              Novo Cadastro
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto mb-6">
        <button className="px-3 py-1 rounded bg-primary text-white text-xs font-bold whitespace-nowrap">Todos</button>
        <button className="px-3 py-1 rounded bg-white dark:bg-[#2d1a1a] border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">Com Regras</button>
        <button className="px-3 py-1 rounded bg-white dark:bg-[#2d1a1a] border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">Sem Regras</button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="hidden md:grid grid-cols-[2fr_1fr_1.2fr_1.2fr_80px] bg-gray-50 dark:bg-[#3a2024]/30 border-b border-gray-100 dark:border-gray-800 px-6 py-3">
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500">Nome do Produto</div>
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500">SKU</div>
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500">Pallet vs Lastro</div>
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500">Lastro vs Unidade</div>
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500 text-right pr-2">Ações</div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Carregando produtos...</div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center text-gray-500">Nenhum produto cadastrado.</div>
          ) : products.map((product) => {
            const hasRules = product.logistics_rules && product.logistics_rules.units_per_package > 0;
            return (
              <div
                key={product.id}
                className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1.2fr_1.2fr_80px] items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#3a2024]/20 transition-colors ${!hasRules ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}
              >
                <div className="text-sm font-bold text-gray-900 dark:text-white truncate pr-4">{product.name}</div>
                <div className="text-xs font-mono bg-gray-100 dark:bg-black/20 px-2 py-0.5 rounded w-fit text-gray-500 my-2 md:my-0">{product.sku}</div>

                {!hasRules ? (
                  <div className="md:col-span-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-amber-600 uppercase">Regra não configurada</span>
                    <Link to={`/product/registry?id=${product.id}`} className="text-primary text-[11px] font-black underline ml-2">Configurar Agora</Link>
                  </div>
                ) : (
                  <>
                    <div className="text-sm">
                      <span className="text-gray-500">1 Pallet =</span>
                      <span className="font-bold text-primary ml-1">{product.logistics_rules?.layers_per_pallet} Lastros</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">1 Lastro =</span>
                      <span className="font-bold text-primary ml-1">{product.logistics_rules?.packages_per_layer} Pacotes</span>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-1 mt-3 md:mt-0">
                  <Link to={`/product/registry?id=${product.id}`} className="p-1.5 text-gray-400 hover:text-primary transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => deleteProduct(product.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 px-2">
        <p className="text-xs text-gray-500 font-medium">Mostrando {products.length} produtos</p>
        <nav className="flex gap-1">
          <button className="p-2 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2d1a1a] text-gray-600 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded bg-primary text-white text-xs font-bold">1</button>
          <button className="w-8 h-8 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2d1a1a] text-gray-600 hover:bg-gray-50 text-xs font-medium">2</button>
          <button className="p-2 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2d1a1a] text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </MainLayout>
  );
}
