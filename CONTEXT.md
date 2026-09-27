# SFV (Soluções Feitas para Você) — Contexto Oficial do Projeto

> **Documento de Memória & Guia de Engenharia/Design para Continuidade do Projeto.**  
> Qualquer desenvolvedor ou agente de IA (Antigravity, Claude, ChatGPT, etc.) que for trabalhar neste repositório deve ler e seguir rigorosamente este arquivo.

---

## 1. Identidade & Posicionamento da Marca

- **Nome da Empresa:** SFV — Soluções Feitas para Você
- **Segmento:** Boutique de Software & Estúdio Digital
- **Sede:** Salvador, Bahia — Brasil
- **Missão:** Criar produtos digitais sob medida (portfólios executivos, sites institucionais de alto padrão, landing pages estratégicas e sistemas web) que geram autoridade imediata, conversão e velocidade extrema.
- **Diferencial Competitivo:** Código limpo e artesanal em Next.js/TypeScript (sem construtores visuais pesados como Elementor ou temas lentos de WordPress), design autoral/editorial e atendimento direto com os desenvolvedores responsáveis.
- **Canais Oficiais:**
  - WhatsApp Comercial: `+55 (71) 99132-9737`
  - E-mail: `sfv.softwares@gmail.com`
  - Instagram: `@sfv.softwares`
  - Domínio / URL Base: `https://sfv.dev`

---

## 2. Diretrizes Anti-IA / Anti-Slop (Design & Copy System)

Este site foi expressamente desenhado para **NÃO parecer um template genérico gerado por IA** ("vibecoded / AI slop"). Mantenha sempre os seguintes princípios:

### 🚫 O que NUNCA fazer:
1. **Sem partículas aleatórias flutuando:** Não insira bolhas de blur roxas ou círculos flutuando aleatoriamente pela tela com `Math.random()`.
2. **Sem 3D tilt histérico:** Não faça cards inclinarem bruscamente em 3D a cada movimento do mouse. O movimento deve ser sutil e estável.
3. **Sem telas sci-fi de raios laser:** Evite fundos animados de placas de circuito piscando com neon verde/roxo. Use fundos profundos com iluminação ambiente suave e grids arquiteturais calmos.
4. **Sem "S F V" em texto cru substituindo a marca:** A logo oficial é o vetor gráfico das letras estilizadas com filtro de sombra branco. Sempre use o componente `<Logo />`.
5. **Sem textos quicando palavra por palavra:** Evite animações onde cada palavra de um título pula individualmente. Prefira revelações coesas de frases inteiras com `AnimatedText`.
6. **Sem copy robótica ou buzzwords vazias:** Evite frases como *"transformamos o futuro com sinergias disruptivas e soluções holísticas"*. Seja direto, humano, confiante e foque no valor tangível para o cliente.
7. **Sem seções com caixas vazias:** Não use 3 caixas em branco dizendo *"Seu Projeto Aqui"*. Mostre conceitos reais de entrega (arquétipos) e convide para o programa de parceiros pioneiros.

### ✅ O que SEMPRE priorizar:
1. **Tipografia Editorial:** `Space Grotesk` para títulos marcantes, `Inter` para leitura fluida e fontes mono/uppercase para kickers (`// SERVIÇOS`).
2. **Paleta Dark Refinada:** 
   - Fundo base: `#08090E`
   - Superfícies/Cards: `#0E1018` e `#12131F` com bordas sutis `border-white/[0.07]`
   - Cor de assinatura: Roxo elétrico SFV (`#8A2BE2` e `#7C3AED`) usado com critério em acentos, badges e botões de ação.
3. **Microinterações Táteis:** Iluminação de borda suave no hover (`hover:border-purple-500/35`), elevação leve (`hover:-translate-y-1`) e botões com transições rápidas (200ms).
4. **Sinais Reais de Confiança:** Indicador de status ativo (`Disponível para novos projetos`), garantias de código 100% proprietário, suporte de 30 dias e meta de 90+ no Google PageSpeed.

---

## 3. Uso Oficial da Logo

- **Arquivo Vetorial:** `public/logo.svg`
  - ViewBox calibrado: `160 415 1260 545` (proporção ~2.31:1)
  - Fundo: Transparente (não possui background rígido para funcionar em qualquer superfície).
