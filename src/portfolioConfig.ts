export interface Project {
  id: string;
  name: string;
  desc: string;
  type: string;
  tags: string[];
  link: string;
  demo?: string;
  accent: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  desc: string;
  tags: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  minor?: string;
  period: string;
  gpa?: string;
  details?: string;
}

export interface SkillGroup {
  group: string;
  items: { name: string; pct: number; color: string }[];
}

export const portfolioConfig = {
  name: "Mahesh Diwan",
  titleName: "Mahesh Diwan",
  role: "DevOps & Cloud Engineer",
  location: "Pune, India 🇮🇳",
  email: "diwanmahesh11@gmail.com",
  githubUsername: "mahesh-diwan",
  bioShort: "DevOps Engineer · AWS ECS/EKS deployments, Kubernetes configs, and GitHub Actions automation.",
  bioLong: "Hi, Mahesh here! I am a DevOps-focused CS graduate with internship experience deploying containerized MERN-stack and microservice applications on AWS ECS, EKS, and EC2. I am comfortable with writing Kubernetes manifests, configuring HPA autoscalers, provisioning clusters via eksctl, building CI/CD automation, and troubleshooting production deployment issues. In my spare time, I write articles on Hashnode, track running AWS resources, and explore open-source DevOps utilities.",
  bioBullets: [
    { icon: "🚀", text: "Deployed MERN stack to", boldText: "AWS ECS (Fargate) & EKS", afterText: "running Task definitions and ALB targets" },
    { icon: "🛠️", text: "Authored K8s manifests for", boldText: "Deployments, Services, HPAs", afterText: "ConfigMaps, and Secrets" },
    { icon: "📦", text: "Built GitHub Actions pipelines for", boldText: "Docker build → ECR push", afterText: "→ rolling ECS/EC2 deployments" },
    { icon: "✍️", text: "Configured CloudWatch alarms and", boldText: "wrote technical articles", afterText: "on Hashnode guides" },
  ],
  links: {
    github: "https://github.com/mahesh-diwan",
    linkedin: "https://www.linkedin.com/in/mahesh-diwan/",
    medium: "https://mahesh1215.hashnode.dev/",
    leetcode: "https://leetcode.com/mahesh-diwan",
    instagram: "https://www.instagram.com/mahesh_diwan1",
    coffee: "https://buymeacoffee.com/mahesh-diwan",
    upi: "diwanmahesh11@ybl",
    resume: "/Mahesh_Diwan_Resume.pdf",
    hashnode: "https://mahesh1215.hashnode.dev/",
    twitter: "https://x.com/mahesh_diwan1",
  },
  education: [
    {
      id: "edu-1",
      institution: "Marathwada Mitra Mandal’s Institute of Technology (MMIT)",
      degree: "Bachelor of Engineering in Computer Science",
      minor: "Relevant: Cloud Architectures, Operating Systems, Computer Networks",
      period: "2023 — 2026",
      gpa: "CGPA: 8.7 / 10",
      details: "DevOps tools research, containerized application orchestration experiments."
    },
    {
      id: "edu-2",
      institution: "Government Polytechnic Jalna",
      degree: "Diploma in Computer Engineering",
      period: "2021 — 2023",
      gpa: "Aggregate: 84.00%",
      details: "Systems architecture basics, Bash automation scripting, Linux admin basics."
    }
  ] as Education[],
  experience: [
    {
      id: "exp-1",
      company: "ThynkTech India",
      role: "Associate Software Engineer (DevOps Intern)",
      date: "Dec 2025 — May 2026",
      desc: "Deployed MERN-stack apps to AWS ECS (Fargate) and EKS configuring target groups and HPA autoscaling. Authored K8s Deployments, Services, ConfigMaps, Secrets and eksctl provisioning. Set up CloudWatch alarms on ECS CPU/memory metrics and tightened IAM policies. Built GitHub Actions pipelines for Docker build -> push ECR -> rolling ECS deploy.",
      tags: ["AWS ECS/EKS", "Kubernetes", "Docker", "GitHub Actions", "CloudWatch", "IAM", "VPC", "Nginx"],
      current: true
    },
    {
      id: "exp-2",
      company: "Personal Projects & Automation",
      role: "DevOps & Cloud Automation Developer",
      date: "Jan 2024 — Present",
      desc: "Automated application build configurations and multi-environment setups. Written custom Bash & Python infrastructure auditing utilities to track AWS running resources and reduce costs. Implemented SSL certificates and reversed proxy routers using Nginx configurations on EC2.",
      tags: ["Bash Scripting", "Python", "Docker Compose", "Terraform", "Prometheus", "Linux", "Git"],
      current: false
    }
  ] as Experience[],
  projects: [
    {
      id: "proj-1",
      name: "LinkedIn Clone MERN",
      desc: "Full-stack social platform containerized with Docker Compose. Deployed to AWS ECS Fargate behind an ALB and migrated to EKS with horizontal pod autoscaling. CI/CD automated via GitHub Actions building and pushing to ECR with Prometheus logging and Terraform HCL definitions.",
      type: "DevOps · Cloud · MERN",
      tags: ["Docker", "AWS ECS/EKS", "ECR", "Terraform", "Prometheus", "GitHub Actions", "React", "Node.js", "MongoDB"],
      link: "https://github.com/mahesh-diwan/LinkedIn-Clone-EKS",
      accent: "#61afef",
      icon: "🐳"
    },
    {
      id: "proj-2",
      name: "Distributed Voting App",
      desc: "Orchestrated a five-microservice system (Python frontend, C# worker, Node.js results API, Redis, and PostgreSQL) with Kubernetes manifests and Docker Compose configurations utilizing internal cluster DNS.",
      type: "Containers · Kubernetes",
      tags: ["Kubernetes", "Docker Compose", "Python", "Node.js", "C#", "Redis", "PostgreSQL"],
      link: "https://github.com/mahesh-diwan/Distributed-Voting-App",
      accent: "#98c379",
      icon: "☸️"
    },
    {
      id: "proj-3",
      name: "CI/CD Flask App AWS",
      desc: "Automated testing and continuous deployment pipeline to AWS EC2 instance using GitHub Actions. Integrated Docker image packaging to guarantee consistent environment variables across runtime stages.",
      type: "DevOps · CI/CD",
      tags: ["Flask", "GitHub Actions", "Docker", "AWS EC2", "Nginx"],
      link: "https://github.com/mahesh-diwan/Flask-App",
      accent: "#d19a66",
      icon: "⚙️"
    },
    {
      id: "proj-4",
      name: "Chat With PDF Tool",
      desc: "Natural-language chat interface for uploaded PDF documents. Combines semantic queries, Hugging Face Transformers, and PyPDF2 parsers in a clean, interactive Streamlit frontend workflow.",
      type: "AI/RAG · Python",
      tags: ["Python", "Streamlit", "Hugging Face", "PyPDF2", "LangChain"],
      link: "https://github.com/mahesh-diwan/chat-with-pdf",
      accent: "#fe8019",
      icon: "📖"
    },
    {
      id: "proj-5",
      name: "AWS Resource Tracker",
      desc: "Scheduled cron bash utility to inspect running cloud instances. Automatically monitors and logs active EC2 instances, S3 buckets, and Lambda triggers via AWS CLI to limit cost leakages.",
      type: "DevOps · Bash",
      tags: ["Bash", "AWS CLI", "Cron Jobs", "Linux"],
      link: "https://github.com/mahesh-diwan/AWS-Resource-Tracker",
      accent: "#c678dd",
      icon: "☁️"
    },
    {
      id: "proj-6",
      name: "Puppeteer Web Scraper",
      desc: "Efficient crawling utility built with Node.js and Puppeteer to parse and download structured data indexes, integrated with a Dockerized Flask REST API container backend.",
      type: "Backend · Web Scraping",
      tags: ["Node.js", "Puppeteer", "Flask", "Docker"],
      link: "https://github.com/mahesh-diwan/Web-Scraper",
      accent: "#56b6c2",
      icon: "🕸️"
    }
  ] as Project[],
  skills: [
    {
      group: "Languages",
      items: [
        { name: "Python", pct: 90, color: "#3572a5" },
        { name: "Bash", pct: 85, color: "#eedd11" },
        { name: "JavaScript", pct: 75, color: "#f1e05a" },
        { name: "C++", pct: 65, color: "#f34b7d" },
        { name: "Java", pct: 60, color: "#b07219" }
      ]
    },
    {
      group: "Cloud & Infra",
      items: [
        { name: "AWS (ECS, EKS, EC2)", pct: 85, color: "#ff9900" },
        { name: "Terraform", pct: 70, color: "#7b42bc" },
        { name: "Linux Administration", pct: 85, color: "#eedd11" }
      ]
    },
    {
      group: "Containers & CI/CD",
      items: [
        { name: "Docker & Compose", pct: 90, color: "#3897f0" },
        { name: "Kubernetes Manifests", pct: 80, color: "#326ce5" },
        { name: "GitHub Actions", pct: 90, color: "#f05032" },
        { name: "Jenkins & SonarQube", pct: 75, color: "#d24939" }
      ]
    }
  ] as SkillGroup[],
  otherSkills: [
    "AWS ECR", "Application Load Balancer (ALB)", "CloudWatch Dashboards", "IAM Policies",
    "ConfigMaps & Secrets", "Horizontal Pod Autoscaling (HPA)", "eksctl CLI", "Prometheus Metrics",
    "Nginx Reverse Proxy", "SSL/TLS configurations", "Prompt Design in Vertex AI (Google Cloud)",
    "Data Structures & Algorithms"
  ]
};
