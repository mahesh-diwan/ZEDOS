import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Compass, GraduationCap, Calendar, ShieldCheck, CheckSquare, Wrench } from 'lucide-react';

interface SkillBarProps {
  name: string;
  pct: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, pct, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(pct);
    }, 150);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div style={styles.skillBarRow}>
      <span style={styles.skillName}>{name}</span>
      <div style={styles.barTrack}>
        <div 
          style={{
            ...styles.barFill,
            width: `${width}%`,
            backgroundColor: color,
          }} 
        />
      </div>
      <span style={{ ...styles.skillPct, color }}>{pct}%</span>
    </div>
  );
};

export const AboutView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'bio' | 'skills' | 'experience'>('bio');

  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"# profile.yaml — biography, skills matrix & career Dockerfile"}</span>
      
      <h1 style={styles.heading}>Profile & Qualifications</h1>

      {/* Sub tabs navigation */}
      <div style={styles.tabHeader} className="no-select about-subtabs">
        <button 
          style={{ 
            ...styles.tabBtn, 
            borderBottom: activeSubTab === 'bio' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeSubTab === 'bio' ? 'var(--text-bright)' : 'var(--text-dim)' 
          }}
          onClick={() => setActiveSubTab('bio')}
        >
          Bio & Objectives
        </button>
        <button 
          style={{ 
            ...styles.tabBtn, 
            borderBottom: activeSubTab === 'skills' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeSubTab === 'skills' ? 'var(--text-bright)' : 'var(--text-dim)' 
          }}
          onClick={() => setActiveSubTab('skills')}
        >
          Skills & Evidence
        </button>
        <button 
          style={{ 
            ...styles.tabBtn, 
            borderBottom: activeSubTab === 'experience' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeSubTab === 'experience' ? 'var(--text-bright)' : 'var(--text-dim)' 
          }}
          onClick={() => setActiveSubTab('experience')}
        >
          Career Experience
        </button>
      </div>

      {/* View Content */}
      <div style={styles.tabBody}>
        {activeSubTab === 'bio' && (
          <div className="reveal animate-fade-in" style={styles.contentSection}>
            <div style={styles.bioBlock}>
              <h2 style={styles.sectionHeading}>
                <Compass size={15} style={styles.sectionIcon} />
                Biography
              </h2>
              <p style={styles.paragraph}>{portfolioConfig.bioLong}</p>
            </div>

            <div style={styles.qaGrid}>
              <div style={styles.qaCard} className="glass-card">
                <h3 style={styles.qaQuestion}>Why DevOps?</h3>
                <p style={styles.qaAnswer}>
                  I am fascinated by automation. Speeding up build distributions, orchestrating containers, 
                  and seeing services scale dynamically under load is incredibly satisfying. DevOps represents the 
                  feedback loop that ensures production environment reliability and developer happiness.
                </p>
              </div>

              <div style={styles.qaCard} className="glass-card">
                <h3 style={styles.qaQuestion}>Current Focus</h3>
                <p style={styles.qaAnswer}>
                  Currently mastering Kubernetes configurations, writing robust GitOps pipelines with ArgoCD, 
                  and exploring cloud cost efficiency benchmarks on AWS container clusters.
                </p>
              </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.bioBlock}>
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
                    {edu.gpa && <p style={styles.eduGpa}>{edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'skills' && (
          <div className="reveal animate-fade-in" style={styles.contentSection}>
            {/* DevOps Evidence Section (チェックマーク list) */}
            <div style={styles.evidenceSection}>
              <h2 style={styles.sectionHeading}>
                <ShieldCheck size={16} style={styles.sectionIcon} />
                DevOps Evidence & Capabilities
              </h2>
              <div style={styles.evidenceGrid}>
                {[
                  { title: "Built CI/CD Pipelines", desc: "Configured automated GitHub Actions workflows for Docker build, test verification, and rolling AWS ECS updates." },
                  { title: "Automated Deployments", desc: "Integrated secure deployment runners to execute zero-friction scripts on staging/production environments." },
                  { title: "Dockerized Applications", desc: "Crafted multi-stage Dockerfiles optimizing image size, caching layers, and caching node dependencies." },
                  { title: "Kubernetes Deployments", desc: "Authored K8s Deployments, ClusterIP Services, persistent volumes, and HPA configs." },
                  { title: "Infrastructure as Code", desc: "Provisioned target groups, ECS tasks, and EKS credentials via basic Terraform configurations." },
                  { title: "Linux Administration", desc: "Wrote background cron tasks auditing running cloud resources via AWS CLI and reporting metrics." }
                ].map((item) => (
                  <div key={item.title} style={styles.evidenceCard} className="glass-card">
                    <div style={styles.evidenceHeader}>
                      <CheckSquare size={13} style={{ color: 'var(--success)', marginRight: '6px' }} />
                      <strong style={styles.evidenceTitle}>{item.title}</strong>
                    </div>
                    <p style={styles.evidenceDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Core Skills Progress Bars */}
            <div>
              <h2 style={styles.sectionHeading}>
                <Wrench size={15} style={styles.sectionIcon} />
                Technical Competence Index
              </h2>
              <div style={styles.skillsGrid}>
                {portfolioConfig.skills.map((category) => (
                  <div key={category.group} style={styles.categoryCard}>
                    <h3 style={styles.categoryTitle}>{category.group}</h3>
                    <div style={styles.categoryItems}>
                      {category.items.map((skill) => (
                        <SkillBar 
                          key={skill.name} 
                          name={skill.name} 
                          pct={skill.pct} 
                          color={skill.color} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'experience' && (
          <div className="reveal animate-fade-in" style={styles.contentSection}>
            <div style={styles.experienceTimeline}>
              {portfolioConfig.experience.map((exp) => (
                <div key={exp.id} style={styles.expCard} className="glass-card">
                  <div style={styles.expHeader}>
                    <div>
                      <h3 style={styles.expCompany}>{exp.company}</h3>
                      <p style={styles.expRole}>{exp.role}</p>
                    </div>
                    <span style={styles.expDate}>
                      <Calendar size={11} style={{ marginRight: '4px' }} />
                      {exp.date}
                    </span>
                  </div>
                  <p style={styles.expDesc}>{exp.desc}</p>
                  <div style={styles.expTags}>
                    {exp.tags.map((tag) => (
                      <span key={tag} style={styles.expTagBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
  heading: {
    fontSize: '36px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    marginBottom: '24px',
    letterSpacing: '-0.02em',
  },
  tabHeader: {
    display: 'flex',
    gap: '20px',
    borderBottom: '1px solid var(--border)',
    marginBottom: '24px',
  },
  tabBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px 0',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'color 0.15s, border-color 0.15s',
  },
  tabBody: {
    minHeight: '300px',
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  bioBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionHeading: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--text-bright)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: '8px',
    color: 'var(--accent)',
  },
  paragraph: {
    fontSize: '14px',
    lineHeight: '1.75',
    color: 'var(--text)',
    margin: 0,
  },
  qaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginTop: '8px',
  },
  qaCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px 20px',
  },
  qaQuestion: {
    fontSize: '13.5px',
    fontWeight: 700,
    color: 'var(--accent)',
    marginBottom: '8px',
    marginTop: 0,
  },
  qaAnswer: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: 'var(--text)',
    margin: 0,
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '16px 0',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  eduCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px 20px',
  },
  eduHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  eduInstitution: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-bright)',
    margin: 0,
  },
  eduPeriod: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    display: 'flex',
    alignItems: 'center',
  },
  eduDegree: {
    fontSize: '13px',
    color: 'var(--text)',
    margin: '0 0 4px 0',
  },
  eduMinor: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    margin: 0,
    fontFamily: 'var(--font-mono)',
  },
  eduGpa: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--success)',
    margin: '4px 0 0 0',
  },
  evidenceSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  evidenceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '14px',
  },
  evidenceCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '14px 18px',
  },
  evidenceHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '6px',
  },
  evidenceTitle: {
    fontSize: '13px',
    color: 'var(--text-bright)',
  },
  evidenceDesc: {
    fontSize: '12px',
    lineHeight: '1.5',
    color: 'var(--text)',
    margin: 0,
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  categoryTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--syntax-keyword)',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '6px',
    marginBottom: '12px',
    fontWeight: 700,
  },
  categoryItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  skillBarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  skillName: {
    width: '90px',
    fontSize: '12.5px',
    color: 'var(--text)',
    flexShrink: 0,
  },
  barTrack: {
    flex: 1,
    height: '4px',
    backgroundColor: 'var(--bg-terminal)',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
  },
  barFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  skillPct: {
    width: '32px',
    fontSize: '11px',
    fontWeight: 600,
    textAlign: 'right',
    flexShrink: 0,
    fontFamily: 'var(--font-mono)',
  },
  experienceTimeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  expCard: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '20px',
  },
  expHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  expCompany: {
    fontSize: '16px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    margin: 0,
  },
  expRole: {
    fontSize: '13px',
    color: 'var(--accent)',
    fontWeight: 500,
    margin: '2px 0 0 0',
  },
  expDate: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  expDesc: {
    fontSize: '13.5px',
    lineHeight: '1.65',
    color: 'var(--text)',
    margin: '0 0 16px 0',
  },
  expTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  expTagBadge: {
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text-dim)',
    borderRadius: '4px',
    padding: '2px 6px',
  },
};
