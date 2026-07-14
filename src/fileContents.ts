export const fileRawContents = {
  'home.tsx': `import React from 'react';
import { portfolioConfig } from './portfolioConfig';

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <p className="comment">// Welcome to my developer workspace!</p>
      <h1>{portfolioConfig.name}</h1>
      <h3>{portfolioConfig.role}</h3>
      <div className="intro-actions">
        <button onClick={() => openTab('profile.yaml')}>
          view_profile()
        </button>
        <button onClick={() => openTab('projects.tf')}>
          see_projects()
        </button>
      </div>
    </div>
  );
};`,

  'profile.yaml': `# profile.yaml - Biography & Education Info
biography:
  name: Mahesh Diwan
  role: DevOps & Cloud Engineer
  location: Pune, India
  summary: >
    DevOps-focused CS graduate with internship experience deploying containerized MERN-stack and microservice applications
    on AWS ECS, EKS, and EC2. Comfortable with the full lifecycle — writing Kubernetes manifests, building GitHub Actions pipelines,
    configuring load balancers, and debugging production issues.

education:
  - institute: Marathwada Mitra Mandal's Institute of Technology (MMIT), Pune
    degree: B.E. in Computer Science Engineering
    grade: 8.7 / 10 CGPA
    period: 2023 - 2026
  - institute: Government Polytechnic Jalna
    degree: Diploma in Computer Engineering
    grade: 84.00%
    period: 2021 - 2023`,

  'projects.tf': `# projects.tf - Multi-Cloud Infrastructures & Kubernetes Deployments

resource "project" "linkedin_clone_eks" {
  name        = "LinkedIn Clone MERN - ECS / EKS"
  category    = "Containers & Cloud Orchestration"
  description = "Containerized social web app deployed to ECS Fargate and EKS. CI/CD via GitHub Actions pushing to ECR."
  tags        = ["Docker", "AWS ECS/EKS", "ECR", "Terraform", "Prometheus", "GitHub Actions"]
  source_code = "https://github.com/mahesh-diwan/LinkedIn-Clone-EKS"
}

resource "project" "distributed_voting_app" {
  name        = "Distributed Voting App - Kubernetes"
  category    = "Microservices Orchestration"
  description = "Orchestrated a five-microservice system (Python, C#, Node.js, Redis, PostgreSQL) with K8s cluster DNS."
  tags        = ["Kubernetes", "Docker Compose", "Python", "Node.js", "C#", "Redis", "PostgreSQL"]
  source_code = "https://github.com/mahesh-diwan/Distributed-Voting-App"
}

resource "project" "flask_aws_pipeline" {
  name        = "Flask App CI/CD on AWS"
  category    = "DevOps/CI-CD"
  description = "Automated deployment pipeline to AWS EC2 using GitHub Actions and Nginx reverse proxy routing."
  tags        = ["Flask", "GitHub Actions", "Docker", "AWS EC2", "Nginx"]
  source_code = "https://github.com/mahesh-diwan/Flask-App"
}

resource "project" "chat_with_pdf" {
  name        = "Chat With PDF Tool"
  category    = "AI/RAG"
  description = "Streamlit Q&A tool utilizing semantic searches, Hugging Face Transformers, and PyPDF2 parsing workflows."
  tags        = ["Python", "Streamlit", "Hugging Face", "PyPDF2", "LangChain"]
  source_code = "https://github.com/mahesh-diwan/chat-with-pdf"
}`,

  'skills.sh': `#!/bin/bash
# skills.sh - Technical Capabilities & Toolkit

declare -A languages=(
  [primary]="Python"
  [scripting]="Bash"
  [frontend]="JavaScript"
  [systems]="C++ Java"
)

declare -a cloud_and_infra=(
  "AWS (ECS, EKS, EC2, S3, ECR, ALB, CloudWatch, IAM, VPC, CloudFront)"
  "Terraform (HCL)"
  "Linux System Administration"
)

declare -a containers_and_cicd=(
  "Docker & Compose"
  "Kubernetes (Deployments, Services, HPA, ConfigMaps, Secrets)"
  "eksctl CLI"
  "GitHub Actions"
  "Jenkins"
  "SonarQube Quality Gates"
  "Prometheus Metrics"
  "Nginx Reverse Proxy & SSL"
)

echo "Ready to build, automate, and scale."`,

  'experience.dockerfile': `# experience.dockerfile - Professional Timeline

FROM education/diploma-government-polytechnic-jalna AS diploma
ENV GRADUATION="July 2023"
ENV GRADE="84.00%"

FROM education/be-mmit-pune AS degree
ENV GRADUATION="Expected June 2026"
ENV CGPA="8.7/10"

# Professional Stages
FROM experience/thynktech-india AS devops-intern
LABEL role="Associate Software Engineer (DevOps Intern)"
LABEL period="Dec 2025 - May 2026"
RUN echo "Configuring task definitions, service autoscaling, and ALB target groups on ECS Fargate / EKS..."
RUN echo "Provisioning clusters via eksctl and authoring Kubernetes Deployment manifests..."
RUN echo "Building automated GitHub Actions pipelines to push images to ECR and rolling deploy..."

FROM devops/automation-builder AS present
LABEL role="DevOps & Cloud Automation Developer"
LABEL period="January 2024 - Present"
RUN echo "Automating builds, testing workflows, and custom Bash/Python resource tracking scripts..."

CMD ["/bin/bash", "-c", "echo 'Production environment active.'"]`,

  'contact.yaml': `# contact.yaml - Get In Touch & Online Coordinates

coordinates:
  email: diwanmahesh11@gmail.com
  github: github.com/mahesh-diwan
  linkedin: linkedin.com/in/mahesh-diwan/
  hashnode: mahesh1215.hashnode.dev
  twitter: x.com/mahesh_diwan1
  leetcode: leetcode.com/mahesh-diwan

form_submission:
  method: POST
  action: https://formspree.io/f/mbdnjkpk
  fields:
    - name
    - email
    - message`,

  'blog.md': `# Technical Articles & Writings

I write about DevOps practices, cloud configuration, and software engineering.

## Recent Guides on Hashnode:

1. **Setting up a CI/CD Pipeline on AWS EC2 using GitHub Actions and Docker**
   - *How to automate builds, push Docker images, and deploy safely to Ubuntu instances.*
   - Link: https://mahesh1215.hashnode.dev/

2. **AWS Resource Tracking: Automating Inspections with Bash & AWS CLI**
   - *Writing scheduler cron utilities to track running instances and reduce billing costs.*
   - Link: https://mahesh1215.hashnode.dev/

3. **Containerizing a Multi-Service MERN Application for Production Reliability**
   - *Best practices for writing modular Dockerfiles and orchestrating Compose services.*
   - Link: https://mahesh1215.hashnode.dev/
`,

  'README.md': `# Mahesh Diwan - Portfolio Workspace v4.0

DevOps & Cloud Engineer based in Pune, India.

## Tech Summary
- **Cloud & Automation**: Docker, Kubernetes, AWS (ECS, EKS, EC2, CloudWatch, IAM), Terraform, GitHub Actions, Jenkins, Nginx, Prometheus
- **Languages**: Python, Bash, JavaScript, C++, Java

## Usage & License
- Custom adaptations designed by Mahesh Diwan.
- Under MIT License. Attribution required when referencing layouts.
`
};
