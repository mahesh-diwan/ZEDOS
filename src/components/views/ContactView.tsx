import React, { useState, useRef, useEffect } from 'react';
import { portfolioConfig } from '../../portfolioConfig';
import { Mail, BookOpen, Award, Send } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface ContactViewProps {
  onToast: (icon: string, msg: string) => void;
}

const socialBrandColors: { [key: string]: { color: string; bg: string } } = {
  email: { color: '#4ec9b0', bg: 'rgba(78, 201, 176, 0.08)' },
  linkedin: { color: '#0a66c2', bg: 'rgba(10, 102, 194, 0.08)' },
  github: { color: '#e6edf3', bg: 'rgba(230, 237, 243, 0.06)' },
  hashnode: { color: '#2962ff', bg: 'rgba(41, 98, 255, 0.08)' },
  twitter: { color: '#1da1f2', bg: 'rgba(29, 161, 242, 0.08)' },
  leetcode: { color: '#ffa116', bg: 'rgba(255, 161, 22, 0.08)' },
  instagram: { color: '#e1306c', bg: 'rgba(225, 48, 108, 0.08)' },
};

export const ContactView: React.FC<ContactViewProps> = ({ onToast }) => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSocialIcon = (label: string) => {
    switch (label) {
      case 'email': return <Mail size={16} />;
      case 'linkedin': return <LinkedinIcon size={16} />;
      case 'github': return <GithubIcon size={16} />;
      case 'hashnode': return <BookOpen size={16} />;
      case 'twitter': return <TwitterIcon size={16} />;
      case 'leetcode': return <Award size={16} />;
      case 'instagram': return <InstagramIcon size={16} />;
      default: return <Mail size={16} />;
    }
  };

  const getSocialLabel = (label: string) => {
    if (label === 'upi') return 'UPI Payment';
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const socials = [
    { label: 'email', value: portfolioConfig.email, href: `mailto:${portfolioConfig.email}` },
    { label: 'linkedin', value: 'linkedin.com/in/mahesh-diwan', href: portfolioConfig.links.linkedin },
    { label: 'github', value: 'github.com/mahesh-diwan', href: portfolioConfig.links.github },
    { label: 'hashnode', value: 'mahesh1215.hashnode.dev', href: portfolioConfig.links.hashnode },
    { label: 'twitter', value: 'x.com/mahesh_diwan1', href: portfolioConfig.links.twitter },
    { label: 'leetcode', value: 'leetcode.com/mahesh_diwan', href: portfolioConfig.links.leetcode },
    { label: 'instagram', value: 'instagram.com/mahesh_diwan1', href: portfolioConfig.links.instagram },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      onToast('⚠️', 'Please fill in all fields before sending!');
      return;
    }

    setFormState('sending');

    try {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Sender Email: ${email}\n\n` +
        `Message:\n${message}`
      );
      
      const mailtoUrl = `mailto:${portfolioConfig.email}?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoUrl;
      
      setFormState('sent');
      form.reset();
      onToast('✉️', 'Opening your mail client...');
      setTimeout(() => setFormState('idle'), 3000);
    } catch (err) {
      console.error('Mail client redirect error:', err);
      setFormState('error');
      onToast('❌', 'Failed to open mail client.');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <div 
      style={{
        ...styles.container,
        ['--social-name-size' as any]: isMobile ? '14px' : '13px',
        ['--social-value-size' as any]: isMobile ? '14px' : '12px',
      }} 
      className="view-container animate-slide-up"
    >
      <span style={styles.comment}>{"# contact.yaml — get in touch & online coordinates"}</span>
      
      <h1 style={styles.heading}>Contact Coordinates</h1>

      <div style={styles.layoutGrid} className="contact-layout-grid">
        {/* Left Side: Form */}
        <div style={styles.formContainer} className="reveal">
          <h2 style={styles.subHeading}>Send a message</h2>
          
          <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Ada Lovelace" 
                style={styles.input} 
                disabled={formState === 'sending' || formState === 'sent'}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="ada@computing.org" 
                style={styles.input} 
                disabled={formState === 'sending' || formState === 'sent'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea 
                name="message" 
                required 
                rows={5} 
                placeholder="Hey! Let's collaborate on some AI/ML projects..." 
                style={styles.textarea} 
                disabled={formState === 'sending' || formState === 'sent'}
              />
            </div>

            <button 
              type="submit" 
              disabled={formState === 'sending' || formState === 'sent'}
              style={{
                ...styles.submitBtn,
                backgroundColor: formState === 'sent' 
                  ? 'rgba(78, 201, 176, 0.2)' 
                  : formState === 'error'
                    ? 'rgba(244, 71, 71, 0.2)'
                    : 'var(--accent-dim)',
                borderColor: formState === 'sent' 
                  ? '#4ec9b0' 
                  : formState === 'error'
                    ? '#f44747'
                    : 'var(--accent)',
                color: formState === 'sent' 
                  ? '#4ec9b0' 
                  : formState === 'error'
                    ? '#f44747'
                    : 'var(--text-bright)',
                opacity: formState === 'sending' ? 0.6 : 1,
                cursor: formState === 'sending' || formState === 'sent' ? 'default' : 'pointer'
              }}
            >
              <Send size={12} style={{ marginRight: '6px' }} />
              {formState === 'sending' && '→ sending_message()...'}
              {formState === 'sent' && '→ message_sent()! :)'}
              {formState === 'error' && '→ send_failed(). Try again.'}
              {formState === 'idle' && '→ send_message()'}
            </button>
          </form>

          <p style={styles.formFooter}>
            {"// Pre-fills your default mail client directly"}
          </p>
        </div>

        {/* Right Side: Social cards grid */}
        <div style={styles.socialsColumn}>
          <h2 style={styles.subHeading}>Online Coordinates</h2>
          <div style={styles.socialGrid}>
            {socials.map((social) => {
              const brand = socialBrandColors[social.label] || { color: 'var(--text)', bg: 'var(--bg-hover)' };
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...styles.socialCard,
                    borderColor: 'var(--border)',
                  }}
                  className="social-card-item"
                >
                  <div 
                    style={{
                      ...styles.socialIconBg,
                      backgroundColor: brand.bg,
                      color: brand.color,
                    }}
                  >
                    {getSocialIcon(social.label)}
                  </div>
                  <div style={styles.socialDetails}>
                    <span style={styles.socialName}>{getSocialLabel(social.label)}</span>
                    <span style={styles.socialValue}>{social.value}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '940px',
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
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '32px',
  },
  formContainer: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
  },
  subHeading: {
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--text-bright)',
    marginBottom: '20px',
    fontWeight: 700,
    borderLeft: '3px solid var(--accent)',
    paddingLeft: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-dim)',
  },
  input: {
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '13px',
    color: 'var(--text-bright)',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  textarea: {
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '13px',
    color: 'var(--text-bright)',
    outline: 'none',
    transition: 'border-color 0.15s',
    resize: 'none',
  },
  submitBtn: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    border: '1px solid',
    borderRadius: '4px',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    transition: 'background-color 0.15s, color 0.15s, border-color 0.15s, opacity 0.15s',
  },
  formFooter: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--syntax-comment)',
    marginTop: '16px',
    textAlign: 'center',
  },
  socialsColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
  },
  socialCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '14px',
    textDecoration: 'none',
    transition: 'border-color 0.18s, background-color 0.18s',
  },
  socialIconBg: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  socialDetails: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  socialName: {
    fontSize: 'var(--social-name-size, 13px)',
    color: 'var(--text-bright)',
    fontWeight: 600,
  },
  socialValue: {
    fontSize: 'var(--social-value-size, 12px)',
    color: 'var(--text-dim)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};
