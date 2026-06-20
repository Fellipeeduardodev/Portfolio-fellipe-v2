# Fellipe Eduardo — Portfolio V2

Portfolio pessoal e profissional desenvolvido para apresentar trabalhos de desenvolvimento frontend de alto nível. O projeto foi projetado seguindo princípios de **design editorial minimalista**, alta performance, acessibilidade e interações fluidas estilo **Awwwards**.

---

## 🚀 Tecnologias Core

*   **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/) (Build super rápida e leve)
*   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Arquitetura CSS moderna e de altíssima performance)
*   **Animações:** [GSAP (GreenSock)](https://gsap.com/) + `@gsap/react` (ScrollTrigger, Timelines e quickTo interpolators)
*   **Rolagem Fluida:** [Lenis Scroll](https://lenis.darkroom.engineering/) (Rolagem suave "buttery" sincronizada com o ScrollTrigger)
*   **Tipografia:** Outfit (Títulos expressivos) e Inter (Leitura confortável)
*   **Ícones:** [Lucide React](https://lucide.dev/) (Vetores geométricos limpos e nítidos)
*   **Tipagem:** TypeScript (Segurança de tipos e autocompletes robustos)

---

## ✨ Destaques de UX/UI & Motion Design

1.  **Cursor Customizado Premium:**
    *   Rastreamento fluido com inércia usando `gsap.quickTo`.
    *   Efeito de inversão de cores inteligente (`mix-blend-difference`) contra fundos claros e escuros.
    *   Correção de desfoque/blur e centralização absoluta no ponteiro (`xPercent: -50`, `yPercent: -50`), expandindo perfeitamente ao pairar sobre elementos interativos.
2.  **Transições de Layout e Entrada:**
    *   Animações de entrada direta (sem loaders obstrutivos) revelando o menu de navegação e as linhas tipográficas do Hero.
    *   Entrada em cascata (*stagger*) dos blocos informativos do Hero e das etapas de desenvolvimento.
3.  **Seção de Processo Interativa ("Da Ideia à Interface"):**
    *   Abas dinâmicas acionadas por hover (desktop) ou clique (mobile).
    *   Revelação das etapas com efeitos de clip-path e fades que se limpam sozinhos (`clearProps` do GSAP) para manter a integridade dos hovers nativos do CSS.
4.  **Linhas de Grid Editorial:**
    *   Linhas de grid verticais consistentes que cruzam todo o layout do site (Hero, Processo e Sobre), acompanhadas de coordenadas de margem conceituais (`[02 // PROCESS]`, `[03 // ABOUT]`).
5.  **Rodapé Minimalista de Alta Conversão:**
    *   Transição limpa de cores com fundo preto profundo (`#050505`) e efeito de paralaxe sutil via movimento de mouse sobre o letreiro de fundo.

---

## ♿ Acessibilidade (a11y) & SEO Técnico

*   **Indexação e SEO:** Configuração correta de tags Open Graph, Twitter Cards, tag canonical e dados estruturados avançados em **JSON-LD** (`@type: Person`) para posicionamento no Google Search.
*   **Acessibilidade de Teclado:** Links de salto rápido (`skip-to-content`), contorno visível de foco (`focus-visible`) para todos os elementos interativos, atribuição de landmarks semânticos (`<main>`, `<footer>`), e conformidade ARIA (`role="tablist"`, `aria-selected`, etc.).
*   **Reduced Motion:** Suporte à diretiva de acessibilidade de movimento do sistema operacional (`prefers-reduced-motion`), desabilitando cursores customizados e transições bruscas para garantir conforto e conformidade.
*   **Otimização de Assets:** Imagem de retrato em formato **WebP** comprimido com altíssima qualidade (redução de 94% no tamanho de carregamento).

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passo a Passo

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/Fellipeeduardodev/Portfolio-fellipe-v2.git
    cd Portfolio-fellipe-v2
    ```

2.  **Instalar as dependências:**
    ```bash
    npm install
    ```

3.  **Executar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *O projeto iniciará por padrão em `http://localhost:3000`.*

4.  **Compilar para produção (Build):**
    ```bash
    npm run build
    ```
    *Gera os arquivos estáticos e otimizados prontos para deploy na pasta `dist/`.*
