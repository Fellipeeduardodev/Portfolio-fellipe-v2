---
name: Fellipe Eduardo
description: Sistema de design editorial de alto padrão para o portfólio de engenharia frontend e creative development de Fellipe Eduardo.
colors:
  primary: "#171717"
  primary-hover: "#262626"
  canvas: "#f8f8f8"
  surface: "#ffffff"
  nocturne: "#050505"
  neutral-subtle: "#e5e5e5"
  neutral-muted: "#a3a3a3"
  neutral-reading: "#737373"
  accent-signal: "#22c55e"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.8rem, 6.5vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.85
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.15em"
rounded:
  none: "0px"
  sm: "8px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#fafafa"
    rounded: "{rounded.full}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-magnetic-footer:
    backgroundColor: "#ffffff"
    textColor: "{colors.nocturne}"
    rounded: "{rounded.full}"
    padding: "20px 40px"
  header-pill:
    backgroundColor: "rgba(255, 255, 255, 0.95)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
---

# Design System: Fellipe Eduardo

## Overview

**Creative North Star: "O Minimalismo Cinematográfico"**

O sistema visual é construído sobre a premissa de que a excelência técnica se expressa com autoridade silenciosa, clareza editorial e impacto cinematográfico. Em vez de recorrer a ornamentos superficiais, a identidade ancora-se na tensão entre escalas tipográficas monumentais, um grid de precisão milimétrica e a transição deliberada entre luz (canvas claro em estúdio) e sombra (nocturne absoluto no fechamento da conversão).

A densidade do layout é arejada e controlada: grandes áreas de respiro visual permitem que a tipografia display em caixa alta lidere a narrativa sem concorrência. Elementos gráficos secundários atuam como coordenadas técnicas discretas — micro-labels em fonte monoespacada e linhas guias de 1px a 8% das margens — sustentando a atmosfera de ateliê de engenharia de software de alto padrão.

**Key Characteristics:**
- **Monocromia Editorial de Alto Contraste:** Domínio absoluto de pretos puros e papéis claros, sem dispersão cromática aleatória.
- **Tipografia Escalar e Teatral:** Títulos gigantescos em display e headline contrabalanceados por micro-legendas técnicas monospaçadas.
- **Cinemática Fluida & Tátil:** Cursor interativo invertido, magnetismo suave em botões e rolagem amortecida contínua via Lenis.
- **Dualidade Formal Rigorosa:** Contraste consciente entre botões/cabeçalho em pílula perfeita (`rounded-full`) e superfícies arquitetônicas ortogonais (`rounded-none`).

## Colors

A paleta é estritamente monocromática, estruturada em preto obsidiana, brancos de galeria e um pulso único e vivo de sinal esmeralda para disponibilidade operacional.

### Primary
- **Obsidian Black** (`#171717`): Cor primária de âncora para títulos principais, botões de ação prioritária e marca visual. Transmite peso, estabilidade e autoridade técnica.
- **Obsidian Charcoal Hover** (`#262626`): Estado hover do Obsidian Black, oferecendo transição luminosa controlada sem alterar a família tonal.

### Neutral
- **Studio Canvas** (`#f8f8f8`): Plano de fundo base do documento, simulando a textura de papel de arte fosco e reduzindo o cansaço visual do branco puro.
- **Pure White** (`#ffffff`): Utilizado em cartões de conteúdo, seções de destaque editorial e no estado contrastante do rodapé noturno.
- **Deep Nocturne** (`#050505`): Fundo profundo do rodapé de conversão, criando o clímax dramático da experiência de navegação.
- **Neutral Subtle Border** (`#e5e5e5`): Linhas divisórias ultrafinas de 1px e linhas guias estruturais do grid editorial.
- **Neutral Reading** (`#737373`): Cinza médio balanceado para parágrafos longos, garantindo legibilidade confortável e contraste WCAG AA+.
- **Neutral Muted Mono** (`#a3a3a3`): Cinza claro para micro-rótulos técnicos, índices numéricos e detalhes de suporte.

### Status / Accent
- **Signal Green** (`#22c55e`): Ponto único de cor saturada na interface inteira, reservado com exclusividade para o indicador pulsante de "Disponível para novos projetos".

### Named Rules
**The Single Signal Rule.** O verde esmeralda (`#22c55e`) nunca deve ser aplicado como cor de botão, borda decorativa ou texto de destaque. Seu uso é exclusivo para sinalizar disponibilidade e status do desenvolvedor em tempo real.

**The Absolute Monochromy Rule.** Nenhuma cor acessória adicional (azul tech, roxo SaaS, laranja marketing) é permitida no sistema estrutural. A expressividade visual deve derivar exclusivamente de escala tipográfica, contraste de valor e motion.

