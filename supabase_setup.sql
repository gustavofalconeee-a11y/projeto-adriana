-- Execute este SQL no "SQL Editor" do seu novo projeto no Supabase (rucytkqcjirurjfoqpyu)

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    images TEXT[] DEFAULT '{}',
    colors TEXT[] DEFAULT '{}',
    direct_checkout_link TEXT,
    personalization_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT,
    items JSONB DEFAULT '[]',
    total_price NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de admins para login
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Adicionar admin inicial (Usuario: admin / Senha: 123 - Recomenda-se mudar depois)
INSERT INTO public.admins (username, email, password_hash) 
VALUES ('admin', 'admin@alora.com', '123')
ON CONFLICT DO NOTHING;

-- Desabilitar RLS para facilitar a producao inicial (como solicitado)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Permissoes
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
