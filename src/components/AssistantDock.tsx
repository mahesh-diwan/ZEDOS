import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Gamepad2, ChevronLeft } from 'lucide-react';

interface AssistantDockProps {
  onClose: () => void;
  onNavigate: (fileName: string) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/* ─── Markdown-lite parser ───────────────────────────── */
const parseItalic = (text: string): React.ReactNode[] => {
  const regex = /\*([^*]+)\*/g;
  let match;
  const result: React.ReactNode[] = [];
  let lastIdx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) result.push(text.slice(lastIdx, match.index));
    result.push(
      <em key={`i-${match.index}`} style={{ opacity: 0.8, fontStyle: 'italic' }}>
        {match[1]}
      </em>
    );
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) result.push(text.slice(lastIdx));
  return result;
};

const renderMessageContent = (content: string, isUser: boolean) => {
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
    let cleanLine = isBullet ? line.trim().replace(/^[-*]\s+/, '') : line;

    const regex = /\*\*([^*]+)\*\*/g;
    let match;
    const result: React.ReactNode[] = [];
    let lastIdx = 0;
    while ((match = regex.exec(cleanLine)) !== null) {
      if (match.index > lastIdx) result.push(...parseItalic(cleanLine.slice(lastIdx, match.index)));
      result.push(
        <strong key={`b-${match.index}`} style={{ fontWeight: 700, opacity: isUser ? 0.95 : 1 }}>
          {match[1]}
        </strong>
      );
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < cleanLine.length) result.push(...parseItalic(cleanLine.slice(lastIdx)));

    if (isBullet) {
      return (
        <div key={idx} style={{ display: 'flex', gap: '6px', margin: '3px 0', paddingLeft: '4px' }}>
          <span style={{ color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--accent)', fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>•</span>
          <span style={{ flex: 1 }}>{result}</span>
        </div>
      );
    }
    return (
      <div key={idx} style={{ minHeight: line.trim() === '' ? '8px' : 'auto', margin: '0 0 4px 0' }}>
        {result}
      </div>
    );
  });
};

