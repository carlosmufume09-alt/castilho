# Shells Fashion Elegance - E-commerce

Um e-commerce elegante e completo com Next.js, MySQL e Prisma ORM.

## 🚀 Início Rápido

### 1. Instalar Dependências
```bash
pnpm install
```

### 2. Configurar Banco de Dados

#### MySQL Local
```bash
# Criar banco
mysql -u root -p
CREATE DATABASE shells_fashion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Editar .env.local
DATABASE_URL="mysql://root:sua_senha@localhost:3306/shells_fashion"
JWT_SECRET="shells_fashion_secret_key_2024"
```

### 3. Preparar Banco
```bash
# Criar tabelas
npx prisma migrate dev --name init

# Popular com dados de teste
npx ts-node prisma/seed.ts
```

### 4. Rodar Dev
```bash
pnpm dev
```

Acesse: http://localhost:3000

## 📋 Credenciais Admin

- **Email**: admin@example.com
- **Senha**: password123

## 🎯 Funcionalidades

### Vitrine Pública
- Grid de produtos
- Página individual de produto
- Carrinho com localStorage
- Checkout via WhatsApp

### Painel Admin
- Login seguro com JWT
- Dashboard com estatísticas
- CRUD de produtos
- Visualização de pedidos
- Configurações da loja

## 📁 Estrutura

```
app/
├── page.tsx              # Home
├── login/                # Login admin
├── cart/                 # Carrinho
├── products/[id]/        # Página produto
├── admin/                # Painel admin (protegido)
│   ├── dashboard/
│   ├── products/
│   ├── orders/
│   └── settings/
└── api/                  # API Routes
    ├── auth/
    ├── products/
    ├── orders/
    └── store/

lib/
├── db.ts                 # Prisma Client
└── auth.ts               # JWT & Bcryptjs

components/
├── header.tsx            # Cabeçalho
└── product-card.tsx      # Card produto
```

## 🔐 Segurança

- Senhas com bcryptjs
- JWT com expiração
- Validação em todas as rotas
- Proteção de rotas admin

## 🛠️ Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- Prisma ORM v5
- MySQL
- TypeScript

## 📝 Variáveis de Ambiente

```env
DATABASE_URL=mysql://...
JWT_SECRET=secret_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```
