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
  problem?: string;
  solution?: string;
  challenges?: string;
  lessons?: string;
  metrics?: string[];
  architecture?: string;
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

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
  url: string;
}

export const portfolioConfig = {
  name: "Mahesh Diwan",
  titleName: "Mahesh Diwan",
  role: "DevOps & Cloud Engineer",
  location: "Pune, India 🇮🇳",
  email: "diwanmahesh11@gmail.com",
  githubUsername: "mahesh-diwan",
  bioShort: "DevOps & Cloud Infrastructure Engineer | AWS, Kubernetes, Terraform & CI/CD Automation",
  bioLong: "I am a DevOps and Cloud Infrastructure Engineer focused on automating container runtimes, optimizing cloud resources, and streamlining continuous integration pipelines. I specialize in building secure, zero-downtime microservice environments on AWS EKS and ECS, provisioning reusable cloud infrastructure via Terraform module configurations, and writing automation scripts. I love constructing the automated systems that make software releases fast, secure, and stress-free.",
  bioBullets: [
    { icon: "🚀", text: "Deployed MERN services onto", boldText: "AWS ECS (Fargate) & EKS clusters", afterText: "running Task definitions behind ALBs" },
    { icon: "🛠️", text: "Structured K8s manifests for", boldText: "Deployments, Services, and HPAs", afterText: "to enable automated container self-healing" },
    { icon: "📦", text: "Engineered automated pipelines for", boldText: "Docker build → ECR push", afterText: "and rolling EC2/EKS staging rollouts" },
    { icon: "✍️", text: "Monitored system health parameters and", boldText: "authored technical DevOps guides", afterText: "on Hashnode" },
  ],
  links: {
    github: "https://github.com/mahesh-diwan",
    linkedin: "https://www.linkedin.com/in/mahesh-diwan/",
    medium: "https://mahesh1215.hashnode.dev/",
    leetcode: "https://leetcode.com/mahesh_diwan",
    instagram: "https://www.instagram.com/mahesh_diwan1",
    upi: "diwanmahesh11@ybl",
    resume: "./Mahesh_Diwan_Resume.pdf",
    hashnode: "https://mahesh1215.hashnode.dev/",
    twitter: "https://x.com/mahesh_diwan1",
  },
  education: [
    {
      id: "edu-1",
      institution: "Marathwada Mitra Mandal’s Institute of Technology (MMIT)",
      degree: "Bachelor of Engineering in Computer Science",
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
    },
    {
      id: "edu-3",
      institution: "Shri Saraswati Bhuvan Prashala",
      degree: "Secondary School Certificate (SSC)",
      period: "2020",
      gpa: "Score: 91%",
      details: "English, Science, Maths "
    },
  ] as Education[],
  experience: [
    {
      id: "exp-1",
      company: "ThynkTech India",
      role: "Associate Software Engineer (DevOps Intern)",
      date: "Dec 2025 — May 2026",
      desc: "Automated deployment scaling of multi-service applications on AWS EKS and ECS (Fargate), reducing deployment lifecycle. Configured Horizontal Pod Autoscalers (HPAs) and CloudWatch monitoring alerts to scale resources dynamically. Authored secure Kubernetes manifests (Deployments, Services, ConfigMaps) and configured Secrets injection. Formed automated GitHub Actions CI/CD workflows, reducing container release pipeline latency.",
      tags: ["AWS ECS/EKS", "Kubernetes", "Docker", "GitHub Actions", "CloudWatch", "IAM", "VPC", "Nginx"],
      current: true
    },
    {
      id: "exp-2",
      company: "Personal Projects & Automation",
      role: "DevOps & Cloud Automation Developer",
      date: "Jan 2024 — Present",
      desc: "Provisioned multi-region AWS environments utilizing Terraform HCL workflows to standardize developer environments. Developed Python and Bash cloud telemetry tools, auditing active AWS infrastructure to optimize monthly sandbox costs. Configured Nginx reverse proxies with Let's Encrypt SSL encryptions on EC2, establishing secure routing paths.",
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
      tags: ["Docker", "AWS ECS/EKS", "ECR", "GitHub Actions", "React", "Node.js", "MongoDB"],
      link: "https://github.com/mahesh-diwan/linkedin-clone-mern",
      accent: "#61afef",
      icon: "🐳",
      problem: "Deploying a multi-service MERN application manually to production caused massive downtime, environment inconsistency, and lack of scaling capabilities under high traffic.",
      solution: "Containerized the services using Docker Compose, configured rolling updates on AWS ECS (Fargate) behind an Application Load Balancer, and subsequently migrated to an AWS EKS (Kubernetes) cluster utilizing Prometheus/Grafana monitoring and automated GitOps triggers.",
      challenges: "Debugging pod-to-pod networking issues during initial K8s migration, and handling database credentials securely.",
      lessons: "Mastered Kubernetes service discovery, ingress rules, and IAM role association for service accounts (IRSA).",
      metrics: [
        "Reduced code delivery latency from hours to 5 minutes via automated GitHub Actions pipelines",
        "Maintains 99.9% availability during rolling deployment upgrades by tuning K8s readiness/liveness probes",
        "Tuned Horizontal Pod Autoscaler (HPA) CPU thresholds, optimizing container costs by 35% under simulated load testing"
      ],
      architecture: "  [Dev push] -> [GitHub Actions] -> [Docker Hub/ECR]\n                                           │\n  [Users] -> [Route53] -> [ALB] -> [AWS EKS / ECS Cluster]\n                                     ├── web-api pod\n                                     ├── auth pod\n                                     └── mongodb pod"
    },
    {
      id: "proj-2",
      name: "Distributed Voting App",
      desc: "Orchestrated a five-microservice system (Python frontend, C# worker, Node.js results API, Redis, and PostgreSQL) with Kubernetes manifests and Docker Compose configurations utilizing internal cluster DNS.",
      type: "Containers · Kubernetes",
      tags: ["Kubernetes", "Docker Compose", "Python", "Node.js", "C#", "Redis", "PostgreSQL"],
      link: "https://github.com/mahesh-diwan/voting-app",
      accent: "#98c379",
      icon: "☸️",
      problem: "Traditional monolithic voting systems suffer from single points of failure, scaling constraints, and lack multi-language service interoperability.",
      solution: "Refactored the application into five microservices (Python frontend, C# worker, Node.js results API, Redis, and PostgreSQL). Orchestrated them using Kubernetes Deployments and Services with internal ClusterDNS resolution.",
      challenges: "Handling data consistency between the Python frontend voting logs, Redis cache queuing, and the C# worker database writes.",
      lessons: "Understood Redis pub/sub queue patterns, persistent volumes (PV/PVC) in Kubernetes, and handling container restart back-offs.",
      metrics: [
        "Sustained processing of 10,000+ concurrent requests during Apache Bench load testing",
        "Achieved sub-50ms query response latency by implementing Redis caching queues",
        "Configured Kubernetes self-healing probes, recovering failed pods in <3 seconds"
      ],
      architecture: "  [Vote Cast] -> [Python UI] -> [Redis Queue] -> [C# Worker] -> [PostgreSQL]\n                                                                    │\n  [Live Results] <---------- [NodeJS API] <-------------------------┘"
    },
    {
      id: "proj-3",
      name: "CI/CD Flask App AWS",
      desc: "Automated testing and continuous deployment pipeline to AWS EC2 instance using GitHub Actions. Integrated Docker image packaging to guarantee consistent environment variables across runtime stages.",
      type: "DevOps · CI/CD",
      tags: ["Flask", "GitHub Actions", "Docker", "AWS EC2", "Nginx"],
      link: "https://github.com/mahesh-diwan/Flask-App",
      accent: "#d19a66",
      icon: "⚙️",
      problem: "Lack of automated test verification and slow manual SSH deployment steps on AWS EC2 instances increased deployment errors and slowed feature iteration.",
      solution: "Designed a clean CI/CD automation pipeline using GitHub Actions that triggers on every commit, runs PyTest suites, builds a slim Docker container, and performs SSH deployments to EC2 instances using secure SSH runners.",
      challenges: "Managing SSH key security in public runners and setting up automated rollback triggers when unit tests failed.",
      lessons: "Learned how to set up GitHub Secrets, build secure Docker base images, and write robust bash deployment scripts.",
      metrics: [
        "Automated SSH deployment runners, completing code delivery in under 2 minutes",
        "Integrated PyTest automation, ensuring 100% test coverage before production rollouts",
        "Configured automated Docker image rollback targets on failed staging health checks"
      ],
      architecture: "  [Code Push] -> [GHA runner] -> [Build Docker Image] -> [Test Pass]\n                                                               │ (SSH)\n  [Target EC2 Instance] <- [Docker Run alpine:nginx] <─────────┘"
    },
    {
      id: "proj-4",
      name: "Chat With PDF Tool",
      desc: "Natural-language chat interface for uploaded PDF documents. Combines semantic queries, Hugging Face Transformers, and PyPDF2 parsers in a clean, interactive Streamlit frontend workflow.",
      type: "AI/RAG · Python",
      tags: ["Python", "Streamlit", "Hugging Face", "PyPDF2", "LangChain"],
      link: "https://github.com/mahesh-diwan/chat-with-pdf",
      accent: "#fe8019",
      icon: "📖",
      problem: "Extracting reference answers and reading through massive multi-page PDF documents is time-consuming and inefficient for researchers.",
      solution: "Developed a Python application powered by LangChain and Hugging Face Transformers to parse text, chunk paragraphs, store vector indices, and answer natural language prompts in an interactive Streamlit shell.",
      challenges: "Managing token chunk limits and handling embedded charts or table parsing errors from PyPDF2.",
      lessons: "Learned context embeddings alignment, prompt engineering guidelines, and memory handling in RAG applications.",
      metrics: [
        "Achieved semantic query response times under 2 seconds",
        "Handles concurrent vector indexing of text documents up to 50MB",
        "Increased retrieval accuracy by utilizing recursive text chunking strategies"
      ],
      architecture: "  [PDF Upload] -> [PyPDF2 Parser] -> [Recursive Chunker] -> [Vector Index]\n                                                                 │\n  [User Query] -> [Semantic Match] -> [Hugging Face LLM] -> [Answer]"
    },
    {
      id: "proj-5",
      name: "AWS Resource Tracker",
      desc: "Scheduled cron bash utility to inspect running cloud instances. Automatically monitors and logs active EC2 instances, S3 buckets, and Lambda triggers via AWS CLI to limit cost leakages.",
      type: "DevOps · Bash",
      tags: ["Bash", "AWS CLI", "Cron Jobs", "Linux"],
      link: "https://github.com/mahesh-diwan/AWS-Resource-Tracker",
      accent: "#c678dd",
      icon: "☁️",
      problem: "Forgotten cloud resources (idle EC2 instances, unattached EBS volumes, legacy Lambda functions) lead to silent monthly AWS cost leakages.",
      solution: "Wrote a lightweight Bash automation utility that schedules via cron, queries active AWS resources across EC2, S3, IAM, and Lambda using AWS CLI, and exports reports for auditing.",
      challenges: "Handling pagination in AWS CLI queries and structuring the output reports cleanly.",
      lessons: "Deepened knowledge of shell scripting, JSON parsing with jq, and AWS CLI pagination arguments.",
      metrics: [
        "Identified and flagged unattached cloud volumes, reducing sandbox billing costs by 30%",
        "Queries and compiles AWS resource logs across 4 core APIs in under 5 seconds",
        "Executes cron-scheduled audits autonomously, outputting alerts directly to logging targets"
      ],
      architecture: "  [Cron Trigger] -> [Bash Script] -> [AWS CLI Query] -> [JQ Parse] -> [Log File]"
    },
    {
      id: "proj-6",
      name: "Puppeteer Web Scraper",
      desc: "Efficient crawling utility built with Node.js and Puppeteer to parse and download structured data indexes, integrated with a Dockerized Flask REST API container backend.",
      type: "Backend · Web Scraping",
      tags: ["Node.js", "Puppeteer", "Flask", "Docker"],
      link: "https://github.com/mahesh-diwan/Web-Scraper",
      accent: "#56b6c2",
      icon: "🕸️",
      problem: "Extracting nested directories and dynamic JavaScript data from websites for analytical models is slow when done manually.",
      solution: "Created an automated crawler with Node.js and Puppeteer that dynamically executes dynamic DOM actions, scrapes indices, and reports raw outputs to a Dockerized Flask backend API.",
      challenges: "Handling website rate limits, captcha checks, and asynchronous page loads.",
      lessons: "Understood headless browser configurations, Docker network links, and API rate-limiting techniques.",
      metrics: [
        "Sustained crawlers parsing 50+ dynamically loaded DOM pages per minute",
        "Maintains structured, isolated database schemas behind Docker-linked API networks",
        "Configured automated connection retry limits and error boundaries for scraping targets"
      ],
      architecture: "  [Trigger API] -> [Puppeteer headless browser] -> [Dynamic DOM Parse]\n                                                           │\n  [Flask SQLite Target] <----------- [JSON Export] <───────┘"
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
