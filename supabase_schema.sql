-- Supabase Schema for LogiCheck App

-- 1. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    ean TEXT,
    name TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Logistics Rules Table (One-to-one with products)
CREATE TABLE logistics_rules (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    unit_measure TEXT DEFAULT 'UN',
    units_per_package INTEGER DEFAULT 1,
    packages_per_layer INTEGER DEFAULT 1,
    layers_per_pallet INTEGER DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Stocks Table
CREATE TABLE stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL -- 'principal', 'advanced', 'return'
);

-- 4. Inventory Batches Table
CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stock_id UUID REFERENCES stocks(id),
    dt_number TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
    operator_name TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ,
    report_type TEXT -- 'import', 'blind'
);

-- 5. Inventory Items Table
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES inventory_batches(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    pallets INTEGER DEFAULT 0,
    lastros INTEGER DEFAULT 0,
    pacs INTEGER DEFAULT 0,
    units INTEGER DEFAULT 0,
    total_calculated INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending' -- 'pending', 'counting', 'completed', 'discrepancy'
);

-- Enable Row Level Security (optional but recommended for production)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
-- ... add policies as needed

-- Initial Data for Stocks
INSERT INTO stocks (name, description, type) VALUES
('Depósito Principal', 'Contagem geral de todo o armazém central. Recomendado para fechamentos mensais.', 'principal'),
('Estoque Avançado', 'Contagem de produtos em trânsito ou em docas de expedição imediata.', 'advanced'),
('Área de Devolução', 'Itens retornados que precisam de conferência de integridade e re-estocagem.', 'return');

-- Initial Sample Products
INSERT INTO products (sku, ean, name, category) VALUES
('10293', '7891234567890', 'CERV ITA PILS 350ML - LATA', 'Bebidas'),
('88210', '7891234567891', 'REFRIG COCA COLA 2L', 'Bebidas'),
('32911', '7891234567892', 'AGUA MINERAL 500ML S/ GAS', 'Bebidas');

-- Initial Sample Rules
INSERT INTO logistics_rules (product_id, units_per_package, packages_per_layer, layers_per_pallet)
SELECT id, 12, 10, 5 FROM products WHERE sku = '10293';
INSERT INTO logistics_rules (product_id, units_per_package, packages_per_layer, layers_per_pallet)
SELECT id, 6, 8, 4 FROM products WHERE sku = '88210';
INSERT INTO logistics_rules (product_id, units_per_package, packages_per_layer, layers_per_pallet)
SELECT id, 12, 12, 6 FROM products WHERE sku = '32911';