- **Componente React:** `src/components/ui/Logo.tsx`
  - Aceita props: `size` (`xs` | `sm` | `md` | `lg` | `hero`), `showText` (booleano para exibir "SFV Softwares" ao lado), `withGlow` (halo ambiente de luz roxa) e `className`.
- **Onde está aplicada:**
  - **Header (`Navbar.tsx`):** `<Logo size="sm" showText={false} withGlow={false} />` (apenas o emblema oficial)
  - **Hero (`HeroSection.tsx`):** `<Logo size="hero" withGlow />`
  - **Rodapé (`Footer.tsx`):** `<Logo size="sm" showText withGlow={false} />`

---

## 4. Stack Tecnológica & Arquitetura

- **Framework:** Next.js 16.3 (Turbopack, App Router)
  > ⚠️ **Atenção:** Em Next.js 16+, `params` em layouts e páginas assíncronas é uma `Promise`. Use sempre `const { locale } = await params;`.
- **Linguagem:** TypeScript 5 (modo estrito)
- **Biblioteca de UI:** React 19.2
- **Estilização:** Tailwind CSS v4 (`@import "tailwindcss";` com variáveis temáticas `@theme inline` em `globals.css`)
- **Animações:** Framer Motion 13
- **Ícones:** Lucide React
  - *Nota:* Lucide-react não inclui mais ícones de marcas. Para o Instagram, utilize o componente exclusivo `src/components/ui/InstagramIcon.tsx`.
- **Internacionalização (i18n):**
  - Rota dinâmica por idioma: `src/app/[locale]/page.tsx`
  - Idiomas suportados: `pt-BR` (padrão) e `en`
  - Dicionários em `src/i18n/dictionaries/pt-BR.ts` e `src/i18n/dictionaries/en.ts`
  - *Regra Crucial:* O tipo `Dictionary` é inferido de `pt-BR`. Todas as chaves criadas em `pt-BR.ts` **PRECISAM** existir exatamente iguais em `en.ts`.

---

## 5. Estrutura de Arquivos e Componentes

```
sfv-portfolio/
├── CONTEXT.md                    # Este arquivo de contexto e regras
├── CLAUDE.md                     # Links de contexto para agentes
├── AGENTS.md                     # Regras específicas do Next.js
├── public/
│   ├── logo.svg                  # Vetor da logo SFV (transparente, viewBox 160 415 1260 545)
│   └── favicon.ico               # Ícone do navegador
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        # Layout por idioma com metadados SEO e Schema.org
│   │   │   └── page.tsx          # Página principal que orquestra as seções
│   │   ├── globals.css           # Estilos globais Tailwind v4 e utilitários de vidro/fundo
│   │   ├── layout.tsx            # Root layout com Space Grotesk e Inter
│   │   └── page.tsx              # Redirecionamento automático para /[defaultLocale]
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Header fixo com Logo, scroll spy, switch de idioma e CTA
│   │   │   └── Footer.tsx        # Rodapé com Logo, links rápidos, dados de contato e direitos
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx   # Hero com Logo central, status pill, headline e trust badges
│   │   │   ├── AboutSection.tsx  # Quem Somos, posicionamento e 4 pilares de engenharia
│   │   │   ├── ServicesSection.tsx # 4 serviços com badges, tags e link direto de proposta
│   │   │   ├── ProcessSection.tsx  # Timeline de 5 passos da metodologia de entrega
│   │   │   ├── PortfolioSection.tsx# 3 conceitos/arquétipos de produtos e chamada para parceiros
│   │   │   ├── TestimonialsSection.tsx # Pilares de confiança e garantias SFV
│   │   │   └── ContactSection.tsx  # Formulário com disparo via WhatsApp e canais diretos
│   │   └── ui/
│   │       ├── AnimatedText.tsx  # Revelação de títulos sem saltos bruscos
│   │       ├── CircuitGrid.tsx   # Fundo ambiente com iluminação radial suave e grid estático
│   │       ├── GlassCard.tsx     # Cartões escuros com borda sutil e highlight no hover
│   │       ├── InstagramIcon.tsx # Vetor do ícone do Instagram
│   │       ├── Logo.tsx          # Componente React da logo SFV
│   │       └── SectionWrapper.tsx# Wrapper com animação de entrada com IntersectionObserver
│   └── i18n/
│       ├── dictionaries/
│       │   ├── pt-BR.ts          # Dicionário completo em Português
│       │   └── en.ts             # Dicionário completo em Inglês
│       └── index.ts              # Utilitários de internacionalização
```

