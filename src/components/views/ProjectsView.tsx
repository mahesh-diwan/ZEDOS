import React, { useState } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { ExternalLink, ChevronDown, ChevronUp, Cpu, Server, BarChart3, AlertCircle } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectsView: React.FC = () => {
  // First project expanded by default
  const [expandedId, setExpandedId] = useState<string | null>(portfolioConfig.projects[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# projects.tf — detailed infrastructure declarations & deployments"}</span>
      
      <h1 style={styles.heading}>Projects & Architectures</h1>
      <p style={styles.subtitle}>
        Deep dive into my system integrations, container orchestrations, and automation pipelines.
      </p>

      <div style={styles.list}>
        {portfolioConfig.projects.map((proj) => {
          const isExpanded = expandedId === proj.id;

          return (
            <div 
              key={proj.id} 
              style={{ 
                ...styles.card, 
                borderColor: isExpanded ? proj.accent : 'var(--border)',
              }}
              className="reveal project-card-custom"
            >
              {/* Card Header (Clickable) */}
              <div 
                style={styles.cardHeader} 
                onClick={() => toggleExpand(proj.id)}
              >
                <div style={styles.headerInfo}>
                  <span style={styles.projectIcon}>{proj.icon}</span>
                  <div>
                    <h3 style={styles.projectName}>{proj.name}</h3>
                    <span style={{ ...styles.projectType, color: proj.accent }}>{proj.type}</span>
                  </div>
                </div>

                <div style={styles.headerActions} onClick={(e) => e.stopPropagation()}>
                  <div style={styles.linksGroup}>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.linkButton}
                      title="Source Code"
                    >
                      <GithubIcon size={11} style={{ marginRight: '4px' }} />
                      <span>Code ↗</span>
                    </a>
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        style={{ ...styles.linkButton, borderColor: proj.accent, color: proj.accent }}
                        title="Live Demonstration"
                      >
                        <ExternalLink size={11} style={{ marginRight: '4px' }} />
                        <span>Live ↗</span>
                      </a>
                    )}
                  </div>
                  <button 
                    style={styles.toggleBtn}
                    onClick={() => toggleExpand(proj.id)}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Tag Pills */}
              <div style={styles.tagsContainer}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={styles.tagBadge}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expanded Details Accordion */}
              {isExpanded && (
                <div style={styles.expandedContent} className="animate-fade-in">
                  <hr style={styles.cardDivider} />

                  {/* Problem & Solution block */}
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailCol}>
                      <h4 style={styles.detailsSectionTitle}>
                        <AlertCircle size={13} style={{ marginRight: '6px', color: 'var(--error)' }} />
                        Problem Statement
                      </h4>
                      <p style={styles.detailText}>{proj.problem}</p>
                    </div>

                    <div style={styles.detailCol}>
                      <h4 style={styles.detailsSectionTitle}>
                        <Server size={13} style={{ marginRight: '6px', color: 'var(--success)' }} />
                        DevOps Solution
                      </h4>
                      <p style={styles.detailText}>{proj.solution}</p>
                    </div>
                  </div>

                  {/* Architecture Diagram */}
                  {proj.architecture && (
                    <div style={styles.architectureBlock}>
                      <h4 style={styles.detailsSectionTitle}>
                        <Cpu size={13} style={{ marginRight: '6px', color: 'var(--blue)' }} />
                        System Architecture Flow
                      </h4>
                      <pre style={styles.architectureCode} className="no-select">
                        {proj.architecture}
                      </pre>
                    </div>
                  )}

                  {/* Metrics Block */}
                  {proj.metrics && (
                    <div style={styles.metricsBlock}>
                      <h4 style={styles.detailsSectionTitle}>
                        <BarChart3 size={13} style={{ marginRight: '6px', color: 'var(--accent)' }} />
                        Results & Deployment Metrics
                      </h4>
                      <div style={styles.metricsGrid}>
                        {proj.metrics.map((metric, idx) => (
                          <div key={idx} style={styles.metricCard} className="glass-card">
                            <span style={styles.metricCheck}>✓</span>
                            <span style={styles.metricTextVal}>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Challenges & Lessons */}
                  <div style={styles.detailsGrid}>
                    {proj.challenges && (
                      <div style={styles.detailCol}>
                        <strong style={styles.subDetailLabel}>Challenge Faced:</strong>
                        <p style={styles.detailTextSmall}>{proj.challenges}</p>
                      </div>
                    )}
                    {proj.lessons && (
                      <div style={styles.detailCol}>
                        <strong style={styles.subDetailLabel}>Lesson Learned:</strong>
                        <p style={styles.detailTextSmall}>{proj.lessons}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
    marginBottom: '32px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '20px',
    transition: 'border-color 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    flexWrap: 'wrap',
    gap: '12px',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  projectIcon: {
    fontSize: '24px',
  },
  projectName: {
    fontSize: '18px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    margin: 0,
  },
  projectType: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
    color: 'var(--text)',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '3px 8px',
    fontWeight: 600,
    transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
  },
  toggleBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-dim)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '4px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '12px',
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
  expandedContent: {
    marginTop: '16px',
  },
  cardDivider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '12px 0 16px 0',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  detailCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailsSectionTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-bright)',
    marginBottom: '8px',
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
  },
  detailText: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: 'var(--text)',
    margin: 0,
  },
  detailTextSmall: {
    fontSize: '12.5px',
    lineHeight: '1.5',
    color: 'var(--text)',
    margin: '4px 0 0 0',
  },
  subDetailLabel: {
    fontSize: '12px',
    color: 'var(--text-bright)',
  },
  architectureBlock: {
    marginBottom: '20px',
  },
  architectureCode: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    lineHeight: '1.5',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '16px',
    overflowX: 'auto',
    color: 'var(--text-bright)',
    margin: 0,
  },
  metricsBlock: {
    marginBottom: '20px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '10px',
  },
  metricCard: {
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  metricCheck: {
    color: 'var(--success)',
    fontWeight: 'bold',
  },
  metricTextVal: {
    fontSize: '12.5px',
    color: 'var(--text-bright)',
  },
};
