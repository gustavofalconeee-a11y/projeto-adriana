# Guia de Deploy: site Simplificado (Estático)

Como solicitado, o projeto foi simplificado! 🚀

Removi o **Prisma** e o banco de dados **Supabase**, que estavam causando erros de conexão no deploy. Agora o site usa uma estrutura de dados estática, o que o torna extremamente rápido e impossível de dar "erro 500" por causa de banco de dados.

## 1. O Que Mudou?
- **Dados Estáticos:** Todos os produtos, preços e imagens agora estão no arquivo `src/data/products.ts`.
- **Imagens Locais:** O site agora carrega as imagens diretamente da pasta `public/images/`.
- **Checkout via WhatsApp:** O processo de compra continua funcionando perfeitamente, enviando o pedido detalhado para o seu WhatsApp.
- **Sem Erro 500:** Como não há mais conexão com banco de dados externo, o site não vai mais falhar ao carregar na Vercel.

## 2. Como Fazer o Deploy Agora
Você não precisa mais configurar variáveis de ambiente complexas na Vercel.

1.  Envie as mudanças para o seu GitHub:
    ```bash
    git add .
    git commit -m "feat: simplify project and remove prisma/database"
    git push origin main
    ```
2.  A Vercel vai detectar a mudança e refazer o deploy automaticamente.
3.  **Importante:** Se você tiver variáveis de ambiente antigas na Vercel (como `DATABASE_URL`), pode removê-las, elas não são mais usadas.

## 3. Como Adicionar Novos Produtos?
Agora, em vez de usar um painel admin, você adiciona produtos editando o arquivo:
`src/data/products.ts`

Basta copiar um bloco de produto existente e alterar o nome, preço e o link da imagem (coloque a imagem na pasta `public/images/`).

---

> [!TIP]
> **Por que é melhor assim?** 
> Para um catálogo de bolsas exclusivo, a estrutura estática é mais segura, mais rápida e gratuita (não consome créditos de banco de dados). O site agora é como uma vitrine de luxo sempre disponível!
