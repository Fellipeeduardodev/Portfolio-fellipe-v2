export type Language = "pt" | "en";

export interface TranslationDictionary {
  nav: {
    projects: string;
    about: string;
    contact: string;
    available: string;
    toggleTheme: string;
    toggleLang: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    microRole: string;
    microLocation: string;
    microFocusLabel: string;
    microFocusItems: string[];
    microStatus: string;
    words: string[];
    headlineLine1: string;
    headlineLine2: string;
    bio: string;
    viewProjects: string;
    contactMe: string;
  };
  preview: {
    navProjects: string;
    navAbout: string;
    navContact: string;
    navButton: string;
    tag: string;
    headline1: string;
    headline2: string;
    headline3: string;
    subtitleLine1: string;
    subtitleLine2: string;
    button: string;
    feedback: string;
    role: string;
    location: string;
    focusLabel: string;
    focusItem1: string;
    focusItem2: string;
    focusItem3: string;
    status: string;
    bottomTitle: string;
    bottomTech: string;
  };
  projects: {
    sectionTag: string;
    title1: string;
    title2: string;
    subtitle: string;
    p1: {
      tag: string;
      category: string;
      status: string;
      title: string;
      subtitle: string;
      description: string;
      feature1Label: string;
      feature1Value: string;
      feature1Desc: string;
      feature2Label: string;
      feature2Value: string;
      feature2Desc: string;
      repoBtn: string;
      liveBtn: string;
    };
    p2: {
      tag: string;
      badge: string;
      title: string;
      description: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
  };
  about: {
    sectionTag: string;
    title1: string;
    title2: string;
    subtitle: string;
    bioLabel: string;
    bioHeading: string;
    bio1: string;
    bio2: string;
    downloadCv: string;
    pillar1Label: string;
    pillar1Val: string;
    pillar1Sub: string;
    pillar2Label: string;
    pillar2Val: string;
    pillar2Sub: string;
    pillar3Label: string;
    pillar3Val: string;
    pillar3Sub: string;
    eduTag: string;
    eduTitle: string;
    eduLink: string;
    stackTitle: string;
    stackSubtitle: string;
    phaseLabel: string;
    visitLabel: string;
    courses: Array<{
      period: string;
      institution: string;
      course: string;
      focus: string;
      type: string;
      badge: string;
      statusType: "future" | "completed" | "progress";
      link?: string;
      featured?: boolean;
    }>;
  };
  footer: {
    sectionTag: string;
    headlineMain: string;
    headlineAccent: string;
    subtitle: string;
    cta: string;
    copyEmail: string;
    copied: string;
    role: string;
    location: string;
    status: string;
    pitch: string;
    stackTitle: string;
    socialTitle: string;
    socialResponse: string;
    colophonRole: string;
    colophonTech: string;
    rights: string;
    backToTop: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  pt: {
    nav: {
      projects: "Projetos",
      about: "Sobre mim",
      contact: "Contato",
      available: "Disponível para projetos",
      toggleTheme: "Alternar tema (Claro / Escuro)",
      toggleLang: "Mudar idioma",
      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
    },
    hero: {
      microRole: "Desenvolvedor Web",
      microLocation: "São Paulo, Brasil",
      microFocusLabel: "Foco de Atuação",
      microFocusItems: ["React & TypeScript", "UI & Animações", "Código Limpo & Performance"],
      microStatus: "Disponível para projetos",
      words: ["CÓDIGO", "INTERFACE", "PERFORMANCE"],
      headlineLine1: "DO DESIGN",
      headlineLine2: "AO CÓDIGO.",
      bio: "Desenvolvedor web focado em transformar ideias e layouts em código limpo, interfaces interativas e experiências digitais bem acabadas.",
      viewProjects: "Ver Projetos",
      contactMe: "Vamos Conversar",
    },
    preview: {
      navProjects: "PROJETOS",
      navAbout: "SOBRE MIM",
      navContact: "CONTATO",
      navButton: "CONTATO ↗",
      tag: "UI / UX",
      headline1: "DO",
      headline2: "DESIGN",
      headline3: "AO CÓDIGO.",
      subtitleLine1: "Desenvolvo websites e produtos digitais com foco em",
      subtitleLine2: "performance, clareza e experiência do usuário.",
      button: "Vamos Conversar",
      feedback: "CONTATO ↗",
      role: "DESENVOLVEDOR WEB",
      location: "SÃO PAULO, BRASIL",
      focusLabel: "FOCO DE ATUAÇÃO",
      focusItem1: "REACT & TYPESCRIPT",
      focusItem2: "UI & ANIMAÇÕES",
      focusItem3: "CÓDIGO LIMPO & PERFORMANCE",
      status: "DISPONÍVEL PARA PROJETOS",
      bottomTitle: "Demonstração Interativa da Hero",
      bottomTech: "Demonstração Interativa · SVG & GSAP",
    },
    projects: {
      sectionTag: "[ 01 // PROJETOS ]",
      title1: "PROJETOS",
      title2: "SELECIONADOS",
      subtitle: "Projetos e interfaces desenvolvidos com foco em código limpo, micro-interações e usabilidade.",
      p1: {
        tag: "[ 01 // PROJETO EM DESTAQUE ]",
        category: "Design & Desenvolvimento Web",
        status: "Online 2026",
        title: "Fellipe Eduardo — Portfolio",
        subtitle: "Site Pessoal & Portfólio",
        description: "Meu site pessoal, criado para apresentar meus projetos e a qualidade que busco em cada trabalho. Uma interface moderna, leve e responsiva, feita com foco em boa usabilidade e navegação agradável.",
        feature1Label: "Experiência",
        feature1Value: "Fluidez & Movimento",
        feature1Desc: "Animações suaves e táteis",
        feature2Label: "Velocidade",
        feature2Value: "Carregamento Rápido",
        feature2Desc: "Abertura instantânea",
        repoBtn: "Ver Repositório",
        liveBtn: "Explorar Live",
      },
      p2: {
        tag: "[ 02 // FREELANCE & OPORTUNIDADES ]",
        badge: "Disponível para projetos",
        title: "Bora construir uma interface moderna juntos?",
        description: "Estou disponível para projetos freelance, novos websites e oportunidades de desenvolvimento. Se você tem um design no Figma ou uma ideia no papel e precisa de código limpo, responsivo e bem animado, me manda uma mensagem.",
        bullet1: "Fidelidade ao Design",
        bullet2: "React, TS & Tailwind",
        bullet3: "Animações Fluidas",
        cta: "Vamos Conversar",
      },
    },
    about: {
      sectionTag: "[ 02 // SOBRE MIM ]",
      title1: "POR TRÁS",
      title2: "DO CÓDIGO",
      subtitle: "Estudo diário, código limpo e foco absoluto em construir interfaces modernas.",
      bioLabel: "Trajetória & Identidade",
      bioHeading: "Interfaces fluidas, atenção aos detalhes e evolução técnica constante.",
      bio1: "Comecei na programação há 1 ano e, desde então, estudo diariamente para me aprimorar como desenvolvedor. Meu foco é construir interfaces modernas, fluidas e com alto nível de acabamento técnico.",
      bio2: "Dedico meu tempo aprofundando conceitos de design de interface, animações fluidas e arquitetura de componentes com React e TypeScript. Em 2027, inicio minha graduação em Análise e Desenvolvimento de Sistemas (ADS) na FIAP.",
      downloadCv: "Baixar Currículo (PDF)",
      pillar1Label: "Jornada",
      pillar1Val: "1 Ano de Código",
      pillar1Sub: "Estudo e prática diária",
      pillar2Label: "Acadêmico",
      pillar2Val: "FIAP — ADS",
      pillar2Sub: "Graduação em 2027",
      pillar3Label: "Foco",
      pillar3Val: "Desenvolvimento Web",
      pillar3Sub: "UI, Animações & Código",
      eduTag: "[ FORMAÇÃO & JORNADA ]",
      eduTitle: "Cursos & Graduação",
      eduLink: "Ver Certificados no LinkedIn",
      stackTitle: "Stacks e Tecnologias",
      stackSubtitle: "Ferramentas, linguagens e tecnologias em uso contínuo",
      phaseLabel: "FASE",
      visitLabel: "Acessar",
      courses: [
        {
          period: "2027 — Futuro",
          institution: "FIAP",
          course: "Graduação em Análise e Desenvolvimento de Sistemas (ADS)",
          focus: "Engenharia de Software, Aplicações Modernas, Arquitetura de Sistemas & Inteligência Artificial.",
          type: "Graduação Superior",
          badge: "Início em 2027",
          statusType: "future",
          link: "https://www.fiap.com.br",
          featured: true,
        },
        {
          period: "2025",
          institution: "Origamid",
          course: "UI Design & Front-End",
          focus: "Design de interfaces no Figma, Design Systems, tipografia e desenvolvimento Front-End com HTML, CSS Grid/Flexbox, JavaScript ES6+ e React.",
          type: "Formação Front-End & UI",
          badge: "Concluído",
          statusType: "completed",
          link: "https://www.origamid.com",
          featured: false,
        },
        {
          period: "2025 — Presente",
          institution: "FreeCodeCamp",
          course: "Scientific Computing with Python",
          focus: "Lógica computacional, estruturas de dados, algoritmos fundamentais e automação.",
          type: "Certificação Internacional",
          badge: "Em Desenvolvimento",
          statusType: "progress",
          link: "https://www.freecodecamp.org",
          featured: false,
        },
      ],
    },
    footer: {
      sectionTag: "[ CONTATO // DISPONIBILIDADE IMEDIATA ]",
      headlineMain: "Bora construir algo",
      headlineAccent: "incrível juntos?",
      subtitle: "Disponível para freelance, projetos web e novas oportunidades. Se quiser trocar uma ideia sobre código ou tirar um projeto do papel, é só chamar.",
      cta: "Vamos Conversar",
      copyEmail: "Copiar",
      copied: "E-mail copiado!",
      role: "Desenvolvedor Web",
      location: "São Paulo, Brasil · UTC-3",
      status: "Disponível para novos projetos",
      pitch: "Foco em código limpo, interfaces interativas e alta fidelidade visual.",
      stackTitle: "Tecnologias em Uso",
      socialTitle: "Redes & Contato",
      socialResponse: "Resposta < 24h",
      colophonRole: "Desenvolvedor Web",
      colophonTech: "Construído com React, TypeScript & Tailwind",
      rights: "Todos os direitos reservados.",
      backToTop: "Voltar ao topo",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
      available: "Available for projects",
      toggleTheme: "Toggle theme (Light / Dark)",
      toggleLang: "Switch language",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      microRole: "Web Developer",
      microLocation: "São Paulo, Brazil",
      microFocusLabel: "Core Focus",
      microFocusItems: ["React & TypeScript", "UI & Motion", "Clean Code & Performance"],
      microStatus: "Available for projects",
      words: ["CODE", "INTERFACE", "PERFORMANCE"],
      headlineLine1: "FROM DESIGN",
      headlineLine2: "TO CODE.",
      bio: "Web developer focused on turning ideas and layouts into clean code, interactive interfaces, and polished digital experiences.",
      viewProjects: "View Projects",
      contactMe: "Let's Talk",
    },
    preview: {
      navProjects: "PROJECTS",
      navAbout: "ABOUT",
      navContact: "CONTACT",
      navButton: "CONTACT ↗",
      tag: "UI / UX",
      headline1: "FROM",
      headline2: "DESIGN",
      headline3: "TO CODE.",
      subtitleLine1: "Developing websites and digital products focused on",
      subtitleLine2: "performance, clarity, and user experience.",
      button: "Let's Talk",
      feedback: "CONTACT ↗",
      role: "WEB DEVELOPER",
      location: "SÃO PAULO, BRAZIL",
      focusLabel: "CORE FOCUS",
      focusItem1: "REACT & TYPESCRIPT",
      focusItem2: "UI & ANIMATIONS",
      focusItem3: "CLEAN CODE & PERFORMANCE",
      status: "AVAILABLE FOR PROJECTS",
      bottomTitle: "Interactive Hero Showcase",
      bottomTech: "Interactive Demonstration · SVG & GSAP",
    },
    projects: {
      sectionTag: "[ 01 // PROJECTS ]",
      title1: "SELECTED",
      title2: "WORKS",
      subtitle: "Projects and digital interfaces developed with focus on clean code, micro-interactions, and usability.",
      p1: {
        tag: "[ 01 // FEATURED PROJECT ]",
        category: "Web Design & Development",
        status: "Online 2026",
        title: "Fellipe Eduardo — Portfolio",
        subtitle: "Personal Portfolio & Showcase",
        description: "My personal website, created to showcase my projects and the attention to detail I bring to every build. Fast, modern, and responsive, designed for an intuitive and enjoyable user experience.",
        feature1Label: "Experience",
        feature1Value: "Fluid Motion",
        feature1Desc: "Smooth & tactile animations",
        feature2Label: "Speed",
        feature2Value: "Lightning Fast",
        feature2Desc: "Instantaneous rendering",
        repoBtn: "View Repository",
        liveBtn: "Explore Live",
      },
      p2: {
        tag: "[ 02 // FREELANCE & OPPORTUNITIES ]",
        badge: "Available for work",
        title: "Ready to build a modern interface together?",
        description: "I'm available for freelance projects, new websites, and engineering opportunities. If you have a Figma design or an idea on paper and need clean, responsive, and animated code, feel free to reach out.",
        bullet1: "Pixel-Perfect Fidelity",
        bullet2: "React, TS & Tailwind",
        bullet3: "60fps Fluid Motion",
        cta: "Let's Talk",
      },
    },
    about: {
      sectionTag: "[ 02 // ABOUT ]",
      title1: "BEHIND",
      title2: "THE CODE",
      subtitle: "Continuous learning, clean code, and relentless focus on building modern interfaces.",
      bioLabel: "Journey & Craft",
      bioHeading: "Fluid interfaces, obsessive attention to detail, and non-stop craft.",
      bio1: "I started programming 1 year ago and study daily to hone my craft. My focus is building modern, fluid interfaces with an exceptional level of technical finish.",
      bio2: "I dedicate my time to mastering interface design concepts, smooth animations, and component architecture with React and TypeScript. In 2027, I start my degree in Systems Analysis and Development (ADS) at FIAP.",
      downloadCv: "Download Resume (PDF)",
      pillar1Label: "Journey",
      pillar1Val: "1 Year of Code",
      pillar1Sub: "Daily deep practice",
      pillar2Label: "Academic",
      pillar2Val: "FIAP — ADS",
      pillar2Sub: "Degree in 2027",
      pillar3Label: "Focus",
      pillar3Val: "Web Engineering",
      pillar3Sub: "UI, Motion & Code",
      eduTag: "[ EDUCATION & PATH ]",
      eduTitle: "Courses & Degree",
      eduLink: "View Certificates on LinkedIn",
      stackTitle: "Stacks & Technologies",
      stackSubtitle: "Core tools, languages, and technologies in active production",
      phaseLabel: "PHASE",
      visitLabel: "Visit",
      courses: [
        {
          period: "2027 — Future",
          institution: "FIAP",
          course: "Systems Analysis and Development",
          focus: "Software Engineering, Modern Web Applications, Systems Architecture & AI.",
          type: "Higher Education Degree",
          badge: "Starting in 2027",
          statusType: "future",
          link: "https://www.fiap.com.br",
          featured: true,
        },
        {
          period: "2025",
          institution: "Origamid",
          course: "UI Design & Front-End",
          focus: "Interface design in Figma, Design Systems, typography, and modern Front-End development with HTML, CSS Grid/Flexbox, ES6+ JavaScript, and React.",
          type: "Front-End & UI Specialization",
          badge: "Completed",
          statusType: "completed",
          link: "https://www.origamid.com",
          featured: false,
        },
        {
          period: "2025 — Present",
          institution: "FreeCodeCamp",
          course: "Scientific Computing with Python",
          focus: "Computational thinking, data structures, fundamental algorithms, and automation.",
          type: "International Certification",
          badge: "In Progress",
          statusType: "progress",
          link: "https://www.freecodecamp.org",
          featured: false,
        },
      ],
    },
    footer: {
      sectionTag: "[ CONTACT // IMMEDIATE AVAILABILITY ]",
      headlineMain: "Let's build something",
      headlineAccent: "great together?",
      subtitle: "Available for freelance, web projects, and new opportunities. If you'd like to talk code or bring a project to life, feel free to reach out.",
      cta: "Let's Talk",
      copyEmail: "Copy",
      copied: "Email copied!",
      role: "Web Developer",
      location: "São Paulo, Brazil · UTC-3",
      status: "Available for new projects",
      pitch: "Focused on clean code, interactive interfaces, and high visual fidelity.",
      stackTitle: "Technologies in Use",
      socialTitle: "Networks & Contact",
      socialResponse: "Response < 24h",
      colophonRole: "Web Developer",
      colophonTech: "Built with React, TypeScript & Tailwind",
      rights: "All rights reserved.",
      backToTop: "Back to top",
    },
  },
};