## Typography

**Display Font:** Outfit (com fallback sans-serif contemporâneo)  
**Body Font:** Inter (com fallback de fontes de sistema limpas)  
**Label/Mono Font:** JetBrains Mono (com fallback monospace de sistema)  

**Character:** Tensão editorial refinada entre a geometria expressiva da Outfit em pesos extremos (800/900), a neutralidade legível da Inter em peso leve (300) e o rigor funcional da JetBrains Mono em caixa alta micro-espaçada.

### Hierarchy
- **Display** (Outfit, ExtraBold/Black 800-900, `clamp(2.8rem, 6.5vw, 7.5rem)`, leading `0.95`, tracking-tight, uppercase): Usado nos títulos monumentais do Hero e aberturas de seções ("DA ESTRATÉGIA AO CÓDIGO").
- **Headline** (Outfit, Black 900, `clamp(2.5rem, 6vw, 6rem)`, leading `0.95`, uppercase): Usado na chamada de conversão final do rodapé.
- **Title** (Outfit, Medium 500, `clamp(1.5rem, 3vw, 2.25rem)`, leading `1.2`, tracking-tight): Usado em declarações de propósito ("Meu nome é Fellipe Eduardo").
- **Body** (Inter, Light 300, `15px–17px`, leading `1.85`, cor `neutral-reading`): Usado para leitura contínua, parágrafos explicativos e narrativa de processos.
- **Label** (JetBrains Mono, SemiBold 600, `9px–12px`, uppercase, tracking `[0.1em]` a `[0.2em]`): Usado para metadados, links de navegação, numeração de etapas (`[ 01 // CONTATO ]`) e tags de especialização.

### Named Rules
**The Tight Display Rule.** Títulos em fonte Display devem manter entrelinha ultracompacta (`leading-[0.9]` a `leading-[0.95]`) e caixa alta obrigatória. O espaçamento vertical excessivo entre linhas destrói o impacto arquitetônico do bloco.

**The Mono Micro-Anchor Rule.** Todo dado contextual técnico (datas, categorias, etapas, coordenadas e localização) deve ser tipografado em JetBrains Mono, com caixa alta e tracking expandido (`letterSpacing >= 0.1em`).

## Layout

O espaço é estruturado por um grid composicional de 12 colunas assimétricas contido em uma largura máxima de 1400px (com o cabeçalho estendendo-se em até 1800px no topo). 

- **Linhas Guias Marginais:** Duas linhas verticais fixas de 1px (`bg-neutral-200/30` a `40%`) posicionadas a 8% das margens esquerda e direita guiam o alinhamento de micro-âncoras e respiram com o viewport.
- **Ritmo Vertical:** Pacing editorial deliberadamente espaçado (`py-24 md:py-40`), evitando a sensação de dashboard comprimido.
- **Assimetria Funcional:** O conteúdo organiza-se em blocos com peso visual à esquerda (mensagens principais em colunas 1–7) e autoridade contextual à direita (colunas 10–12).

### Named Rules
**The 8% Margin Anchor Rule.** Em viewports desktop (md+), os metadados monospaçados e indicadores de seção devem alinhar-se à linha guia vertical localizada a 8% da margem.

## Elevation & Depth

O sistema opera com filosofia **Plano & Tonal por Padrão**. Superfícies não flutuam sobre sombras artificiais desnecessárias; a separação entre planos decorre exclusivamente de contraste de fundos (`#f8f8f8`, `#ffffff`, `#050505`) e linhas estruturais de 1px.

Sombras são estritamente ambientais e aparecem apenas como resposta ativa a estados de interação ou no encapsulamento de utilitários flutuantes.

### Shadow Vocabulary
- **Floating Header Ambient** (`0 20px 40px rgba(0, 0, 0, 0.08)`): Aplicada ao cabeçalho em formato pílula quando o scroll ultrapassa 40px, combinada com `backdrop-blur-md` e fundo semitransparente (`bg-white/95`).
- **Tactile Button Rest** (`0 1px 2px rgba(0, 0, 0, 0.02)`): Presença sutil sob o botão primário para destacá-lo ligeiramente do canvas plano.
- **Conversion Nocturne Glow** (`0 10px 35px rgba(255, 255, 255, 0.06)`): Difusão branca ultrassuave sob o botão principal do footer escuro, convidando ao toque.

### Named Rules
**The Flat-By-Default Rule.** Superfícies estáticas repousam no mesmo plano. Sombras pesadas e relevos plásticos são terminantemente proibidos em cards de conteúdo.

## Shapes

O sistema equilibra duas geometrias opostas com papéis bem delimitados:

