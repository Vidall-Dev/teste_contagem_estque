import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { Search, QrCode, Filter, Minus, Plus, ChevronDown, CheckCircle, EyeOff } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface InventoryItem {
  id: string;
  product: {
    sku: string;
    name: string;
  };
  pallets: number;
  lastros: number;
  pacs: number;
  units: number;
  total_calculated: number;
  status: string;
}

export default function InventoryExecution() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get('id');

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [batch, setBatch] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (batchId) {
      fetchBatchData(batchId);
    }
  }, [batchId]);

  async function fetchBatchData(id: string) {
    setLoading(true);

    const { data: batchData } = await supabase
      .from('inventory_batches')
      .select('*, stocks(*)')
      .eq('id', id)
      .single();

    setBatch(batchData);

    let { data: itemsData } = await supabase
      .from('inventory_items')
      .select('*, product:products(sku, name)')
      .eq('batch_id', id);

    // If no items, populate from products (for demo/initial setup)
    if (!itemsData || itemsData.length === 0) {
      const { data: allProducts } = await supabase.from('products').select('*');
      if (allProducts && allProducts.length > 0) {
        const newItems = allProducts.map(p => ({
          batch_id: id,
          product_id: p.id,
          status: 'pending'
        }));
        await supabase.from('inventory_items').insert(newItems);

        // Fetch again
        const { data: refreshedItems } = await supabase
          .from('inventory_items')
          .select('*, product:products(sku, name)')
          .eq('batch_id', id);
        itemsData = refreshedItems;
      }
    }

    setItems(itemsData || []);
    setLoading(false);
  }

  const updateCount = async (itemId: string, field: string, value: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newCounts = {
      ...item,
      [field]: Math.max(0, value)
    };

    // Recalculate total if we had logistical rules, but here let's just use a simple sum or logic
    // For now, let's just update the state locally and then save
    setItems(items.map(i => i.id === itemId ? newCounts : i));

    await supabase.from('inventory_items').update({
      [field]: Math.max(0, value),
      status: 'counting'
    }).eq('id', itemId);
  };

  const handleFinalize = async () => {
    if (batchId) {
      await supabase.from('inventory_batches').update({
        status: 'completed',
        finished_at: new Date().toISOString()
      }).eq('id', batchId);
      navigate('/inventory/finalization');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-32 transition-colors duration-200">
      <Header
        title={batch ? `Contagem #${batch.dt_number}` : 'Carregando...'}
        subtitle={batch ? `${batch.stocks?.name} • ${new Date(batch.started_at).toLocaleDateString('pt-BR')}` : ''}
        showBack
      />

      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-1.5 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Online (Supabase)</span>
        </div>
        <div className="flex items-center gap-2">
          {batch?.report_type === 'blind' && (
            <>
              <EyeOff className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Contagem Cega</span>
            </>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
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
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center p-10 text-gray-500">Carregando itens...</div>
          ) : items.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-[#2d1a1a] rounded-xl overflow-hidden transition-all duration-300 border ${
                expandedId === item.id
                  ? 'shadow-hover border-primary/20 ring-2 ring-primary/5'
                  : 'shadow-soft border-transparent hover:border-gray-200 dark:hover:border-gray-800'
              }`}
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase tracking-wider">
                        SKU: {item.product.sku}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'counting' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.status === 'counting' ? 'Em Andamento' : 'Pendente'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {item.product.name}
                    </h3>
                  </div>
                  <div className={`h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 transition-transform duration-300 ${expandedId === item.id ? 'rotate-180 bg-primary/10 text-primary' : ''}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {expandedId === item.id && (
                <div className="p-5 bg-gray-50/50 dark:bg-black/20 border-t border-dashed border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Pallets', key: 'pallets' },
                      { label: 'Lastros', key: 'lastros' },
                      { label: 'Pacs', key: 'pacs' },
                      { label: 'Unidades', key: 'units' }
                    ].map((field) => (
                      <div key={field.key} className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">{field.label}</label>
                        <div className="flex items-center bg-white dark:bg-[#1a0c0e] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden h-12">
                          <button
                            onClick={() => updateCount(item.id, field.key, (item as any)[field.key] - 1)}
                            className="w-12 h-full flex items-center justify-center text-primary hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <input
                            type="number"
                            className="flex-1 w-full h-full text-center border-none bg-transparent focus:ring-0 text-gray-900 dark:text-white font-bold text-lg p-0"
                            value={(item as any)[field.key]}
                            onChange={(e) => updateCount(item.id, field.key, parseInt(e.target.value) || 0)}
                          />
                          <button
                            onClick={() => updateCount(item.id, field.key, (item as any)[field.key] + 1)}
                            className="w-12 h-full flex items-center justify-center text-primary hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full z-40">
        <div className="p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <Button
              size="xl"
              className="w-full shadow-2xl"
              icon={<CheckCircle className="w-6 h-6" />}
              onClick={handleFinalize}
            >
              Finalizar Contagem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
