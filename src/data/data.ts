export const portfolioData = {
  name: "Souradeep Das",
  title: "Site Reliability Engineer",
  phone: "+91 8167403847",
  email: "dsouradeep728@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/souradeep-das-dgp03211407",
    github: "https://github.com/DSOURADEEP",
  },
  history: [
    {
      id: 'bofa',
      type: 'Work',
      shortTitle: "Apprentice @ Bank of America",
      role: "Apprentice",
      company: "Bank of America (BA Continuum India Pvt. Ltd.)",
      location: "Chennai, Tamil Nadu",
      dates: "Aug. 2025 – Present",
      responsibilities: [
        "Part of the SRE team in the Global Markets line of business of Bank of America.",
        "Engineering custom internal tooling and automation solutions using tech stack including python, ReactJS, MongoDB, reducing overall manual toll.",
      ],
    },
    {
      id: 'accenture',
      type: 'Work',
      shortTitle: "Packaged App Developer Intern @ Accenture",
      role: "Packaged App Developer Intern",
      company: "Accenture",
      location: "Pune, Maharashtra",
      dates: "Feb. 2025 – Jun. 2025",
      responsibilities: [
        "Contributed in the development of a banking application for a banking client from Finland(OP Group).",
        "Contributed in the backend development process for the application , optimizing API calls and ensuring low latency.",
        "Collaborated in Agile teams with documentation, testing, and Git workflows.",
      ],
    },
    {
      id: 'srm',
      type: 'Education',
      shortTitle: "B.Tech in Computer Science @ SRMIST",
      institution: "SRM Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      degree: "Bachelor of Technology in Computer Science, Specialization in Cloud Computing",
      dates: "Sept. 2021 – Jul. 2025",
    }
  ],
  projects: [
    {
      name: "Windows AI Desktop Assistant",
      tech: ["Python", "Speech Recognition", "Pyttsx3", "Tkinter"],
      dates: "Jul. 2025 – Aug. 2025",
      description: "Developed a fully functional AI-powered personal assistant for Windows that integrates voice commands, automation, and AI intelligence. Implemented features to open applications, search the web, control system functions, and provide real-time AI-generated responses using the OpenAI API. Built with Python libraries including Speech Recognition, Pyttsx3, and Tkinter for GUI automation.",
      github: "https://github.com/SDE-SOURADEEP/Iris-AI-Desktop-Assistant"
    },
    {
      name: "AlgoTradeX: Real-Time Algorithmic Trading & Backtesting Platform",
      tech: ["Python", "FastAPI", "Next.js", "Kafka", "Redis", "TimescaleDB"],
      dates: "Aug. 2025 – Oct. 2025",
      description: "High-performance trading platform for sub-second execution and real-time market depth visualization. Features a Kafka-driven data pipeline, Redis-backed atomic risk management, and vectorized backtesting. Built with a distributed architecture ensuring data integrity and concurrent order execution with atomic risk controls.",
      github: "https://github.com/DSOURADEEP/Algorithmic-Trading-and-Backtesting-Platform"
    },
    {
      name: "IaC Compliance Linter (Enterprise Edition)",
      tech: ["Python", "Terraform", "Kubernetes", "DevSecOps", "HCL2"],
      dates: "Jun. 2025 – Jul. 2025",
      description: "High-performance, modular Infrastructure-as-Code (IaC) linter for enforcing DevSecOps policies across Terraform and Kubernetes. Features a plugin-based architecture, multithreaded engine with MD5-based caching, and context-aware reporting in SARIF, JSON, and Markdown formats. Includes bundled rules for AWS S3 security, IAM compliance, and Kubernetes resource limits.",
      github: "https://github.com/DSOURADEEP/Linter---Infrastructure-as-a-Code"
    },
    {
      name: "RAG Document ChatBot",
      tech: ["Python", "NLP", "LangChain", "LLMs"],
      dates: "Jul. 2025 – Aug. 2025",
      description: "Developed a RAG chatbot using Streamlit and Hugging Face Falcon 7B Instruct. Supported PDF, TXT, and image inputs with OCR. Used local Sentence Transformers for semantic search. Added chat memory and source citations.",
      liveDemo: "https://rag--document--chatbot-rmryt6xwrpqp4frugamxvs.streamlit.app/"
    },
  ],
  skills: {
    languages: ["Python", "Java", "JavaScript (ES6)", "NoSQL"],
    frameworks: ["FastAPI", "React", "Flask", "LangChain", "TensorFlow/Keras", "Spring Boot"],
    tools: ["Git", "Maven", "Docker", "Postman", "CI/CD", "Streamlit", "Heroku/Vercel"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "H2"],
  },
};

