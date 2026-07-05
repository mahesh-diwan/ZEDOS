import React from 'react';
import { Calendar, ArrowRight, Rss } from 'lucide-react';
import { portfolioConfig } from '../../portfolioConfig';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
}

const articles: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Setting up a CI/CD Pipeline on AWS EC2 using GitHub Actions and Docker",
    excerpt: "A complete step-by-step walkthrough on how to automate your builds, run unit tests, publish container images to Docker Hub, and safely deploy them on AWS EC2 behind Nginx.",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    tags: ["AWS EC2", "Docker", "GitHub Actions", "Nginx", "CI/CD"],
    link: "https://mahesh1215.hashnode.dev/"
  },
  {
    id: "blog-2",
    title: "AWS Resource Tracking: Automating Inspections with Bash & AWS CLI",
    excerpt: "Infrastructure costs can spiral out of control easily. This article explores writing automated Bash utilities to list EC2 instances, S3 buckets, and Active Lambda functions, reporting them via Cron alerts.",
    date: "Dec 05, 2025",
    readTime: "5 min read",
    tags: ["AWS CLI", "Bash", "Shell Automation", "Linux", "Cron"],
    link: "https://mahesh1215.hashnode.dev/"
  },
  {
    id: "blog-3",
    title: "Containerizing a Multi-Service MERN Application for Production Reliability",
    excerpt: "A guide on optimizing Dockerfiles for React frontend builds and Node.js backend runtimes, structuring docker-compose files, and handling environmental configs securely.",
    date: "Nov 20, 2025",
    readTime: "6 min read",
    tags: ["MERN Stack", "Docker", "Compose", "DevOps", "Infrastructure"],
    link: "https://mahesh1215.hashnode.dev/"
  }
];

export const BlogView: React.FC = () => {
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# blog.md — tech writings & guides on Hashnode"}</span>
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Writings & Articles</h1>
          <p style={styles.subtitle}>
            Sharing knowledge on DevOps, Cloud Automation, and Software Engineering.
          </p>
        </div>
        <a 
          href={portfolioConfig.links.hashnode} 
          target="_blank" 
          rel="noreferrer" 
          style={styles.feedButton}
        >
          <Rss size={13} style={{ marginRight: '6px' }} />
          <span>Follow RSS Feed</span>
        </a>
      </div>

      <div style={styles.articlesList}>
        {articles.map((art) => (
          <article key={art.id} style={styles.articleCard} className="reveal project-card">
            <div style={styles.articleMeta}>
              <span style={styles.metaItem}>
                <Calendar size={12} style={{ marginRight: '4px' }} />
                {art.date}
              </span>
              <span style={styles.metaDivider}>·</span>
              <span style={styles.metaItem}>{art.readTime}</span>
            </div>

            <h3 style={styles.articleTitle}>
              <a href={art.link} target="_blank" rel="noreferrer" style={styles.titleLink} className="link-underline">
                {art.title}
              </a>
            </h3>

            <p style={styles.excerpt}>{art.excerpt}</p>

            <div style={styles.footerRow}>
              <div style={styles.tagsRow}>
                {art.tags.map((t) => (
                  <span key={t} style={styles.tagBadge}>
                    #{t}
                  </span>
                ))}
              </div>
              
              <a href={art.link} target="_blank" rel="noreferrer" style={styles.readMore} className="blog-read-more">
                <span>Read Full Article</span>
                <ArrowRight size={13} style={styles.arrowIcon} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  comment: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--syntax-comment)',
    fontSize: '13px',
    display: 'block',
    marginBottom: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '36px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    marginBottom: '4px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '14.5px',
    color: 'var(--text-dim)',
  },
  feedButton: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '11px',
    color: 'var(--accent)',
    backgroundColor: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    borderRadius: '4px',
    padding: '4px 10px',
    fontWeight: 600,
    transition: 'background-color 0.15s, opacity 0.15s',
  },
  articlesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  articleCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.18s, border-color 0.18s',
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: 'var(--text-dim)',
    marginBottom: '10px',
  },
  metaItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  metaDivider: {
    margin: '0 8px',
  },
  articleTitle: {
    fontSize: '19px',
    fontWeight: 800,
    lineHeight: '1.4',
    marginBottom: '10px',
  },
  titleLink: {
    color: 'var(--text-bright)',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  excerpt: {
    fontSize: '13.5px',
    lineHeight: '1.65',
    color: 'var(--text)',
    marginBottom: '20px',
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: 'auto',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tagBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--blue)',
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  readMore: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--accent)',
    gap: '4px',
    transition: 'opacity 0.15s',
  },
  arrowIcon: {
    transition: 'transform 0.15s',
  }
};
