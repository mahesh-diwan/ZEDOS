import React from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Award, GraduationCap, Calendar, Compass } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# profile.yaml — detailed education & bio"}</span>
      
      {/* 1. Header */}
      <h1 style={styles.heading}>About Me</h1>
      
      {/* 2. Biography */}
      <div style={styles.section} className="reveal">
        <h2 style={styles.sectionHeading}>
          <Compass size={16} style={styles.sectionIcon} />
          Biography
        </h2>
        <p style={styles.bioText}>
          {portfolioConfig.bioLong}
        </p>
      </div>

      <hr style={styles.divider} />

      {/* 3. Education Timeline */}
      <div style={styles.section} className="reveal">
        <h2 style={styles.sectionHeading}>
          <GraduationCap size={16} style={styles.sectionIcon} />
          Education
        </h2>
        <div style={styles.timeline}>
          {portfolioConfig.education.map((edu) => (
            <div key={edu.id} style={styles.eduCard} className="edu-card-custom">
              <div style={styles.eduHeader}>
                <h3 style={styles.eduInstitution}>{edu.institution}</h3>
                <span style={styles.eduPeriod}>
                  <Calendar size={11} style={{ marginRight: '4px' }} />
                  {edu.period}
                </span>
              </div>
              <p style={styles.eduDegree}>{edu.degree}</p>
              {edu.minor && <p style={styles.eduMinor}>{edu.minor}</p>}
              {edu.gpa && (
                <div style={styles.gpaBadge}>
                  <Award size={12} style={{ marginRight: '4px' }} />
                  {edu.gpa}
                </div>
              )}
              {edu.details && <p style={styles.eduDetails}>{edu.details}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
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
    marginBottom: '32px',
    letterSpacing: '-0.02em',
  },
  section: {
    marginBottom: '36px',
  },
  sectionHeading: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-bright)',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: '8px',
    color: 'var(--accent)',
  },
  bioText: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: 'var(--text)',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '32px 0',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  eduCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '20px',
  },
  eduHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  eduInstitution: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-bright)',
  },
  eduPeriod: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-terminal)',
    padding: '2px 8px',
    borderRadius: '4px',
    border: '1px solid var(--border)',
  },
  eduDegree: {
    fontSize: '13px',
    color: 'var(--text)',
    marginBottom: '4px',
  },
  eduMinor: {
    fontSize: '12.5px',
    color: 'var(--accent)',
    marginBottom: '12px',
    fontFamily: 'var(--font-mono)',
  },
  gpaBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--success)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    borderRadius: '4px',
    padding: '3px 8px',
    marginBottom: '8px',
  },
  eduDetails: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    lineHeight: '1.5',
    borderLeft: '2px solid var(--border)',
    paddingLeft: '10px',
    marginTop: '8px',
  },
};