---

## 6. Histórico de Problemas Resolvidos

1. **Bug dos 2 títulos por seção:**
   - *Causa:* O código gerado via vibecoding continha chamadas duplicadas de `<AnimatedText>` nas seções `ServicesSection`, `ProcessSection`, `PortfolioSection`, `TestimonialsSection` e `ContactSection` (uma chamada genérica e outra com `variant="heading"`).
   - *Correção:* A duplicidade foi eliminada de todas as seções, adotando a estrutura editorial com kicker (`// KICKER`) + título único + subtítulo.

2. **Remoção da estética "cara de IA" (Iteração Contínua):**
   - **Header inteligente (Smart Scroll):** O header oculta-se suavemente ao rolar a página para baixo e reaparece instantaneamente ao rolar para cima. No topo (`scrollY <= 80`) ou com menu aberto, permanece sempre visível.
   - **Header sem blur artificial:** O fundo com `backdrop-blur` foi removido por ser um clássico clichê de IA. O header agora possui superfície escura sólida e arquitetural (`#08090E`), sem caixas de pílula intermediárias.
   - **Logo isolada no topo:** Removido o texto "SFV SOFTWARES" ao lado da logo no Header, mantendo apenas a marca vetorial pura.
   - **Tagline refinada, concisa e de escala equilibrada:** Título reduzido e calibrado para *"Software e design autoral para marcas que definem o padrão."* (EN: *"Software and bespoke design for brands that set the standard."*), com escala tipográfica moderada (`text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem]` e `max-w-3xl`) para harmonizar perfeitamente com a logo sem ocupar a tela inteira.
   - **Eliminação de sombras estranhas / borrões na logo:** O filtro interno `<filter id="white-shadow">` (que causava um halo desfocado esbranquiçado e pixelado) foi completamente removido do vetor, e os `drop-shadow` neon foram substituídos por traçados vetoriais puros e nítidos. As sombras de botões e cards foram substituídas por elevações escuras naturais e sutis (`shadow-sm`, `shadow-black/50`).
   - **Fundo dinâmico com circuitos interativos que seguem o cursor:** O canvas em `CircuitGrid.tsx` rastreia o movimento do mouse (`pointermove`) e calcula traçados de circuito de PCB a 45 graus conectando os 4 a 6 nós mais próximos diretamente ao cursor, com pulsos elétricos viajando em tempo real e um terminal de chip estilizado no ponteiro do mouse.
   - **Eliminação de clichês adicionais:** Removidos a bolinha verde de status pulsante (`animate-ping`) e os 6 divisores de linha de 1px repetidos entre as seções, além de trocar botões em formato de pílula (`rounded-full`) por geometria estruturada (`rounded-lg`).

3. **Inclusão da Logo no Header e Hero:**
   - Foi criado o componente `Logo.tsx` que renderiza o vetor SFV perfeitamente centralizado, transparente e escalável.
   - A logo isolada foi integrada na barra superior (`Navbar`), no centro do `Hero` e no `Footer`.

---

## 7. Como Executar e Manter

### Comandos de Terminal
```bash
# Rodar servidor de desenvolvimento
npm run dev

# Rodar verificação e build de produção
npm run build

# Iniciar build de produção
npm run start
```

### Como Adicionar ou Modificar Textos
1. Abra `src/i18n/dictionaries/pt-BR.ts` e faça as alterações desejadas.
2. Abra `src/i18n/dictionaries/en.ts` e reflita as mesmas chaves e estrutura em inglês.
3. Rode `npm run build` para garantir que o TypeScript valide a sincronia das interfaces.

### Checklist para Novas Alterações
- [ ] O componente novo respeita as diretrizes visuais (fundo escuro, sem lasers, sem 3D excessivo)?
- [ ] Os textos foram mantidos em ambos os dicionários (`pt-BR` e `en`)?
- [ ] A logo usada veio de `@/components/ui/Logo`?
- [ ] O `npm run build` passa com código de saída 0?
