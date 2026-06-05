# Shells Fashion Elegance - Guia de Instalação Local

## Requisitos
- Node.js 18+
- MySQL 8.0+ ou SQLite
- npm

## Instalação Rápida

### 1. Clonar/Baixar o Projeto
```bash
git clone <url-do-repositorio>
cd shells-fashion
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Banco de Dados

#### Opção A: SQLite (Mais Fácil - Recomendado para Testes)

1. Criar arquivo `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="shells_fashion_secret_key_2024"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

2. Rodar migrations:
```bash
npx prisma migrate dev --name init
```

#### Opção B: MySQL (Produção)

1. Criar o banco no MySQL:
```bash
mysql -u root -p < database/schema.sql
```

2. Criar arquivo `.env`:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/shells_fashion"
JWT_SECRET="shells_fashion_secret_key_2024"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

3. Sincronizar Prisma:
```bash
npx prisma db push
```

### 4. Gerar Prisma Client
```bash
npx prisma generate
```

### 5. Criar Admin e Dados Iniciais
```bash
npx ts-node prisma/seed.ts
```

### 6. Iniciar o Servidor
```bash
npm run dev
```

### 7. Acessar
- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/login

## Credenciais de Teste
- **Email:** admin@example.com
- **Senha:** 123456

## Estrutura do Projeto

```
shells-fashion/
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Home
│   ├── login/             # Login admin
│   ├── contact/           # Página de contato
│   ├── cart/              # Carrinho
│   ├── admin/             # Painel admin
│   └── api/               # API routes
├── components/            # Componentes React
├── lib/                   # Utilitários
├── prisma/                # Schema do banco
├── database/              # Scripts SQL
└── public/                # Assets estáticos
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Iniciar produção
npm run start

# Prisma Studio (visualizar banco)
npx prisma studio

# Reset do banco
npx prisma migrate reset

# Gerar tipos Prisma
npx prisma generate
```

## Contatos da Dona (Moçambique)

- **WhatsApp:** +258 879 992 762
- **Telefone:** 847 052 762
- **Localização:** Khongolote, Maputo
- **Email:** shells@fashion.com

## Moeda

Todos os preços estão em **Meticais (MT)** - moeda de Moçambique.

## Troubleshooting

### Erro: Cannot find module '@prisma/client'
```bash
npx prisma generate
```

### Erro: Database does not exist
```bash
npx prisma migrate dev --name init
```

### Erro de Login
1. Verificar se o banco tem o usuário admin
2. Executar seed novamente:
```bash
npx ts-node prisma/seed.ts
```

### Limpar cache
```bash
rm -rf .next
npm run dev
```

## Deploy

### Vercel (Recomendado)
1. Push para GitHub
2. Conectar no Vercel
3. Adicionar variáveis de ambiente
4. Deploy automático

### Servidor Próprio
```bash
npm run build
npm run start
```

---

**Shells Fashion Elegance - Moçambique**
WhatsApp: +258 879 992 762 | Khongolote, Maputo