- **Forma Pílula (`rounded-full` / `9999px`):** Reservada para elementos táteis, clicáveis ou de navegação contínua — botões primários, pílula de navegação flutuante, seletores de etapas e indicadores de status.
- **Forma Arquitetônica (`rounded-none` / `0px`):** Reservada para recipientes de imagem, molduras de retrato (`aspect-[3/4]`), linhas estruturais, divisores de seção e tabelas de dados.
- **Forma de Suporte (`rounded-md` / `8px`):** Utilizada apenas em caixas de foco acessíveis (skip links) e elementos utilitários de sistema.

### Named Rules
**The Dual Form Rule.** Nunca aplique cantos arredondados médios (`rounded-xl` ou `rounded-2xl`) em cartões ou containers de mídia. O design expressa-se ou pelo contraste nítido do ângulo reto (`rounded-none`) ou pela suavidade da pílula total (`rounded-full`).

## Components

### Buttons
- **Shape:** Pílula completa (`rounded-full`, 9999px).
- **Primary:** Fundo Obsidian Black (`#171717`), texto claro (`#fafafa`), padding generoso (`px-6 py-3.5`), tipografia sans em peso médio (`font-medium text-sm`).
- **Interação Magnética:** Rastreamento por inércia suave em relação ao cursor (`gsap.quickTo` com fator `0.35`). Ao passar o mouse, a seta embutida transaciona diagonalmente (`group-hover:translate-x-0.5 group-hover:-translate-y-0.5`).
- **Footer Magnetic CTA:** Variante de alto impacto invertida: fundo branco puro (`bg-white`), texto preto noturno (`text-black`), padding estendido (`px-10 py-5`), tipografia monoespacada em caixa alta (`font-mono text-xs md:text-sm tracking-widest font-bold`).

### Header & Navigation
- **Floating Island:** Pílula centralizada com largura dinâmica (`w-[92%]` mobile, `max-w-[800px]` em scroll desktop).
- **Material:** Fundo vítreo translúcido (`bg-white/95 backdrop-blur-md`), borda sutil (`border-neutral-200/90`) e sombra ambiente.
- **Links:** JetBrains Mono em corpo 11px, caixa alta, tracking `0.2em`, com micro-interação de sublinhado que se expande a partir do centro ao hover.

### Custom Cursor (Signature Component)
- **Modo Padrão:** Círculo sólido branco de 10px posicionado sob o ponteiro com suavização inercial (`gsap.quickTo` duração 0.35s).
- **Comportamento Óptico:** Mistura dinâmica via `mix-blend-difference`, invertendo o tom do cursor automaticamente sobre fundos claros ou escuros.
- **Hover Ativo:** Expande instantaneamente para 52px ao pairar sobre links (`<a>`), botões (`<button>`) e elementos com `role="tab"` ou `role="button"`.
- **Desativação Acessível:** Desliga-se completamente em dispositivos móveis (largura <= 768px) e quando `prefers-reduced-motion: reduce` é detectado no sistema operacional.

### Process Stages & Tabs
- **Estrutura:** Mapeamento de 5 etapas numeradas (`01` a `05`) com micro-ícones de suporte e identificador de fase.
- **Transição:** Acordeão dinâmico sincronizado no desktop e abas táteis no mobile, com limpeza de propriedades GSAP (`clearProps`) no redimensionamento.

## Do's and Don'ts

### Do:
- **Do** manter proporções monumentais nos títulos display com entrelinha compacta (`leading <= 0.95`).
- **Do** usar o verde esmeralda (`#22c55e`) unicamente para o indicador pulsante de disponibilidade profissional.
- **Do** respeitar o parágrafo em peso leve (`font-light / 300`) com altura de linha relaxada (`leading >= 1.8`) para equilibrar a tipografia display pesada.
- **Do** desativar integralmente o cursor customizado e animações pesadas sob a consulta `prefers-reduced-motion: reduce`.
- **Do** preservar a grade de 12 colunas com linhas guias a 8% das bordas do viewport em telas desktop.

### Don't:
- **Don't** aplicar gradientes multicoloridos ou efeitos néon roxo/azul típicos de templates genéricos de SaaS.
- **Don't** utilizar ilustrações cartoon em 3D, ícones inflados ou emojis decorativos no fluxo editorial.
- **Don't** aplicar cantos arredondados genéricos (`rounded-xl` ou `16px`) em contêineres de imagem ou cartões de projetos; use cantos retos (`rounded-none`).
- **Don't** adicionar sombras pesadas com offset vertical artificial em blocos de conteúdo estático.
- **Don't** permitir que animações de entrada bloqueiem ou atrasem a capacidade do usuário de interagir e rolar a página.
