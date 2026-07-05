import React, { useState } from 'react';
import { Calendar, ArrowRight, Rss, Search, Tag, X } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((art) => art.tags))
  );

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag ? art.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# blog.md — tech articles & deployment guides"}</span>
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Writings & Articles</h1>
          <p style={styles.subtitle}>
            Sharing knowledge on DevOps infrastructure, cloud automation pipelines, and Linux administration.
          </p>
        </div>
        <a 
          href={portfolioConfig.links.hashnode} 
          target="_blank" 
          rel="noreferrer" 
          style={styles.feedButton}
          className="feed-btn"
        >
          <Rss size={13} style={{ marginRight: '6px' }} />
          <span>Follow RSS Feed</span>
        </a>
      </div>

      {/* Search & Filtering Area */}
      <div style={styles.searchFilterBlock}>
        <div style={styles.searchRow}>
          <Search size={14} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search articles by title, content, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {searchQuery && (
            <button style={styles.clearBtn} onClick={() => setSearchQuery('')}>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Tag pills row */}
        <div style={styles.tagsRow}>
          <span style={styles.filterLabel}>
            <Tag size={11} style={{ marginRight: '4px' }} /> Filter:
          </span>
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                style={{
                  ...styles.tagFilterBtn,
                  backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-terminal)',
                  color: isSelected ? '#ffffff' : 'var(--text-dim)',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                }}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
              >
                {tag}
              </button>
            );
          })}
          {selectedTag && (
            <button 
              style={styles.clearTagBtn}
              onClick={() => setSelectedTag(null)}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Articles List */}
      <div style={styles.articlesList}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => (
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
                <div style={styles.tagsRowInline}>
                  {art.tags.map((t) => (
                    <span 
                      key={t} 
                      style={{
                        ...styles.tagBadge,
                        backgroundColor: selectedTag === t ? 'var(--accent-dim)' : 'rgba(59, 130, 246, 0.06)',
                        color: selectedTag === t ? 'var(--accent)' : 'var(--blue)',
                      }}
                      onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                    >
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
          ))
        ) : (
          <div style={styles.noResults}>
            <p>No articles match your search or filter tags.</p>
            <button 
              style={styles.resetSearchBtn}
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
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
    marginBottom: '24px',
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
  searchFilterBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
  },
  searchRow: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--text-dim)',
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '10px 12px 10px 36px',
    color: 'var(--text-bright)',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  clearBtn: {
    position: 'absolute',
    right: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-dim)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
    fontSize: '11.5px',
  },
  filterLabel: {
    color: 'var(--text-bright)',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
  },
  tagFilterBtn: {
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '2px 10px',
    fontSize: '11px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
  },
  clearTagBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--error)',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: 600,
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
    marginTop: 0,
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
  tagsRowInline: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tagBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
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
  },
  noResults: {
    textAlign: 'center',
    padding: '40px 16px',
    color: 'var(--text-dim)',
    fontSize: '14px',
  },
  resetSearchBtn: {
    backgroundColor: 'var(--accent)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '12px',
  },
};
