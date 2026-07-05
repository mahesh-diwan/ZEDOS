import React from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export const CertificationsView: React.FC = () => {
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# certifications.md — verified credentials & achievements"}</span>
      
      <h1 style={styles.heading}>Certifications</h1>
      <p style={styles.subtitle}>
        Continuous learning and validation of DevOps, Cloud architectures, and automation standards.
      </p>

      <div style={styles.grid}>
        {portfolioConfig.certifications.map((cert) => (
          <div key={cert.id} style={styles.card} className="reveal project-card">
            <div style={styles.header}>
              <span style={styles.icon}>{cert.icon}</span>
              <span style={styles.badge}>
                <ShieldCheck size={11} style={{ marginRight: '4px', color: 'var(--success)' }} />
                Verified
              </span>
            </div>
            
            <h3 style={styles.name}>{cert.name}</h3>
            <p style={styles.issuer}>{cert.issuer}</p>
            <p style={styles.date}>{cert.date}</p>
            
            {cert.url && cert.url !== '#' && (
              <a 
                href={cert.url} 
                target="_blank" 
                rel="noreferrer" 
                style={styles.link}
                title="Verify Credential"
              >
                <span>Verify Credential</span>
                <ExternalLink size={11} style={{ marginLeft: '4px' }} />
              </a>
            )}
          </div>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, border-color 0.2s',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '24px',
  },
  badge: {
    fontSize: '10px',
    fontWeight: 600,
    color: 'var(--success)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    borderRadius: '12px',
    padding: '2px 8px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  name: {
    fontSize: '16px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  issuer: {
    fontSize: '13px',
    color: 'var(--text)',
    marginBottom: '4px',
  },
  date: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    fontFamily: 'var(--font-mono)',
    marginBottom: '16px',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--accent)',
    marginTop: 'auto',
    alignSelf: 'flex-start',
    borderBottom: '1px solid transparent',
    transition: 'border-color 0.15s',
  },
};
