# InfoTech Soluções — Site Institucional

Site institucional one page para a InfoTech Soluções, empresa de assistência técnica em informática localizada em Patrocínio–MG.

Desenvolvido com HTML, CSS e JavaScript puro (sem frameworks ou bibliotecas externas).

---

## Como abrir localmente

1. Baixe ou clone esta pasta no seu computador
2. Abra o arquivo `index.html` diretamente no navegador (Chrome, Firefox, Edge)
3. Pronto — o site funciona sem servidor ou instalação

> **Dica:** Para evitar erros de CORS no iframe do mapa e nas fontes Google, recomenda-se usar uma extensão como "Live Server" no VS Code ou rodar um servidor local simples:
> ```
> npx serve .
> ```

---

## Estrutura de arquivos

```
/
├── assets/
│   ├── images/
│   │   ├── logo.png          ← Logo original sem fundo (PNG transparente)
│   │   └── logo-nav.png      ← Logo redimensionada para o header (48px altura)
│   ├── icons/                ← Sprites SVG adicionais (se necessário)
│   └── fonts/                ← Fontes locais (se necessário)
├── css/
│   ├── variables.css         ← Design tokens: cores, espaçamentos, tipografia
│   ├── style.css             ← Estilos base (importa variables.css)
│   ├── animations.css        ← Transições, fade-in, carrossel, FAQ
│   └── responsive.css        ← Media queries: 480px | 768px | 1024px | 1280px
├── js/
│   ├── main.js               ← Menu hambúrguer, header scroll, carrossel, nav highlight
│   ├── form.js               ← Validação e feedback do formulário de contato
│   ├── animations.js         ← Intersection Observer para fade-in de seções
│   └── faq.js                ← Accordion do FAQ com aria-expanded
├── robots.txt
├── sitemap.xml
├── index.html
└── README.md
```

---

## Substituições necessárias antes de publicar

### 1. Logo
A logo já está incluída em `assets/images/logo.png` e `logo-nav.png` (sem fundo).
Se quiser atualizar, substitua esses arquivos mantendo os mesmos nomes.

### 2. Google Maps
O iframe do mapa usa um embed genérico. Para usar o mapa real:
1. Acesse [maps.google.com](https://maps.google.com)
2. Busque o endereço exato
3. Clique em **Compartilhar → Incorporar mapa**
4. Copie o `src` do iframe gerado
5. Substitua o `src` no `index.html` na seção `#localizacao`

### 3. Formulário de contato
O formulário tem validação front-end completa mas o envio é simulado.
Para ativar o envio real, use o [Formspree](https://formspree.io):
1. Crie uma conta e um novo formulário
2. Copie o endpoint gerado (ex: `https://formspree.io/f/xabc1234`)
3. No `index.html`, localize `<form id="contact-form">` e adicione:
   - `action="https://formspree.io/f/SEU_ID"`
   - `method="POST"`
4. No `form.js`, descomente o bloco `fetch` e remova o `e.preventDefault()`

### 4. Imagem Open Graph
Crie uma imagem de compartilhamento (1200×630px) e salve em:
`assets/images/og-image.jpg`
Atualize a meta tag `og:image` no `<head>` do `index.html`.

### 5. Fotos da equipe
Substitua os placeholders de equipe por fotos reais:
- Adicione as fotos em `assets/images/` no formato WebP (ex: `carlos.webp`)
- No `index.html`, substitua cada `.team-photo` placeholder pelo elemento `<picture>`:
```html
<picture>
  <source srcset="assets/images/carlos.webp" type="image/webp">
  <img src="assets/images/carlos.jpg" alt="Carlos Henrique — Proprietário e Técnico Principal" width="100" height="100" loading="lazy">
</picture>
```

---

## Paleta de cores

| Nome            | Hex       | Uso                          |
|-----------------|-----------|------------------------------|
| Azul principal  | `#1A56DB` | Botões, links, destaques     |
| Azul escuro     | `#0F3A8A` | Hover, gradiente             |
| Azul claro      | `#EBF2FF` | Fundos de cards, badges      |
| Preto texto     | `#0D0D0D` | Texto principal              |
| Cinza texto     | `#6B7280` | Texto secundário             |
| Cinza claro     | `#F3F4F6` | Fundo de seções alternadas   |
| Branco          | `#FFFFFF` | Base                         |
| Verde WhatsApp  | `#25D366` | Botão flutuante              |

---

## Tipografia

- **Display / Títulos:** Space Grotesk (600–700) — carregada via Google Fonts
- **Corpo / Texto:** Inter (400–500) — carregada via Google Fonts

---

## SEO

- Schema.org tipo `ComputerRepair` com endereço, telefone e horário
- Meta tags completas: title, description, keywords, Open Graph
- Um único `<h1>` na hero; hierarquia lógica de headings
- `robots.txt` e `sitemap.xml` incluídos

---

## Acessibilidade

- HTML semântico com `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-label` em todos os botões de ícone
- `aria-expanded` no menu hambúrguer e no FAQ
- Foco trapeado no menu mobile (navegação por teclado)
- `prefers-reduced-motion` respeitado nas animações

---

## Contato da empresa

- **WhatsApp:** (34) 99999-1234
- **E-mail:** contato@infotechsolucoes.com.br
- **Endereço:** Rua Presidente Vargas, 450, Centro – Patrocínio/MG
- **Instagram:** @infotechsolucoes
- **Site:** infotechsolucoes.com.br
