import React from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { ExternalLink } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectsView: React.FC = () => {
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# projects.tf — DevOps infrastructure & pipeline declarations"}</span>
      
      <h1 style={styles.heading}>Projects</h1>
      <p style={styles.subtitle}>
        <span className="syntax-keyword">resource</span> <span style={{ color: 'var(--text-bright)' }}>"projects"</span> <span className="syntax-string">"catalog"</span>
      </p>

      {/* Grid of Projects */}
      <div style={styles.grid} className="projects-grid">
        {portfolioConfig.projects.map((proj) => (
          <div key={proj.id} style={styles.card} className="reveal project-card">
            {/* Top row with project Icon & Links */}
            <div style={styles.cardHeader}>
              <span style={styles.projectIcon} className="project-icon">{proj.icon}</span>
              <div style={styles.linksGroup}>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.linkButton}
                  title="Source code on GitHub"
                >
                  <GithubIcon size={12} style={{ marginRight: '4px' }} />
                  <span>GitHub ↗</span>
                </a>
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...styles.linkButton, borderColor: proj.accent, color: proj.accent }}
                    title="Live demonstration link"
                  >
                    <ExternalLink size={12} style={{ marginRight: '4px' }} />
                    <span>Live ↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Type classification */}
            <div style={{ ...styles.projectType, color: proj.accent }}>
              {proj.type}
            </div>

            {/* Project Name */}
            <h3 style={styles.projectName}>{proj.name}</h3>

            {/* Project Desc */}
            <p style={styles.projectDesc}>{proj.desc}</p>

            {/* Technologies tags list */}
            <div style={styles.tagsContainer}>
              {proj.tags.map((tag) => (
                <span key={tag} style={styles.tagBadge}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '900px',
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
  heading: {
    fontSize: '36px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    marginBottom: '8px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--text-dim)',
    marginBottom: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '16px',
  },
  card: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.2s, border-color 0.2s, background-color 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  projectIcon: {
    fontSize: '24px',
  },
  linksGroup: {
    display: 'flex',
    gap: '6px',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '11px',
    color: 'var(--text-dim)',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '3px 8px',
    fontWeight: 500,
    transition: 'color 0.15s, border-color 0.15s, background-color 0.15s',
  },
  projectType: {
    fontSize: '10.5px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    fontWeight: 600,
    marginBottom: '8px',
  },
  projectName: {
    fontSize: '18px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    marginBottom: '10px',
  },
  projectDesc: {
    fontSize: '12.5px',
    lineHeight: '1.6',
    color: 'var(--text)',
    marginBottom: '20px',
    flex: 1,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tagBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text-dim)',
    borderRadius: '4px',
    padding: '2px 6px',
  },
};
