# InfoTech Soluções — Site Institucional

> Site institucional one-page para a **InfoTech Soluções**, empresa de assistência técnica em informática localizada em Patrocínio–MG. Desenvolvido com HTML, CSS e JavaScript puro, sem frameworks ou dependências externas.

---

## ✦ Visão geral

A InfoTech Soluções atua há mais de 8 anos no mercado de manutenção e suporte de computadores. O site foi criado para apresentar os serviços da empresa, facilitar o contato via WhatsApp e reforçar a presença digital local.

**Acesse:** [infotechsolucoes.com.br](https://infotechsolucoes.com.br)

---

## Seções do site

| Seção | Descrição |
|---|---|
| Hero | Apresentação principal com CTA para WhatsApp |
| Sobre | História, missão e números da empresa |
| Serviços | Cards com os principais serviços oferecidos |
| Suporte remoto | Atendimento online sem deslocamento |
| Diferenciais | O que diferencia a InfoTech da concorrência |
| Logística | Opções de entrega e retirada de equipamentos |
| Como funciona | Passo a passo do atendimento |
| Equipe | Apresentação dos técnicos |
| Depoimentos | Carrossel com avaliações de clientes |
| FAQ | Perguntas frequentes em accordion |
| Localização | Mapa e endereço |
| Contato | Formulário com envio direto para WhatsApp |

---

## Stack

- **HTML5** semântico
- **CSS3** com custom properties (design tokens)
- **JavaScript** ES6+ puro — sem jQuery, sem frameworks
- **Google Fonts** — Space Grotesk (títulos) e Inter (corpo)
- **Schema.org** — markup estruturado tipo `ComputerRepair`

---

## Estrutura de arquivos

```
/
├── assets/
│   └── images/
│       ├── logo.png          ← Logo original (PNG transparente)
│       └── logo-nav.png      ← Logo para o header (48px altura)
├── css/
│   ├── variables.css         ← Design tokens: cores, espaçamentos, tipografia
│   ├── style.css             ← Estilos base
│   ├── animations.css        ← Transições, fade-in, FAQ, WhatsApp pulse
│   └── responsive.css        ← Media queries: 480px | 768px | 1024px | 1280px
├── js/
│   ├── main.js               ← Menu hambúrguer, header scroll, carrossel, nav highlight
│   ├── form.js               ← Validação do formulário + envio via WhatsApp
│   ├── animations.js         ← Intersection Observer para fade-in de seções
│   └── faq.js                ← Accordion do FAQ com aria-expanded
├── robots.txt
├── sitemap.xml
├── index.html
└── README.md
```

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/infotech-solucoes.git

# Entre na pasta
cd infotech-solucoes

# Abra com Live Server (VS Code) ou sirva com npx
npx serve .
```

Ou simplesmente abra o `index.html` diretamente no navegador — o site funciona sem servidor ou build step.

---

## Funcionalidades técnicas

- **Carrossel de depoimentos** — navegação por scroll nativo com `scroll-snap`, botões, dots e suporte a swipe no mobile
- **Formulário de contato** — validação completa em tempo real; ao submeter, abre o WhatsApp com os dados já preenchidos na mensagem
- **Menu mobile** — hambúrguer com trap de foco e fechamento por tecla `Escape`
- **Fade-in** via `IntersectionObserver` — animações escalonadas ao rolar a página
- **Header dinâmico** — muda de estilo ao scrollar
- **Nav highlight** — item ativo no menu acompanha a seção visível
- **FAQ accordion** — exclusivo, acessível com `aria-expanded`
- **Botão flutuante WhatsApp** — com animação de pulso
- **`prefers-reduced-motion`** — todas as animações desativadas quando o usuário prefere

---

## SEO e acessibilidade

**SEO**
- Schema.org `ComputerRepair` com endereço, telefone e horário
- Meta tags completas: `title`, `description`, `keywords`, Open Graph
- `<h1>` único na hero; hierarquia lógica de headings
- `robots.txt` e `sitemap.xml` incluídos
- URL canônica definida

**Acessibilidade**
- HTML semântico — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-label` em todos os botões de ícone
- `aria-expanded` no menu hambúrguer e no FAQ
- Foco trapeado no menu mobile (Tab e Shift+Tab)
- Roles e live regions no formulário e carrossel

---

## Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| `--color-blue` | `#1A56DB` | Botões, links, destaques |
| `--color-blue-dark` | `#0F3A8A` | Hover, gradiente |
| `--color-blue-light` | `#EBF2FF` | Fundos de cards, badges |
| `--color-black` | `#0D0D0D` | Texto principal |
| `--color-gray-500` | `#6B7280` | Texto secundário |
| `--color-gray-100` | `#F3F4F6` | Fundo de seções alternadas |
| `--color-white` | `#FFFFFF` | Base |
| `--color-whatsapp` | `#25D366` | Botão flutuante |

---

## Contato da empresa

| Canal | |
|---|---|
| WhatsApp | [(34) 99811-1439](https://wa.me/5534998111439) |
| Instagram | [@infotechsolucoes](https://instagram.com/rafael_coorreea) |
| Endereço | Rua Tamôios, 1171 — Bairro Fronteira, Patrocínio–MG |
| Site | [infotechsolucoes.com.br](https://infotechsolucoes.com.br) |

---

## Desenvolvedor

Desenvolvido por **Rafael Corrêa**

[![Instagram](https://img.shields.io/badge/@rafael__coorreea-E4405F?style=flat&logo=instagram&logoColor=white)](https://instagram.com/rafael_coorreea)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/seu-usuario)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.