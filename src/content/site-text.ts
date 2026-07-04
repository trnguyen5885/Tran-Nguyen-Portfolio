export const siteText = {
  metadata: {
    title: "Trần Nguyên | Mobile Engineer",
    description:
      "Portfolio of Nguyen Tran Trung Nguyen, a Mobile Engineer with experience in React Native, Flutter, NFC, RESTful APIs, and mobile delivery workflows.",
  },
  navigation: {
    home: "Home",
    about: "About",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    showcase: "Showcase",
    menu: "Open navigation",
    closeMenu: "Close navigation",
    theme: "Switch color theme",
  },
  home: {
    eyebrow: "Nguyen Tran Trung Nguyen | Mobile Engineer",
    headline: "I build mobile products on a strong technical foundation with a clear focus on real user value.",
    intro:
      "My work covers React Native, Flutter, native NFC integrations, RESTful APIs, and release automation for mobile products in banking and internal platform environments.",
    viewWork: "View showcase",
    contact: "Get in touch",
    skills: "Skills & expertise",
  },
  showcase: {
    eyebrow: "Selected mobile work",
    title: "Showcase",
    intro:
      "A selection of mobile projects with delivery context, scope of responsibility, and technical highlights drawn from professional experience.",
    indexLabel: "Showcase project index",
    indexTitle: "Jump to a project",
    role: "Role",
    period: "Period",
    stack: "Stack",
    repository: "Repository",
    live: "Live project",
    productType: "Product case study",
    technicalDemoType: "Technical demo",
    technicalDemoMobileHint:
      "Optimized for portrait mobile screen recordings and focused implementation walkthroughs.",
    technicalDemoDesktopHint:
      "Suitable for landscape captures, system overviews, and broader technical walkthroughs.",
    captions: "Captions",
    videoFallback: "Your browser does not support HTML video.",
  },
  about: {
    eyebrow: "About",
    title: "Mobile Engineer Cross Platform ",
    intro:
      "I am a Mobile Engineer focused on building React Native and Flutter applications that turn business requirements into reliable mobile features for real users.",
    introSecondary:
      "My work combines mobile UI delivery, RESTful API integration, release automation, and cross-framework problem solving across banking and internal platform products.",
    cards: [
      {
        title: "Mobile Banking & NFC Workflows",
        body:
          "Building reusable native NFC capabilities for mobile banking flows, with attention to secure integration and practical product requirements.",
        emphasis:
          "VietABank ezSHOP, reusable NFC SDK modules, native Android/iOS capability, and banking feature integration.",
      },
      {
        title: "Cross-framework Mobile Engineering",
        body:
          "Working across React Native and Flutter environments, integrating modules while keeping app performance, maintainability, and product goals aligned.",
        emphasis:
          "React Native, Flutter module integration, Android, iOS, Redux, MobX-State-Tree, and Zustand.",
      },
      {
        title: "Product Delivery & Release Automation",
        body:
          "Contributing from UI polish and debugging through REST API integration, build automation, and app delivery workflows.",
        emphasis:
          "MyVNG, RESTful APIs, Fastlane, GitLab CI/CD, issue resolution, teamwork, and research-driven implementation.",
      },
    ],
    experience: "Experience",
    education: "Education & certification",
    name: "Name",
    role: "Role",
    location: "Location",
    now: "Present",
    placeholder: "Professional experience will be added here.",
    educationPlaceholder: "Education and certifications will be added here.",
    credential: "View credential",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's connect on the right opportunity.",
    intro:
      "Email is the most direct way to reach me about Mobile Engineer roles, product collaboration, or technical discussions related to mobile development.",
    email: "Send an email",
    github: "GitHub",
    linkedin: "LinkedIn",
    resume: "Available on request",
    resumeHint: "The resume contains private contact details and is available by email.",
  },
  footer: {
    note: "Mobile Engineer.",
    backToTop: "Back to top",
  },
  notFound: {
    title: "Page not found.",
    body: "The address may be outdated, or the content may have been moved.",
    action: "Return home",
  },
} as const;
