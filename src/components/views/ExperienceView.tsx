import React from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Calendar } from 'lucide-react';

export const ExperienceView: React.FC = () => {
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# experience.dockerfile — timeline & build stages"}</span>
      
      <h1 style={styles.heading}>Experience</h1>
      <p style={styles.subtitle}>
        <span className="syntax-keyword">FROM</span> <span style={{ color: 'var(--text-bright)' }}>career/devops-builder</span> <span className="syntax-keyword">AS</span> <span style={{ color: 'var(--blue)' }}>production</span>
      </p>

      {/* Vertical Timeline */}
      <div style={styles.timelineContainer}>
        {portfolioConfig.experience.map((exp, idx) => (
          <div key={exp.id} style={styles.timelineItem} className="reveal timeline-item">
            {/* Left Timeline Bar & Dot */}
            <div style={styles.timelineLineWrapper}>
              <div 
                className="timeline-dot-custom"
                style={{ 
                  ...styles.timelineDot,
                  backgroundColor: exp.current ? 'var(--accent)' : 'var(--border)',
                  boxShadow: exp.current ? '0 0 0 4px var(--accent-dim)' : 'none',
                }} 
              />
              {idx < portfolioConfig.experience.length - 1 && (
                <div style={styles.timelineLine} />
              )}
            </div>

            {/* Right Card Content */}
            <div style={styles.experienceCard} className="experience-card">
              <div style={styles.cardHeader}>
                <div style={styles.roleGroup}>
                  <h3 style={styles.roleTitle}>{exp.role}</h3>
                  <span style={styles.companyName}>@ {exp.company}</span>
                </div>
                <div style={styles.periodBadge}>
                  <Calendar size={12} style={{ marginRight: '4px' }} />
                  {exp.date}
                </div>
              </div>

              <p style={styles.description}>{exp.desc}</p>

              {/* Technologies used list */}
              <div style={styles.tagsContainer}>
                {exp.tags.map((tag) => (
                  <span key={tag} style={styles.tagBadge} className="tag-badge-custom">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
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
    marginBottom: '4px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--text-dim)',
    marginBottom: '36px',
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: '8px',
  },
  timelineItem: {
    display: 'flex',
    gap: '24px',
    position: 'relative',
  },
  timelineLineWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '16px',
    flexShrink: 0,
  },
  timelineDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    zIndex: 2,
    marginTop: '24px',
    transition: 'background-color 0.2s',
  },
  timelineLine: {
    width: '2px',
    flex: 1,
    backgroundColor: 'var(--border)',
    marginTop: '4px',
  },
  experienceCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    flex: 1,
    marginBottom: '24px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  roleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  roleTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: 'var(--text-bright)',
  },
  companyName: {
    fontSize: '14px',
    color: 'var(--accent)',
    fontWeight: 600,
  },
  periodBadge: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-terminal)',
    padding: '3px 8px',
    borderRadius: '4px',
    border: '1px solid var(--border)',
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: 'var(--text-bright)',
    marginBottom: '20px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tagBadge: {
    fontSize: '11px',
    color: 'var(--blue)',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '4px',
    padding: '2px 8px',
    fontWeight: 500,
  },
};
