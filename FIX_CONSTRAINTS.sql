-- SQL PARA RESOLVER O ERRO DE NULL EM "updatedAt" E "createdAt"
-- Rode isso no SQL Editor do Supabase se o erro persistir

-- 1. Tornar updatedAt opcional ou com valor padrão para evitar erros futuros
ALTER TABLE "Product" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET DEFAULT now();

-- 2. Garantir o mesmo para outras tabelas importantes se existirem
ALTER TABLE IF EXISTS "Order" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE IF EXISTS "Order" ALTER COLUMN "updatedAt" SET DEFAULT now();

-- 3. Garantir que createdAt também tenha valor padrão
ALTER TABLE "Product" ALTER COLUMN "createdAt" SET DEFAULT now();

-- 4. DESABILITAR RLS (Caso tenha resetado)
ALTER TABLE "Product" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" DISABLE ROW LEVEL SECURITY;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
