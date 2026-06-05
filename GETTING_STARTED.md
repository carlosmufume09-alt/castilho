# 🚀 INSTRUÇÕES PARA COMEÇAR - Shells Fashion Elegance

## ⚡ Setup em 3 Passos

### Passo 1: Instalar Dependências
```bash
cd /vercel/share/v0-project
npm install
```

### Passo 2: Configurar Banco MySQL

#### Opção A: MySQL Local (Recomendado para teste)

1. **Certifique-se que MySQL está rodando:**
   ```bash
   # macOS (com Homebrew)
   brew services start mysql

   # Linux (Ubuntu/Debian)
   sudo systemctl start mysql

   # Windows
   # Use MySQL Workbench ou `net start MySQL80`
   ```

2. **Crie o banco de dados:**
   ```bash
   mysql -u root -p
   ```
   
   Dentro do MySQL:
   ```sql
   CREATE DATABASE shells_fashion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   EXIT;
   ```

3. **Atualize `.env.local`** (já criado, mas confira):
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/shells_fashion"
   JWT_SECRET="shells_fashion_secret_key_2024"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

#### Opção B: MySQL na Nuvem

- Use PlanetScale (MySQL compatível)
- Ou AWS RDS
- Atualize DATABASE_URL com a string de conexão

### Passo 3: Preparar Banco de Dados

```bash
# Criar tabelas
npx prisma migrate dev --name init

# Popular com dados de teste (admin + 6 produtos)
npx ts-node prisma/seed.ts
```

### Passo 4: Iniciar Servidor

```bash
npm run dev
```

Você verá:
```
✓ Ready in 700ms
Local:        http://localhost:3000
```

## 🌐 Acessar a Aplicação

### Vitrine Pública
👉 **http://localhost:3000**

- Grid de 6 produtos
- Clique em qualquer produto para ver detalhes
- Adicione ao carrinho
- Teste checkout via WhatsApp

### Painel Admin
👉 **http://localhost:3000/login**

**Credenciais:**
- Email: `admin@example.com`
- Senha: `password123`

---

## 📊 O que você pode fazer

### Na Vitrine
- ✅ Ver produtos em grid responsivo
- ✅ Adicionar ao carrinho
- ✅ Checkout 1-clique no WhatsApp
- ✅ Design elegante minimalista

### No Admin
- ✅ Dashboard com stats (produtos, pedidos, receita)
- ✅ Criar novo produto
- ✅ Editar/deletar produtos
- ✅ Ver todos os pedidos recebidos
- ✅ Configurar número WhatsApp
- ✅ Editar nome/descrição da loja

---

## 🎯 Próximas Ações

### 1. Teste o Fluxo Completo
1. Vá para http://localhost:3000
2. Clique em "Blazer Elegante" (ou outro produto)
3. Clique "Adicionar ao Carrinho"
4. Vá para http://localhost:3000/cart
5. Preencha nome e WhatsApp
6. Clique "Finalizar no WhatsApp"

### 2. Adicione Seus Produtos
1. Login em http://localhost:3000/login
2. Vá para "Admin" → "Produtos"
3. Clique "Novo Produto"
4. Preencha dados e salve

### 3. Customize a Loja
1. Vá para "Admin" → "Configurações"
2. Edite:
   - Nome da loja
   - Descrição
   - Número WhatsApp (formato: 5511999999999)
3. Clique "Salvar Configurações"

---

## 🔧 Troubleshooting

### "Cannot connect to MySQL"
```bash
# Verifique se MySQL está rodando
mysql -u root -p -e "SELECT 1;"

# Se erro, inicie MySQL:
brew services start mysql        # macOS
sudo systemctl start mysql       # Linux
```

### "Cannot find module @prisma/client"
```bash
npm install
npx prisma generate
```

### "Nenhum produto disponível"
```bash
# Rode o seed de novo
npx ts-node prisma/seed.ts
```

### "Token inválido" (ao fazer login)
- Limpe os cookies do navegador
- Ou use Incognito/Private Window
- Ou limpe localStorage: `localStorage.clear()` no console

### "Erro ao conectar com WhatsApp"
- Verifique o número em Admin → Configurações
- Deve estar no formato: 5511999999999 (sem caracteres especiais)

---

## 📱 Fluxo de Vendas

```
Cliente visite loja
    ↓
Vê produtos em grid
    ↓
Clica em produto → Vê detalhes
    ↓
Adiciona ao carrinho
    ↓
Vai para /cart → Vê resumo
    ↓
Preencha nome e WhatsApp
    ↓
Clica "Finalizar no WhatsApp"
    ↓
WhatsApp abre com pedido pronto
    ↓
Cliente envia mensagem
    ↓
Admin vê em "Admin → Pedidos"
```

---

## 📊 Banco de Dados

### Tabelas Criadas

1. **Users** - Admin de login
2. **Store** - Configurações da loja
3. **Products** - Catálogo de produtos
4. **Orders** - Histórico de pedidos

### Dados de Teste

Estão pré-carregados:
- 1 admin (admin@example.com)
- 6 produtos de moda
- Configurações iniciais da loja

---

## 🚀 Deploy para Produção

### No Vercel (Recomendado)

```bash
# 1. Conecte seu GitHub
vercel link

# 2. Configure variáveis
# Vá para Settings → Environment Variables
# Adicione DATABASE_URL (MySQL na nuvem)

# 3. Deploy
vercel deploy
```

### Manualmente

```bash
npm run build
npm start
```

---

## 📞 URLs Importantes

| Página | URL |
|--------|-----|
| Home | http://localhost:3000 |
| Produto | http://localhost:3000/products/[id] |
| Carrinho | http://localhost:3000/cart |
| Login | http://localhost:3000/login |
| Dashboard | http://localhost:3000/admin/dashboard |
| Produtos Admin | http://localhost:3000/admin/products |
| Pedidos Admin | http://localhost:3000/admin/orders |
| Configurações | http://localhost:3000/admin/settings |

---

## ✨ Pronto!

Seu e-commerce está 100% funcional. Comece a vender! 🎉

**Dúvidas?** Veja SUMMARY.md para visão geral completa.
