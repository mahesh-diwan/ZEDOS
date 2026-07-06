import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderArchitecture = (id: string) => {
    if (id === 'proj-1') {
      return (
        <svg viewBox="0 0 800 160" width="100%" height="100%" style={{ background: 'var(--bg-terminal)', borderRadius: '6px', padding: '16px', border: '1px solid var(--border)', display: 'block' }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>
          <rect x="10" y="50" width="100" height="40" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="74" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">Dev Push</text>
          
          <path d="M 110 70 L 150 70" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="160" y="40" width="120" height="60" rx="4" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth="1" />
          <text x="220" y="68" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">GH Actions</text>
          <text x="220" y="85" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">CI/CD Pipeline</text>
          
          <path d="M 280 70 L 320 70" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="330" y="50" width="100" height="40" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="380" y="74" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">AWS ECR</text>
          
          <path d="M 430 70 L 470 70" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="480" y="50" width="80" height="40" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="520" y="74" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">AWS ALB</text>
          
          <path d="M 560 70 L 600 70" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="610" y="10" width="170" height="130" rx="6" fill="rgba(137, 180, 250, 0.03)" stroke="var(--blue)" strokeDasharray="3,3" strokeWidth="1" />
          <text x="695" y="28" fill="var(--blue)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">AWS EKS Cluster</text>
          
          <rect x="625" y="42" width="140" height="22" rx="3" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="695" y="56" fill="var(--text)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">web-api pod</text>
          
          <rect x="625" y="70" width="140" height="22" rx="3" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="695" y="84" fill="var(--text)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">auth-service pod</text>
          
          <rect x="625" y="98" width="140" height="22" rx="3" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="695" y="112" fill="var(--text)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">mongodb pod</text>
        </svg>
      );
    }
    if (id === 'proj-2') {
      return (
        <svg viewBox="0 0 800 160" width="100%" height="100%" style={{ background: 'var(--bg-terminal)', borderRadius: '6px', padding: '16px', border: '1px solid var(--border)', display: 'block' }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>
          <rect x="10" y="60" width="100" height="40" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="84" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">Vote Cast</text>
          
          <path d="M 110 80 L 140 80" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="150" y="50" width="110" height="60" rx="4" fill="rgba(166, 227, 161, 0.08)" stroke="var(--success)" strokeWidth="1" />
          <text x="205" y="78" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">Python UI</text>
          <text x="205" y="95" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">Frontend pod</text>
          
          <path d="M 260 80 L 290 80" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="300" y="50" width="110" height="60" rx="4" fill="rgba(243, 139, 168, 0.08)" stroke="var(--error)" strokeWidth="1" />
          <text x="355" y="78" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">Redis</text>
          <text x="355" y="95" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">In-memory Queue</text>
          
          <path d="M 410 80 L 440 80" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="450" y="50" width="110" height="60" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="505" y="78" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">C# Worker</text>
          <text x="505" y="95" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">Process Service</text>
          
          <path d="M 560 80 L 590 80" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="600" y="50" width="110" height="60" rx="4" fill="rgba(137, 180, 250, 0.08)" stroke="var(--blue)" strokeWidth="1" />
          <text x="655" y="78" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">PostgreSQL</text>
          <text x="655" y="95" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">Persistent DB</text>
          
          <path d="M 655 110 L 655 140 L 205 140 L 205 110" fill="none" stroke="var(--accent)" strokeDasharray="3,3" strokeWidth="1" markerEnd="url(#arrow)" />
          <text x="430" y="135" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">Live updates loop via Node.js API</text>
        </svg>
      );
    }
    if (id === 'proj-3') {
      return (
        <svg viewBox="0 0 800 160" width="100%" height="100%" style={{ background: 'var(--bg-terminal)', borderRadius: '6px', padding: '16px', border: '1px solid var(--border)', display: 'block' }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>
          <rect x="10" y="55" width="100" height="40" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="79" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">Git Commit</text>
          
          <path d="M 110 75 L 150 75" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="160" y="35" width="140" height="80" rx="4" fill="rgba(203, 166, 247, 0.08)" stroke="var(--accent)" strokeWidth="1" />
          <text x="230" y="60" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" text-anchor="middle" fontWeight="bold">GH Actions Runner</text>
          <text x="230" y="77" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">1. Run pytest suite</text>
          <text x="230" y="94" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">2. Docker image build</text>
          
          <path d="M 300 75 L 340 75" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="350" y="55" width="110" height="40" rx="4" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="405" y="79" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" text-anchor="middle">Docker Hub Registry</text>
          
          <path d="M 460 75 L 500 75" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="510" y="55" width="100" height="40" rx="4" fill="rgba(137, 180, 250, 0.08)" stroke="var(--blue)" strokeWidth="1" />
          <text x="560" y="79" fill="var(--blue)" fontSize="10" fontFamily="var(--font-mono)" text-anchor="middle" fontWeight="bold">Secure SSH deploy</text>
          
          <path d="M 610 75 L 650 75" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <rect x="660" y="35" width="120" height="80" rx="6" fill="var(--bg-sidebar)" stroke="var(--border)" strokeWidth="1" />
          <text x="720" y="58" fill="var(--text-bright)" fontSize="11" fontFamily="var(--font-mono)" text-anchor="middle" fontWeight="bold">AWS EC2</text>
          <text x="720" y="78" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">Nginx Reverse Proxy</text>
          <text x="720" y="95" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)" text-anchor="middle">Docker container</text>
        </svg>
      );
    }
    return null;
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div 
      style={{
        ...styles.container,
        ['--detail-text-small-size' as any]: isMobile ? '14px' : '13.5px',
        ['--metric-text-val-size' as any]: isMobile ? '14px' : '13.5px',
      }} 
      className="view-container animate-slide-up"
    >
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
                style={{ ...styles.cardHeader, cursor: 'pointer' }} 
                onClick={() => toggleExpand(proj.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(proj.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`Toggle case details for ${proj.name}`}
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
                      <div style={{ overflowX: 'auto', width: '100%', marginBottom: '16px' }} className="architecture-svg-wrapper">
                        <div style={{ minWidth: '640px' }}>
                          {renderArchitecture(proj.id)}
                        </div>
                      </div>
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
    borderLeft: '3px solid var(--accent)',
    paddingLeft: '6px',
  },
  detailText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--text-bright)',
    margin: 0,
  },
  detailTextSmall: {
    fontSize: 'var(--detail-text-small-size, 13.5px)',
    lineHeight: '1.5',
    color: 'var(--text-bright)',
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
    fontSize: 'var(--metric-text-val-size, 13.5px)',
    color: 'var(--text-bright)',
  },
};