/* ─── Main Component ─────────────────────────────────── */
export const AssistantDock: React.FC<AssistantDockProps> = ({ onClose, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: "Hey there! I'm Mahesh's portfolio assistant. Ask me anything about his DevOps work, tech stack, or projects.\n\n*Tip: Type 'play dino' if you need a break. 🦖*",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDino, setShowDino] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dinoStateRef = useRef({
    running: false,
    started: false,
    gameOver: false,
    dino: { x: 40, y: 0, vy: 0, onGround: true, w: 20, h: 24 },
    cacti: [] as { x: number; y: number; w: number; h: number }[],
    score: 0,
    speed: 3.5,
    frame: 0,
    raf: null as number | null,
    groundY: 28,
  });

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showDino]);

  /* ─── Dino Game ────────────────────────────────────── */
  useEffect(() => {
    if (!showDino) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const h = dinoStateRef.current;

    h.dino.y = H - h.groundY - h.dino.h;
    h.running = true;
    h.started = false;
    h.gameOver = false;
    h.cacti = [];
    h.score = 0;
    h.speed = 3.5;
    h.frame = 0;

    const getVar = (v: string, fallback: string) => {
      try { return window.getComputedStyle(document.body).getPropertyValue(v).trim() || fallback; }
      catch { return fallback; }
    };

    const textColor   = getVar('--text-bright', '#c0caf5');
    const accentColor = getVar('--accent',      '#bb9af3');
    const borderColor = getVar('--border',      '#24283b');
    const dimColor    = getVar('--text-dim',    '#7982a9');

    const rect = (x: number, y: number, w: number, h2: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h2);
    };

    const drawDino = (x: number, y: number, frame: number) => {
      const leg = frame % 2 === 0;
      rect(x + 4, y, 12, 4, textColor);
      rect(x + 2, y + 4, 16, 4, textColor);
      rect(x, y + 8, 18, 4, textColor);
      rect(x + 2, y + 12, 14, 4, textColor);
      rect(x + 4, y + 16, 10, 4, textColor);
      if (leg) {
        rect(x + 4, y + 20, 3, 4, textColor);
        rect(x + 10, y + 20, 3, 4, textColor);
      } else {
        rect(x + 6, y + 20, 3, 4, textColor);
        rect(x + 12, y + 20, 3, 4, textColor);
      }
    };

    const drawCactus = (x: number, y: number, w: number, height: number) => {
      rect(x + w / 2 - 2, y, 4, height, accentColor);
      rect(x, y + height * 0.3, w, 4, accentColor);
    };

    const triggerJump = () => {
      if (h.gameOver) { h.gameOver = false; h.started = true; h.score = 0; h.cacti = []; return; }
      if (!h.started) h.started = true;
      if (h.dino.onGround) { h.dino.vy = -9.5; h.dino.onGround = false; }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); triggerJump(); }
    };
    const onClick = (e: MouseEvent) => { e.preventDefault(); triggerJump(); };

    window.addEventListener('keydown', onKey);
    canvas.addEventListener('mousedown', onClick);

    const loop = () => {
      if (!h.running) return;
      ctx.clearRect(0, 0, W, H);

      // Ground
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, H - h.groundY, W, 2);

      // Stars
      ctx.fillStyle = dimColor;
      [[30,15],[90,8],[150,20],[210,5],[280,18]].forEach(([cx, cy]) => {
        ctx.fillRect(cx, cy, 2, 2);
      });

      if (h.started) {
        h.frame++;
        h.score += 0.05;
        h.speed = 3.5 + h.score * 0.005;

        h.dino.vy += 0.45;
        h.dino.y += h.dino.vy;
        const maxY = H - h.groundY - h.dino.h;
        if (h.dino.y >= maxY) { h.dino.y = maxY; h.dino.vy = 0; h.dino.onGround = true; }

        if (h.frame % Math.max(80, 140 - Math.floor(h.score * 0.5)) === 0) {
          const cw = 10 + Math.random() * 8;
          const ch = 16 + Math.random() * 18;
          h.cacti.push({ x: W, y: H - h.groundY - ch, w: cw, h: ch });
        }

        h.cacti = h.cacti.filter((c) => c.x + c.w > 0);
        h.cacti.forEach((c) => { c.x -= h.speed; });

        const d = h.dino;
        for (const c of h.cacti) {
          if (d.x + d.w - 3 > c.x + 2 && d.x + 3 < c.x + c.w - 2 && d.y + d.h - 2 > c.y + 2 && d.y + 2 < c.y + c.h) {
            h.started = false; h.gameOver = true; break;
          }
        }

        h.cacti.forEach((c) => drawCactus(c.x, c.y, c.w, c.h));
        drawDino(d.x, d.y, d.onGround ? Math.floor(h.frame / 8) : 0);

        ctx.fillStyle = textColor;
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(String(Math.floor(h.score)).padStart(5, '0'), W - 6, 16);
      } else {
        drawDino(h.dino.x, H - h.groundY - h.dino.h, 0);

        if (h.gameOver) {
          ctx.fillStyle = 'rgba(0,0,0,0.45)';
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = getVar('--error', '#f7768e');
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Game Over', W / 2, H / 2 - 8);
          ctx.fillStyle = textColor;
          ctx.font = '10px monospace';
          ctx.fillText(`Score: ${Math.floor(h.score)}`, W / 2, H / 2 + 8);
          ctx.fillText('SPACE / TAP to restart', W / 2, H / 2 + 22);
        } else {
          ctx.fillStyle = dimColor;
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Press SPACE or TAP to start', W / 2, H / 2);
        }
      }

      h.raf = requestAnimationFrame(loop);
    };

    h.raf = requestAnimationFrame(loop);

    return () => {
      h.running = false;
      if (h.raf) cancelAnimationFrame(h.raf);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('mousedown', onClick);
    };
  }, [showDino]);

  /* ─── AI Reply Logic ─────────────────────────────────── */
  const getAssistantReply = (q: string): string => {
    const text = q.toLowerCase();

    if (text.includes('play dino') || text.includes('dino') || text.includes('dinosaur')) {
      setShowDino(true);
      return 'Launching Cactus Jump! Jump over the obstacles inside the panel. Good luck! 🦖';
    }

    if (text.includes('who') || text.includes('bio') || text.includes('name') || text.includes('about')) {
      onNavigate('ABOUT.md');
      return `Mahesh Diwan is a DevOps & Cloud Engineer based in Pune, India. He has internship experience deploying containerized MERN-stack and microservice applications on AWS ECS, EKS, and EC2. Currently pursuing his B.E. in Computer Science from MMIT Pune (8.7 GPA).\n\nI've opened **ABOUT.md** for you!`;
    }

    if (text.includes('skill') || text.includes('stack') || text.includes('language') || text.includes('framework')) {
      onNavigate('ABOUT.md');
      return `Mahesh's stack is centered around DevOps, Kubernetes, CI/CD, and cloud:\n- **Languages:** Python, Bash, JavaScript, C++, Java\n- **Cloud:** AWS (ECS, EKS, EC2, S3, ECR, ALB, CloudWatch, IAM)\n- **Containers & CI/CD:** Docker, Kubernetes, GitHub Actions, Jenkins, Terraform\n\nChecking **ABOUT.md** for details!`;
    }

    if (text.includes('project') || text.includes('build') || text.includes('pipeline')) {
      onNavigate('PROJECTS.md');
      return `Mahesh has shipped several high-impact projects:\n1. **LinkedIn Clone MERN:** AWS ECS Fargate + EKS with HPA autoscaling\n2. **Distributed Voting App:** 5-microservice Kubernetes system\n3. **CI/CD Flask App AWS:** Automated deploy pipeline via GitHub Actions\n4. **Chat With PDF Tool:** NLP Q&A using Hugging Face + LangChain\n\nOpened **PROJECTS.md** for the full catalog!`;
    }

    if (text.includes('experience') || text.includes('job') || text.includes('work') || text.includes('intern')) {
      onNavigate('ABOUT.md');
      return `Mahesh's experience:\n- **Associate Software Engineer (DevOps Intern) @ ThynkTech India** (Dec 2025 - May 2026): ECS, EKS, ALB, CloudWatch, GitHub Actions\n- **DevOps & Cloud Automation Developer** (Jan 2024 - Present): CI/CD, containerization, AWS optimization\n\nDetails in **ABOUT.md**!`;
    }

    if (text.includes('contact') || text.includes('hire') || text.includes('email') || text.includes('reach') || text.includes('collab')) {
      onNavigate('CONTACT.md');
      return `Reach Mahesh here:\n- **Email:** diwanmahesh11@gmail.com\n- **LinkedIn:** linkedin.com/in/mahesh-diwan/\n- **GitHub:** github.com/mahesh-diwan\n- **Hashnode:** mahesh1215.hashnode.dev\n\n**CONTACT.md** tab opened — you can send a message directly!`;
    }

    if (text.includes('coffee') || text.includes('support') || text.includes('buy')) {
      return `Support his work:\n- **International:** buymeacoffee.com/mahesh-diwan\n- **India (UPI):** diwanmahesh11@ybl\n\nMuch appreciated! 💜`;
    }

    const fallbacks = [
      "I'm Mahesh's portfolio copilot. Ask about his projects, skills, or experience — I know it all!",
      "He writes clean code and automates workflows. Jenkins keeps the bugs at bay! ⚙️",
      "Feel free to poke around the tabs for more info, or ask me anything specific.",
      "Drop him a message from the CONTACT.md tab or hit him on LinkedIn — he responds quickly.",
      "Every recruiter who visits is one step closer to a great hire. Just saying! 😉",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSend = () => {
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: Message = { id: `msg-${Date.now()}`, role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAssistantReply(query);
      setMessages((prev) => [...prev, { id: `msg-${Date.now() + 1}`, role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handlePreset = (q: string) => {
    const userMsg: Message = { id: `msg-${Date.now()}`, role: 'user', content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: `msg-${Date.now() + 1}`, role: 'assistant', content: getAssistantReply(q) }]);
      setIsTyping(false);
    }, 900);
  };

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <div style={styles.dock} className="animate-slide-up assistant-dock-panel">

      {/* Header */}
      <div style={styles.header} className="glass-surface no-select">
        <div style={styles.headerLeft}>
          <div style={styles.avatarSmall}>
            <Sparkles size={12} />
          </div>
          <div>
            <div style={styles.headerTitle}>AI Assistant</div>
            <div style={styles.headerSub}>
              <span className="online-dot" style={{ width: '5px', height: '5px' }} />
              <span style={styles.headerOnline}>online</span>
            </div>
          </div>
        </div>

        <div style={styles.headerRight}>
          {showDino && (
            <button style={styles.backBtn} onClick={() => setShowDino(false)} title="Back to Chat">
              <ChevronLeft size={12} />
              <span>Chat</span>
            </button>
          )}
          <button style={styles.closeBtn} onClick={onClose} title="Close">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {showDino ? (
          /* Dino Game */
          <div style={styles.dinoWrapper}>
            <div style={styles.dinoTitle}>
              <Gamepad2 size={14} style={{ color: 'var(--accent)' }} />
              <span>Cactus Jump 🦖</span>
            </div>
            <canvas
              ref={canvasRef}
              width={300}
              height={130}
              style={styles.canvas}
              className="dino-canvas-glow"
            />
            <p style={styles.dinoHint}>SPACE or TAP to jump</p>
          </div>
        ) : (
          /* Chat history */
          <div style={styles.chatHistory}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="chat-row"
                style={{
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="assistant-avatar">
                    <Sparkles size={11} />
                  </div>
                )}
                <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                  {renderMessageContent(msg.content, msg.role === 'user')}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chat-row">
                <div className="assistant-avatar"><Sparkles size={11} /></div>
                <div className="chat-bubble chat-bubble-assistant">
                  <div className="typing-indicator-dots">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>
        )}
      </div>

      {/* Preset suggestions */}
      {!showDino && messages.length <= 2 && !isTyping && (
        <div style={styles.suggestions} className="no-select">
          {[
            'Who is Mahesh?',
            'What is his tech stack?',
            'Tell me about his projects',
            'How can I contact him?',
          ].map((q) => (
            <button
              key={q}
              className="chat-suggestion-chip"
              onClick={() => handlePreset(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      {!showDino && (
        <div style={styles.inputArea}>
          <div className="chat-input-wrapper">
            <textarea
              ref={textareaRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={styles.textarea}
              className="assistant-textarea"
              rows={1}
            />
            <button
              className="btn-primary"
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                minWidth: '32px',
                flexShrink: 0,
                opacity: !inputVal.trim() || isTyping ? 0.5 : 1,
              }}
              onClick={handleSend}
              disabled={!inputVal.trim() || isTyping}
              title="Send"
            >
              <Send size={13} />
            </button>
          </div>
          <p style={styles.inputHint}>Shift+Enter for newline · Enter to send</p>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  dock: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    borderLeft: '1px solid var(--glass-border)',
    boxShadow: 'var(--glass-shadow)',
    overflow: 'hidden',
  },
  header: {
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--glass-border)',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarSmall: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    animation: 'avatarPulse 2.5s infinite ease-in-out',
  },
  headerTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'var(--text-bright)',
    lineHeight: 1.3,
  },
  headerSub: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '1px',
  },
  headerOnline: {
    fontSize: '10px',
    color: 'var(--success)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    background: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)',
    borderRadius: '5px',
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-dim)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    transition: 'color 0.15s',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  chatHistory: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  suggestions: {
    padding: '0 14px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flexShrink: 0,
  },
  inputArea: {
    padding: '12px 14px',
    borderTop: '1px solid var(--glass-border)',
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontSize: '13px',
    lineHeight: '1.5',
    fontFamily: 'var(--font-ui)',
    resize: 'none',
    padding: 0,
    caretColor: 'var(--accent)',
  },
  inputHint: {
    fontSize: '10px',
    color: 'var(--text-dim)',
    marginTop: '6px',
    textAlign: 'right',
    opacity: 0.7,
  },
  // Dino
  dinoWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    gap: '12px',
  },
  dinoTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-bright)',
  },
  canvas: {
    background: 'var(--bg-terminal)',
    borderRadius: '8px',
    display: 'block',
    cursor: 'pointer',
  },
  dinoHint: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    textAlign: 'center',
  },
};
