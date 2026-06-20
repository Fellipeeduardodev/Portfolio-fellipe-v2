# Fellipe Eduardo — Portfolio V2

![Licença](https://img.shields.io/github/license/Fellipeeduardodev/Portfolio-fellipe-v2?color=0a0a0a&style=flat-square)
![React Version](https://img.shields.io/badge/react-19.0.0-blue?style=flat-square&color=0a0a0a)
![Vite Version](https://img.shields.io/badge/vite-6.2.3-blue?style=flat-square&color=0a0a0a)
![Tailwind Version](https://img.shields.io/badge/tailwindcss-4.0-blue?style=flat-square&color=0a0a0a)

Website pessoal e profissional desenvolvido para expor projetos de desenvolvimento de software com foco em engenharia de interface frontend, animações de alta performance e usabilidade excepcional. Projetado com estética editorial minimalista, tipografia marcante e navegação fluida de alto padrão.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza um conjunto de tecnologias modernas focadas em performance de carregamento, renderização eficiente e integridade estrutural:

*   **React 19:** Estrutura de componentes robusta e gerenciamento de estado declarativo.
*   **Vite 6:** Ambiente de build extremamente veloz e otimizado para o ecossistema frontend atual.
*   **Tailwind CSS v4:** Estilização moderna e de alta performance através de utilitários nativos e compilação otimizada.
*   **TypeScript:** Segurança de tipos completa no desenvolvimento de todos os componentes e interações.
*   **GSAP (GreenSock) & ScrollTrigger:** Motor de animação profissional para controle milimétrico de timelines e efeitos baseados em scroll.
*   **Lenis:** Biblioteca de rolagem suave (*smooth scrolling*) sincronizada com precisão ao ScrollTrigger para evitar travamentos de tela.
*   **Lucide Icons:** Conjunto de ícones vetoriais limpos e geométricos.

---

## ✨ Destaques de Design & Motion

O portfólio implementa práticas recomendadas em interfaces premium (estilo *Awwwards*):

1.  **Cursor Customizado Fluido:**
    *   Interpolação de movimento baseada em inércia (`gsap.quickTo`) para suavidade máxima no rastreamento.
    *   Mesclagem de cor dinâmica (`mix-blend-difference`) que ajusta o contraste do cursor automaticamente ao passar por fundos claros e escuros.
2.  **Transições de Layout Elegantes:**
    *   Entrada suave dos elementos do menu e revelação sequencial (*stagger*) da tipografia do Hero.
3.  **Seção de Processo Interativa:**
    *   Acordeão e abas interativas integradas para desktop e mobile, adaptando a experiência de navegação conforme o dispositivo.
    *   Gerenciamento dinâmico de estados e limpeza de propriedades de transição (`clearProps`) para manter a fidelidade do layout em diferentes telas.
4.  **Grid Editorial Fiel:**
    *   Linhas de marcação verticais consistentes que estruturam o conteúdo visual de ponta a ponta.

---

## ♿ Acessibilidade (a11y) & SEO Técnico

*   **SEO Avançado:** Dados estruturados estruturados em **JSON-LD** (`@type: Person`) para correta indexação no Google Search, tags Open Graph completas e estrutura canônica.
*   **Navegação por Teclado:** Suporte completo com links de pulo de conteúdo (*skip links*), focos de teclado claramente visíveis (`focus-visible`) e propriedades ARIA funcionais nos seletores.
*   **Redução de Movimento:** Respeito à diretiva do sistema operacional (`prefers-reduced-motion`). Quando ativa, as animações pesadas e o cursor customizado são desativados para preservar a usabilidade e o conforto do usuário.
*   **Carregamento Otimizado:** Imagens comprimidas e carregamento sob demanda para garantir a melhor pontuação de performance no Lighthouse.

---

## 🛠️ Executando o Projeto Localmente

### Pré-requisitos
*   [Node.js](https://nodejs.org/) (recomendado v18+)
*   Gerenciador de pacotes `npm` ou `yarn`

### Instalação

1.  Clone este repositório:
    ```bash
    git clone https://github.com/Fellipeeduardodev/Portfolio-fellipe-v2.git
    ```

2.  Acesse o diretório do projeto:
    ```bash
    cd Portfolio-fellipe-v2
    ```

3.  Instale as dependências necessárias:
    ```bash
    npm install
    ```

4.  Execute o ambiente de desenvolvimento local:
    ```bash
    npm run dev
    ```
    *O projeto estará disponível por padrão em `http://localhost:3000`.*

5.  Gere a versão otimizada de produção (Build):
    ```bash
    npm run build
    ```
    *Os arquivos estáticos prontos para deploy estarão localizados na pasta `dist/`.*
