# Shells Fashion Elegance - Guia de Teste Visual

## Como Testar as Novas Funcionalidades

### 1️⃣ Testando a Barra de Pesquisa

**Passo a passo:**
1. Abra http://localhost:3000
2. Scrolle para baixo um pouco e você verá a **barra de pesquisa**
3. Comece a digitar um nome de produto (ex: "Blazer")
4. Veja os resultados aparecerem em tempo real
5. Clique em um resultado para abrir a página do produto
6. Volte e clique o X para limpar a busca

**O que você deve ver:**
- Input com ícone de busca
- Dropdown com resultados mostrando:
  - Imagem do produto
  - Nome do produto
  - Descrição
  - Preço
- Hover effect nos resultados

---

### 2️⃣ Testando a Página de Contato

**Passo a passo:**
1. Abra http://localhost:3000/contact
2. Você verá o **header com link Contato**
3. **Hero Section** em gradiente roxo-coral
4. **4 Cards Coloridos** com os contatos:

   **Card 1 - WhatsApp (Verde):**
   - Número: +258 879 992 762
   - Click aqui → Abre conversa no WhatsApp
   
   **Card 2 - Telefone (Azul):**
   - Número: +258 879 992 762
   - Click aqui → Liga no seu telefone
   
   **Card 3 - Telefone 2 (Roxo):**
   - Número: 847 052 762
   - Click aqui → Liga (chamada local)
   
   **Card 4 - Localização (Laranja):**
   - Khongolote, Maputo
   - Click aqui → Abre Google Maps

5. **Scroll down** e você verá 3 cards informativos:
   - Horário de Atendimento
   - Localização Detalhada
   - Email

6. **Scroll mais** e verá CTA "Pronto para Começar?" com botão WhatsApp

7. **Footer** com todos os contatos integrados

---

### 3️⃣ Testando as Interações

**Na Barra de Pesquisa:**
- Hover sobre input → Muda cor de border
- Digita → Resultados aparecem em tempo real
- Hover sobre resultado → Background muda
- Click no X → Limpa tudo

**Nos Cards de Contato:**
- Hover → Scale (fica maior)
- Hover → Shadow aumenta
- Hover → Texto desliza
- Click → Abre WhatsApp/Liga/Abre Mapa

---

### 4️⃣ Testando Responsividade

**Desktop (1920px+):**
- Barra de pesquisa centralizada
- 4 cards de contato em 2x2
- Tudo bem espaçado

**Tablet (768px):**
- Barra de pesquisa 100%
- 2 cards por linha
- Tudo ajustado

**Mobile (320px):**
- Barra de pesquisa 100%
- 1 card por linha (full width)
- Texto menor
- Touch-friendly

---

### 5️⃣ Checklist de Funcionamento

**Barra de Pesquisa:**
- [ ] Input visível na home
- [ ] Placeholder "Buscar produtos..."
- [ ] Digitar mostra resultados
- [ ] Resultados desaparecem ao limpar
- [ ] Click em resultado abre produto
- [ ] Responsivo em mobile

**Página de Contato:**
- [ ] URL /contact funciona
- [ ] Header com link "Contato"
- [ ] Hero section em gradiente
- [ ] 4 Cards com as cores corretas
- [ ] Links funcionam:
  - [ ] WhatsApp abre conversa (wa.me)
  - [ ] Telefone liga
  - [ ] Telefone 2 liga
  - [ ] Localização abre mapa
- [ ] 3 Info cards com informações
- [ ] CTA section com botão WhatsApp
- [ ] Footer com contatos
- [ ] Responsivo em mobile

**Header:**
- [ ] Link "Contato" visível
- [ ] Click abre /contact
- [ ] Link posicionado corretamente

**Footer:**
- [ ] WhatsApp clicável
- [ ] Telefone clicável
- [ ] Telefone 2 clicável
- [ ] Localização clicável
- [ ] Todos com ícones

---

### 6️⃣ Dados que Devem Aparecer

**Contatos da Dona:**
- WhatsApp: +258 879 992 762
- Telefone 1: +258 879 992 762
- Telefone 2: 847 052 762
- Localização: Khongolote, Maputo

**Horários:**
- Segunda a Sexta: 09:00 - 18:00
- Sábado: 09:00 - 14:00
- Domingo: Fechado

**Email:**
- shells@fashion.com

**Localização:**
- Bairro: Khongolote
- Cidade: Maputo
- País: Moçambique

---

### 7️⃣ Links de Teste Diretos

Clique nos links abaixo para testar (copie em seu navegador):

**Página de Contato:**
```
http://localhost:3000/contact
```

**WhatsApp:**
```
https://wa.me/258879992762
```

**Telefone:**
```
tel:+258879992762
```

**Telefone 2:**
```
tel:847052762
```

**Google Maps:**
```
https://maps.google.com/?q=Khongolote,Maputo,Mozambique
```

---

### 8️⃣ Cores Esperadas

**Cards de Contato:**
- **WhatsApp:** Fundo verde claro (#10b981)
- **Telefone:** Fundo azul claro (#3b82f6)
- **Telefone 2:** Fundo roxo claro (#a855f7)
- **Localização:** Fundo laranja claro (#f97316)

**Hero Section:**
- Gradiente roxo → coral
- Texto branco

**Info Cards:**
- Branco com border cinza

---

### 9️⃣ Performance

Ao testar, você deve observar:
- ✅ Sem lag na pesquisa
- ✅ Sem lag ao scrollar
- ✅ Transições suaves
- ✅ Botões respondem rapidamente
- ✅ Mobile não trava

---

### 🔟 Problemas Comuns

**Se a barra de pesquisa não aparecer:**
- Certifique-se que há produtos no banco
- Recarregue a página
- Abra o DevTools e veja se há erros

**Se os links não funcionam:**
- Verifique se o navegador tem permissão
- Tente em outro navegador
- WhatsApp precisa estar instalado/web

**Se as cores não aparecem:**
- Limpe cache do navegador (Ctrl+Shift+Delete)
- Recarregue página completa (Ctrl+F5)

---

## 🎯 Resumo

Tudo pronto para testar! 

**Rotas principais para testar:**
1. http://localhost:3000 - Home com pesquisa
2. http://localhost:3000/contact - Página de contato
3. http://localhost:3000/cart - Carrinho

**Funcionalidades para testar:**
1. Pesquisar um produto
2. Adicionar ao carrinho
3. Ver contatos
4. Falar com a dona via WhatsApp

Aproveite! 🚀
