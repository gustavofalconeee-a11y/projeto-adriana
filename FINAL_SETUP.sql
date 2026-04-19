-- SQL PARA RESOLVER TUDO DE UMA VEZ NO NOVO PROJETO (rucytkqcjirurjfoqpyu)
-- Copie e cole no "SQL Editor" do seu Supabase e aperte "Run"

-- 1. ADAPTAR TABELA "Product" (PascalCase) PARA O SITE
DO $$ 
BEGIN
    -- Garantir que colunas extras existem sem apagar dados
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'images') THEN
        ALTER TABLE "Product" ADD COLUMN images TEXT[] DEFAULT '{}';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'colors') THEN
        ALTER TABLE "Product" ADD COLUMN colors TEXT[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'direct_checkout_link') THEN
        ALTER TABLE "Product" ADD COLUMN direct_checkout_link TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'personalization_enabled') THEN
        ALTER TABLE "Product" ADD COLUMN personalization_enabled BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 2. GARANTIR TABELA "Order" (PascalCase)
CREATE TABLE IF NOT EXISTS public."Order" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT,
    items JSONB DEFAULT '[]',
    total_price NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. GARANTIR TABELAS EXTRAS SE NECESSÁRIO
CREATE TABLE IF NOT EXISTS public."User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public."OrderItem" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public."Order"(id),
    product_id TEXT,
    quantity INTEGER,
    price NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. DESABILITAR RLS EM TUDO (PARA FICAR PÚBLICO E FUNCIONAL)
ALTER TABLE IF EXISTS "Product" DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Order" DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "OrderItem" DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "User" DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "admins" DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "products" DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "orders" DISABLE ROW LEVEL SECURITY;

-- 5. DAR PERMISSÕES TOTAIS
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- 6. CRIAR ADMIN PADRÃO (admin / admin)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.admins (username, password_hash) 
VALUES ('admin', 'admin') 
ON CONFLICT (username) DO NOTHING;
