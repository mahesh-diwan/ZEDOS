import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Cloud, Layers, Cpu, RefreshCw, Activity, Code, Database, Wrench } from 'lucide-react';

const getCategoryIcon = (group: string) => {
  const g = group.toLowerCase();
  if (g.includes('cloud')) return <Cloud size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  if (g.includes('container') || g.includes('orchestration')) return <Layers size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  if (g.includes('infrastructure') || g.includes('iac')) return <Cpu size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  if (g.includes('ci/cd') || g.includes('automation')) return <RefreshCw size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  if (g.includes('monitoring') || g.includes('log')) return <Activity size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  if (g.includes('programming') || g.includes('script') || g.includes('language')) return <Code size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  if (g.includes('database') || g.includes('cache') || g.includes('storage')) return <Database size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />;
  return null;
};

interface SkillBarProps {
  name: string;
  pct: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, pct, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Smooth delay before showing progress bar animation
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

export const SkillsView: React.FC = () => {
  return (
    <div style={styles.container} className="view-container animate-slide-up">
      <span style={styles.comment}>{"#!/bin/bash — skills.sh — technical capabilities & tool stack"}</span>
      
      <h1 style={styles.heading}>Skills</h1>
      <p style={styles.subtitle}><span className="syntax-keyword">echo</span> <span className="syntax-string">"Ready to build, automate, and scale."</span></p>

      {/* Grid of Skill Categories */}
      <div style={styles.skillsGrid}>
        {portfolioConfig.skills.map((category) => (
          <div key={category.group} style={styles.categoryCard} className="reveal">
            <h2 style={styles.categoryTitle}>
              {getCategoryIcon(category.group)}
              <span style={{ verticalAlign: 'middle' }}>{category.group}</span>
            </h2>
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

      <hr style={styles.divider} />

      {/* Other familiar tools */}
      <div style={styles.otherSection} className="reveal">
        <h2 style={styles.categoryTitle}>
          <Wrench size={15} style={{ marginRight: '8px', color: 'var(--accent)', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>Also familiar with</span>
        </h2>
        <div style={styles.tagsContainer}>
          {portfolioConfig.otherSkills.map((skill) => (
            <span key={skill} style={styles.otherTag} className="other-skill-tag">
              {skill}
            </span>
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
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '24px',
  },
  categoryCard: {
    marginBottom: '8px',
  },
  categoryTitle: {
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'var(--syntax-keyword)',
    borderBottom: '2px solid var(--accent)',
    paddingBottom: '8px',
    marginBottom: '16px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
  },
  categoryItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  skillBarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  skillName: {
    width: '100px',
    fontSize: '14px',
    color: 'var(--text-bright)',
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
    width: '36px',
    fontSize: '12px',
    fontWeight: 600,
    textAlign: 'right',
    flexShrink: 0,
    fontFamily: 'var(--font-mono)',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    margin: '36px 0',
  },
  otherSection: {
    marginTop: '12px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  otherTag: {
    fontSize: '13.5px',
    color: 'var(--text-bright)',
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '4px 12px',
    transition: 'border-color 0.15s, color 0.15s',
    cursor: 'default',
  },
};
