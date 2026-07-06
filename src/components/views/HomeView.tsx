import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Terminal as TermIcon, ChevronRight, Download, Mail, ExternalLink, ArrowRight } from 'lucide-react';

const ClusterMonitor: React.FC = () => {
  const [cpu, setCpu] = useState(42);
  const [mem, setMem] = useState(68);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] AWS EKS cluster initialized successfully.",
    "[PROMETHEUS] Scraping metrics from kube-state-metrics...",
    "[KUBELET] Pod 'ingress-nginx-abc' status changed to Running.",
    "[INGRESS] Routing rules updated for 'maheshdiwan.com' API target.",
    "[HPA] Scale Target Ref: Deployment/web-api (Replicas: 3/5)"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(35 + Math.random() * 25));
      setMem(Math.floor(64 + Math.random() * 8));

      const logTemplates = [
        `[INFO] GET /api/v1/auth/session - 200 OK (elapsed: ${Math.floor(10 + Math.random() * 50)}ms)`,
        `[HPA] Scaling down replicas - CPU usage below threshold (${Math.floor(20 + Math.random() * 15)}%)`,
        "[SYSTEM] Rebuilding task definition configs...",
        "[PROMETHEUS] Alert manager cleared: high request latency resolved.",
        `[INFO] POST /api/v1/projects/query - 200 OK (ip: 104.28.1.${Math.floor(1 + Math.random() * 254)})`,
        "[DOCKER] Pulling image 'amazon/aws-cli:latest' - Cache hit.",
        "[AWS ECS] Task container 'vote-app-service' status: HEALTHY",
        `[BASH] Cron job 'backup-db.sh' executed successfully in ${Math.floor(100 + Math.random() * 500)}ms`
      ];

      const newLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLogs((prev) => [...prev.slice(1), newLog]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={monitorStyles.container} className="reveal animate-fade-in">
      <div style={monitorStyles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={monitorStyles.statusPulse} />
          <span style={monitorStyles.headerTitle}>AWS EKS / ECS Cluster Activity Monitor</span>
        </div>
        <span style={monitorStyles.hostLabel}>eks-ap-south-1.amazonaws.com</span>
      </div>

      <div style={monitorStyles.body}>
        <div style={monitorStyles.statsPanel}>
          <div style={monitorStyles.metricRow}>
            <div style={monitorStyles.metricText}>
              <span>CPU Load</span>
              <span>{cpu}%</span>
            </div>
            <div style={monitorStyles.progressBarBg}>
              <div style={{ ...monitorStyles.progressBarFill, width: `${cpu}%`, backgroundColor: cpu > 55 ? 'var(--accent)' : 'var(--success)' }} />
            </div>
          </div>

          <div style={monitorStyles.metricRow}>
            <div style={monitorStyles.metricText}>
              <span>Memory Limit</span>
              <span>{mem}%</span>
            </div>
            <div style={monitorStyles.progressBarBg}>
              <div style={{ ...monitorStyles.progressBarFill, width: `${mem}%`, backgroundColor: 'var(--blue)' }} />
            </div>
          </div>

          <div style={monitorStyles.podGrid}>
            <div style={monitorStyles.podCard} className="pod-card-custom">
              <span style={{ ...monitorStyles.podDot, backgroundColor: 'var(--success)' }} />
              <span style={monitorStyles.podName}>web-api-fargate</span>
            </div>
            <div style={monitorStyles.podCard} className="pod-card-custom">
              <span style={{ ...monitorStyles.podDot, backgroundColor: 'var(--success)' }} />
              <span style={monitorStyles.podName}>auth-service</span>
            </div>
            <div style={monitorStyles.podCard} className="pod-card-custom">
              <span style={{ ...monitorStyles.podDot, backgroundColor: 'var(--success)' }} />
              <span style={monitorStyles.podName}>redis-cache</span>
            </div>
            <div style={monitorStyles.podCard} className="pod-card-custom">
              <span style={{ ...monitorStyles.podDot, backgroundColor: 'var(--success)' }} />
              <span style={monitorStyles.podName}>ingress-controller</span>
            </div>
          </div>
        </div>

        <div style={monitorStyles.logsPanel}>
          <div style={monitorStyles.logsTitle}>CONTAINER LOGS (STDOUT)</div>
          <div style={monitorStyles.logsContainer}>
            {logs.map((log, idx) => (
              <div key={idx} style={monitorStyles.logLine}>
                <span style={monitorStyles.logTime}>[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const monitorStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    marginTop: '24px',
    marginBottom: '32px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  header: {
    backgroundColor: 'var(--bg-titlebar)',
    borderBottom: '1px solid var(--border)',
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
  },
  headerTitle: {
    fontWeight: 600,
    color: 'var(--text-bright)',
  },
  statusPulse: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--success)',
    display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  hostLabel: {
    color: 'var(--text-dim)',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statsPanel: {
    flex: '1 1 300px',
    padding: '16px',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  metricRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text)',
  },
  progressBarBg: {
    backgroundColor: 'var(--bg-terminal)',
    height: '6px',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.5s ease',
  },
  podGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    marginTop: '6px',
  },
  podCard: {
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  podDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  podName: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10.5px',
    color: 'var(--text)',
  },
  logsPanel: {
    flex: '1.2 1 360px',
    padding: '16px',
    backgroundColor: 'var(--bg-terminal)',
    display: 'flex',
    flexDirection: 'column',
    height: '190px',
  },
  logsTitle: {
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dim)',
    marginBottom: '8px',
    letterSpacing: '0.08em',
  },
  logsContainer: {
    flex: 1,
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  logLine: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-bright)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  logTime: {
    color: 'var(--text-dim)',
  },
};

interface HomeViewProps {
  onNavigate: (fileName: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  // Use first project as strongest featured project
  const featuredProject = portfolioConfig.projects[0];

  return (
    <div style={styles.container} className="view-container animate-slide-up">
      {/* 1. Comment Header */}
      <span style={styles.comment}>{"// Welcome! Feel free to explore my developer workspace."}</span>
      
      {/* 2. Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.titleRow}>
          <h1 style={styles.heroTitle} className="gradient-title">{portfolioConfig.name}</h1>
          <div style={styles.badgeContainer}>
            <span style={styles.pulseDot} />
            <span style={styles.badgeText}>Open to Opportunities</span>
          </div>
        </div>
        <p style={styles.heroRole}>{portfolioConfig.role}</p>
        <p style={styles.heroTagline}>{portfolioConfig.bioShort}</p>

        {/* CTA Actions */}
        <div style={styles.ctaRow}>
          <a 
            href="./Mahesh_Diwan_Resume.pdf" 
            download="Mahesh_Diwan_Resume.pdf" 
            style={styles.primaryCta}
            className="primary-cta-btn"
          >
            <Download size={14} style={{ marginRight: '6px' }} />
            <span>Download Resume PDF</span>
          </a>
          <button 
            onClick={() => onNavigate('CONTACT.md')} 
            style={styles.secondaryCta}
            className="secondary-cta-btn"
          >
            <Mail size={14} style={{ marginRight: '6px' }} />
            <span>Contact Me</span>
          </button>
          <button 
            onClick={() => onNavigate('PROJECTS.md')} 
            style={styles.secondaryCta}
            className="secondary-cta-btn"
          >
            <span>Explore Projects</span>
            <ChevronRight size={14} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Recruiter Navigation Alert Tooltip */}
        <div style={styles.navigationGuide} className="recruiter-guide-banner">
          <span style={{ marginRight: '8px', fontSize: '14px' }}>💡</span>
          <span>
            <strong>Recruiter Tip:</strong> This portfolio simulates a developer workspace IDE. Use the <strong>left File Tree Explorer</strong> or files tab list at the top to navigate between documents.
          </span>
        </div>
      </div>

      {/* Tip Card (Theme & Font customization) */}
      <div style={styles.tipCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px' }}>🎨</span>
          <span style={styles.tipText}>
            <strong>Tip:</strong> Click the <strong>Paintbrush icon</strong> in the top toolbar or press <code>Ctrl+P</code> to customize themes (Tokyo Night, Catppuccin, Nord, Dracula, Rosé Pine) & font pairings!
          </span>
        </div>
      </div>

      {/* Strongest Featured Project Teaser (High Priority Checklist Item) */}
      <div style={styles.featuredSection}>
        <h2 style={styles.sectionTitle}>Featured Project</h2>
        <div 
          style={{ ...styles.featuredProjectCard, borderColor: featuredProject.accent }}
          onClick={() => onNavigate('PROJECTS.md')}
          className="featured-project-card reveal"
        >
          <div style={styles.featuredHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{featuredProject.icon}</span>
              <div>
                <h3 style={styles.featuredTitle}>{featuredProject.name}</h3>
                <span style={{ ...styles.featuredType, color: featuredProject.accent }}>{featuredProject.type}</span>
              </div>
            </div>
            <span style={styles.featuredCta}>
              View Details <ArrowRight size={13} style={{ marginLeft: '4px' }} />
            </span>
          </div>
          <p style={styles.featuredDesc}>{featuredProject.desc}</p>
          <div style={styles.featuredMetricsRow}>
            {featuredProject.metrics && featuredProject.metrics.slice(0, 2).map((metric, i) => (
              <div key={i} style={styles.featuredMetricItem}>
                <span style={{ color: featuredProject.accent, marginRight: '6px' }}>✓</span>
                <span>{metric}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DevOps Live Activity Monitor */}
      <div style={{ marginTop: '36px' }}>
        <h2 style={styles.sectionTitle}>Infrastructure Activity</h2>
        <ClusterMonitor />
      </div>

      {/* Key Stats & Impact */}
      <div style={styles.metricsSection}>
        <h2 style={styles.sectionTitle}>Key Stats & Impact</h2>
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard} className="metric-card reveal">
            <span style={styles.metricVal}>4+</span>
            <span style={styles.metricLabel}>CI/CD Pipelines</span>
          </div>
          <div style={styles.metricCard} className="metric-card reveal">
            <span style={styles.metricVal}>5+</span>
            <span style={styles.metricLabel}>Containerized Apps</span>
          </div>
          <div style={styles.metricCard} className="metric-card reveal">
            <span style={styles.metricVal}>3+</span>
            <span style={styles.metricLabel}>Cloud Deployments</span>
          </div>
          <div style={styles.metricCard} className="metric-card reveal">
            <span style={styles.metricVal}>8.7</span>
            <span style={styles.metricLabel}>B.E. CGPA</span>
          </div>
        </div>
      </div>

      {/* Terminal Interactive Teaser */}
      <div style={{ marginTop: '36px' }}>
        <h2 style={styles.sectionTitle}>Interactive Teaser</h2>
        <div style={styles.terminalTeaser}>
          <div style={styles.termHeader}>
            <TermIcon size={12} style={{ color: 'var(--text-dim)' }} />
            <span style={styles.termTitle}>interactive-shell.sh</span>
          </div>
          <div style={styles.termBody}>
            <div style={styles.termLine}>
              <span style={styles.termPrompt}>$</span> whoami
            </div>
            <div style={styles.termOutput}>
              Mahesh Diwan — Computer Science Student & DevOps Enthusiast based in Pune, India.
            </div>
            <div style={styles.termLine}>
              <span style={styles.termPrompt}>$</span> kubectl get pods
            </div>
            <div style={styles.termOutput}>
              NAME                               READY   STATUS    RESTARTS   AGE<br />
              linkedin-mern-web-7fd89c56-abcde   1/1     Running   0          5d<br />
              voting-app-worker-c4d92a18-xyz12   1/1     Running   1          2d
            </div>
            <div style={styles.termLine}>
              <span style={styles.termPrompt}>$</span> <span className="typing-cursor"></span>
            </div>
          </div>
        </div>
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
  heroSection: {
    padding: '16px 0 32px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  heroTitle: {
    fontSize: '44px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  badgeContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    borderRadius: '16px',
    padding: '4px 12px',
    gap: '8px',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--success)',
    boxShadow: '0 0 0 0 var(--accent-dim)',
    animation: 'pulse 2s infinite',
  },
  badgeText: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--success)',
  },
  heroRole: {
    fontSize: '18px',
    color: 'var(--accent)',
    fontWeight: 600,
    margin: 0,
  },
  heroTagline: {
    fontSize: '14.5px',
    lineHeight: '1.6',
    color: 'var(--text)',
    maxWidth: '700px',
    margin: 0,
  },
  ctaRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '12px',
  },
  primaryCta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--accent)',
    color: 'var(--btn-text)',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 4px 15px var(--accent-dim)',
    transition: 'opacity 0.15s, transform 0.15s',
    border: 'none',
    cursor: 'pointer',
  },
  secondaryCta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-bright)',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background-color 0.15s, border-color 0.15s',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--text-bright)',
    marginBottom: '16px',
    fontWeight: 700,
  },
  featuredSection: {
    marginTop: '36px',
  },
  featuredProjectCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'transform 0.18s, border-color 0.18s, background-color 0.18s',
  },
  featuredHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  featuredTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    margin: 0,
  },
  featuredType: {
    fontSize: '10.5px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  featuredCta: {
    fontSize: '12px',
    color: 'var(--accent)',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  featuredDesc: {
    fontSize: '13.5px',
    lineHeight: '1.65',
    color: 'var(--text)',
    marginBottom: '16px',
  },
  featuredMetricsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  featuredMetricItem: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    display: 'flex',
    alignItems: 'center',
  },
  metricsSection: {
    marginTop: '36px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricVal: {
    fontSize: '26px',
    fontWeight: 800,
    color: 'var(--accent)',
  },
  metricLabel: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    fontWeight: 500,
  },
  terminalTeaser: {
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  termHeader: {
    backgroundColor: 'var(--bg-sidebar)',
    borderBottom: '1px solid var(--border)',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  termTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-bright)',
  },
  termBody: {
    padding: '16px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11.5px',
    lineHeight: '1.65',
    color: 'var(--text-bright)',
  },
  termLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  termPrompt: {
    color: 'var(--accent)',
    fontWeight: 'bold',
  },
  termOutput: {
    color: 'var(--text)',
    paddingLeft: '16px',
    marginBottom: '10px',
  },
  tipCard: {
    backgroundColor: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    borderRadius: '6px',
    padding: '10px 14px',
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
  },
  tipText: {
    fontSize: '12px',
    color: 'var(--text-bright)',
    lineHeight: '1.45',
  },
  navigationGuide: {
    backgroundColor: 'var(--accent-dim)',
    borderLeft: '4px solid var(--accent)',
    borderRadius: '4px',
    padding: '12px 16px',
    fontSize: '12.5px',
    color: 'var(--text-bright)',
    lineHeight: '1.5',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
  },
};
