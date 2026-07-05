import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Terminal as TermIcon, ChevronRight } from 'lucide-react';

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
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      {/* 1. Main Greeting */}
      <span style={styles.comment}>{"// Welcome! Feel free to explore my developer workspace."}</span>
      
      <div style={styles.titleRow}>
        <h1 style={styles.title} className="gradient-title">{portfolioConfig.name}</h1>
        {/* Pulsing Status Badge */}
        <div style={styles.badgeContainer}>
          <span style={styles.pulseDot} />
          <span style={styles.badgeText}>Open to Opportunities</span>
        </div>
      </div>
      
      <p style={styles.subtitle}>{portfolioConfig.role}</p>

      {/* Tip Card (Theme & Font customization) */}
      <div style={styles.tipCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px' }}>🎨</span>
          <span style={styles.tipText}>
            <strong>Tip:</strong> Click the <strong>Paintbrush icon</strong> in the top toolbar or press <code>Ctrl+P</code> to customize themes (Tokyo Night, Catppuccin, Nord, Dracula, Rosé Pine) & font pairings!
          </span>
        </div>
      </div>

      {/* 2. Tag pills */}
      <div style={styles.tagsContainer}>
        {['Python', 'Docker', 'GitHub Actions', 'Jenkins', 'Nginx', 'AWS', 'Linux', 'Bash'].map((tag) => (
          <span key={tag} style={styles.tag} className="home-tag-pill">
            {tag}
          </span>
        ))}
      </div>

      <hr style={styles.divider} />

      {/* 2.5 Metrics Dashboard (Inspiration: itsairamkumar.github.io) */}
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

      {/* DevOps Live Activity Monitor */}
      <ClusterMonitor />

      {/* 3. Quick Summary / Highlights */}
      <div style={styles.highlightsContainer}>
        <h2 style={styles.sectionTitle}>Status Highlights</h2>
        <div style={styles.bulletsList}>
          {portfolioConfig.bioBullets.map((bullet, idx) => (
            <div key={idx} style={styles.bulletItem} className="bullet-item">
              <span style={styles.bulletIcon}>{bullet.icon}</span>
              <span style={styles.bulletText}>
                {bullet.text} <strong>{bullet.boldText}</strong> {bullet.afterText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Terminal Interactive Teaser */}
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
            <span style={styles.termPrompt}>$</span> cat interests.txt
          </div>
          <div style={styles.termOutput}>
            Writing guides on Hashnode, trying out open-source projects, playing around with terminal configs 🚀
          </div>
          <div style={styles.termLine}>
            <span style={styles.termPrompt}>$</span> docker ps
          </div>
          <div style={styles.termOutput}>
            CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS<br />
            f9a2e31bc439   nginx:alpine   "/docker-entrypoint.…"   2 hours ago     Up 2 hours     0.0.0.0:80-&gt;80/tcp
          </div>
          <div style={styles.termLine}>
            <span style={styles.termPrompt}>$</span> <span className="typing-cursor"></span>
          </div>
        </div>
      </div>

      {/* 5. Navigation Buttons */}
      <div style={styles.navSection}>
        <h2 style={styles.sectionTitle}>Explore workspace files</h2>
        <div style={styles.btnGrid}>
          {[
            { label: 'profile.yaml', desc: 'Background & education details', icon: 'about' },
            { label: 'projects.tf', desc: 'DevOps & automation infrastructures', icon: 'projects' },
            { label: 'skills.sh', desc: 'My technical automation toolkit', icon: 'skills' },
            { label: 'experience.dockerfile', desc: 'Docker career progression stages', icon: 'experience' },
            { label: 'blog.md', desc: 'Technical writings & Hashnode guides', icon: 'blog' },
            { label: 'contact.yaml', desc: 'Get in touch & social coordinates', icon: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              style={styles.navCard}
              onClick={() => onNavigate(item.label)}
              className="reveal nav-card"
            >
              <div style={styles.navCardHeader}>
                <span style={styles.navCardLabel}>{item.label}</span>
                <ChevronRight size={14} style={styles.navCardArrow} className="nav-card-arrow" />
              </div>
              <p style={styles.navCardDesc}>{item.desc}</p>
            </button>
          ))}
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
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '4px',
  },
  title: {
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
    backgroundColor: '#10b981',
    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
    animation: 'pulse 2s infinite',
  },
  badgeText: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#10b981',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text)',
    marginBottom: '20px',
    fontWeight: 400,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '32px',
  },
  tag: {
    fontSize: '11.5px',
    backgroundColor: 'var(--accent-dim)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    borderRadius: '4px',
    padding: '3px 10px',
    fontWeight: 500,
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '24px 0',
  },
  sectionTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--text-bright)',
    marginBottom: '16px',
    fontWeight: 700,
  },
  metricsSection: {
    marginBottom: '36px',
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
    transition: 'border-color 0.15s',
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
  highlightsContainer: {
    marginBottom: '36px',
  },
  bulletsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
  },
  bulletIcon: {
    fontSize: '15px',
    width: '20px',
    textAlign: 'center',
  },
  bulletText: {
    color: 'var(--text)',
  },
  terminalTeaser: {
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '40px',
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
  navSection: {
    marginTop: '20px',
  },
  btnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '12px',
  },
  navCard: {
    background: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'transform 0.18s, border-color 0.18s, background-color 0.18s',
    outline: 'none',
  },
  navCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  navCardLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--accent)',
    fontWeight: 500,
  },
  navCardArrow: {
    color: 'var(--text-dim)',
    transition: 'transform 0.15s, color 0.15s',
  },
  navCardDesc: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    lineHeight: '1.4',
  },
  tipCard: {
    backgroundColor: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    borderRadius: '6px',
    padding: '10px 14px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  tipText: {
    fontSize: '12px',
    color: 'var(--text-bright)',
    lineHeight: '1.45',
  },
};
