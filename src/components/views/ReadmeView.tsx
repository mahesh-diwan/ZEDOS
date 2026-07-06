import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Shield, Sparkles, Terminal } from 'lucide-react';

export const ReadmeView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      style={{
        ...styles.container,
        ['--warning-text-size' as any]: isMobile ? '14px' : '13.5px',
      }} 
      className="view-container animate-slide-up"
    >
      {/* Readme Title */}
      <h1 style={styles.title}>{portfolioConfig.name}</h1>
      <p style={styles.tagline}>{portfolioConfig.role}</p>

      {/* Tech indicators */}
      <div style={styles.badgesGroup}>
        {['🐍 Python', '🔷 TypeScript', '⚡ FastAPI', '🧠 LangChain', '🐳 Docker'].map((tech) => (
          <span key={tech} style={styles.badge}>
            {tech}
          </span>
        ))}
      </div>

      <hr style={styles.divider} />

      {/* About Section */}
      <div style={styles.markdownSection}>
        <h2 style={styles.sectionHeading}>
          <Sparkles size={16} style={styles.icon} />
          About
        </h2>
        <p style={styles.mdText}>{portfolioConfig.bioLong}</p>
      </div>

      {/* Stack Details */}
      <div style={styles.markdownSection}>
        <h2 style={styles.sectionHeading}>
          <Terminal size={16} style={styles.icon} />
          Technical Stack
        </h2>
        <div style={styles.stackGrid}>
          {portfolioConfig.skills.map((skillGroup) => (
            <div key={skillGroup.group} style={styles.stackItem}>
              <strong style={styles.stackLabel}>{skillGroup.group}: </strong>
              <span style={styles.stackValues}>
                {skillGroup.items.map((it) => it.name).join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Notice (Important Warning card) */}
      <div style={styles.warningCard} className="reveal glass-card">
        <div style={styles.warningHeader}>
          <Shield size={16} style={{ color: 'var(--error)', marginRight: '8px' }} />
          <h3 style={{ color: 'var(--error)', fontSize: '13px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Copyright & Usage Warning
          </h3>
        </div>
        <p style={styles.warningText}>
          This portfolio, including its layout, Zed theme adaptation, AI assistant integration, custom retro cursor, terminal emulation shell, and overall aesthetic elements was 
          <strong> designed and customized by Mahesh Diwan</strong>. All rights reserved.
        </p>
        <p style={styles.warningText}>
          You are <span style={{ color: 'var(--error)', fontWeight: 600 }}>not permitted</span> to copy, clone, or replicate this portfolio in whole or in part without explicit written permission.
        </p>
        <p style={{ ...styles.warningText, marginBottom: 0 }}>
          If this portfolio inspired you, please build something <strong>original</strong> that reflects your own identity. If you reference any part of this work, a visible credit linking back to 
          <a href="https://github.com/mahesh-diwan" target="_blank" rel="noreferrer" style={styles.warningLink}> github.com/mahesh-diwan</a> is required.
        </p>
      </div>

      {/* Footer info */}
      <div style={styles.readmeFooter}>
        <span>© {new Date().getFullYear()} {portfolioConfig.name} · All rights reserved</span>
        <span>Made with 🤍 in Pune, India</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  title: {
    fontSize: '40px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    marginBottom: '6px',
    letterSpacing: '-0.02em',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '12px',
  },
  tagline: {
    fontSize: '15px',
    color: 'var(--text-dim)',
    marginBottom: '16px',
  },
  badgesGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '24px',
  },
  badge: {
    fontSize: '11px',
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '28px 0',
  },
  markdownSection: {
    marginBottom: '28px',
  },
  sectionHeading: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text-bright)',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
    color: 'var(--accent)',
  },
  mdText: {
    fontSize: '14.5px',
    lineHeight: '1.75',
    color: 'var(--text-bright)',
  },
  stackGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
  },
  stackItem: {
    lineHeight: '1.6',
  },
  stackLabel: {
    color: 'var(--text-bright)',
    fontWeight: 600,
  },
  stackValues: {
    color: 'var(--text-bright)',
  },
  warningCard: {
    backgroundColor: 'rgba(244, 71, 71, 0.03)',
    border: '1px solid rgba(244, 71, 71, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '36px',
    marginBottom: '36px',
  },
  warningHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  warningText: {
    fontSize: 'var(--warning-text-size, 13.5px)',
    lineHeight: '1.65',
    color: 'var(--text-bright)',
    marginBottom: '12px',
  },
  warningLink: {
    color: 'var(--blue)',
    textDecoration: 'none',
    fontWeight: 500,
  },
  readmeFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--text-dim)',
    borderTop: '1px solid var(--border)',
    paddingTop: '16px',
    flexWrap: 'wrap',
    gap: '8px',
  },
};
