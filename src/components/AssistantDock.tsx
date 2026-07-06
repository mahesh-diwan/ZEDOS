import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Gamepad2 } from 'lucide-react';

interface AssistantDockProps {
  onClose: () => void;
  onNavigate: (fileName: string) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const parseItalic = (text: string): React.ReactNode[] => {
  const regex = /\*([^*]+)\*/g;
  let match;
  const result: React.ReactNode[] = [];
  let lastIdx = 0;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      result.push(text.slice(lastIdx, match.index));
    }
    result.push(<em key={`i-${match.index}`} style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>{match[1]}</em>);
    lastIdx = regex.lastIndex;
  }
  
  if (lastIdx < text.length) {
    result.push(text.slice(lastIdx));
  }
  return result;
};

const renderMessageContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    let cleanLine = line;
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
    if (isBullet) {
      cleanLine = line.trim().replace(/^[-*]\s+/, '');
    }

    const regex = /\*\*([^*]+)\*\*/g;
    let match;
    const result: React.ReactNode[] = [];
    let lastIdx = 0;
    
    while ((match = regex.exec(cleanLine)) !== null) {
      if (match.index > lastIdx) {
        const chunk = cleanLine.slice(lastIdx, match.index);
        result.push(...parseItalic(chunk));
      }
      result.push(<strong key={`b-${match.index}`} style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{match[1]}</strong>);
      lastIdx = regex.lastIndex;
    }
    
    if (lastIdx < cleanLine.length) {
      result.push(...parseItalic(cleanLine.slice(lastIdx)));
    }

    if (isBullet) {
      return (
        <div key={idx} style={{ display: 'flex', gap: '6px', margin: '4px 0', paddingLeft: '8px' }}>
          <span style={{ color: 'var(--accent)', fontSize: '10px', marginTop: '3px' }}>•</span>
          <span style={{ flex: 1 }}>{result}</span>
        </div>
      );
    }

    return <div key={idx} style={{ minHeight: line.trim() === '' ? '8px' : 'auto', margin: '0 0 6px 0' }}>{result}</div>;
  });
};

export const AssistantDock: React.FC<AssistantDockProps> = ({ onClose, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: "Hey there! I am Mahesh's portfolio assistant. If you're curious about his work in DevOps, cloud automation, or just want to know how to get in touch, ask me anything! \n\n*Tip: Type 'play dino' if you need a break from reading code. 🦖*",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDino, setShowDino] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // Dino Game logic
  useEffect(() => {
    if (!showDino) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const k = canvas.width;
    const C = canvas.height;
    const h = dinoStateRef.current;
    
    // Initialise Dino position
    h.dino.y = C - h.groundY - h.dino.h;
    h.running = true;
    h.started = false;
    h.gameOver = false;
    h.cacti = [];
    h.score = 0;
    h.speed = 3.5;
    h.frame = 0;

    const spawnCactus = () => {
      const w = 10 + Math.random() * 8;
      const height = 16 + Math.random() * 18;
      h.cacti.push({
        x: k,
        y: C - h.groundY - height,
        w,
        h: height,
      });
    };

    const triggerJump = () => {
      if (h.gameOver) {
        h.gameOver = false;
        h.started = true;
        h.score = 0;
        h.cacti = [];
        return;
      }
      if (!h.started) {
        h.started = true;
      }
      if (h.dino.onGround) {
        h.dino.vy = -9.5;
        h.dino.onGround = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        triggerJump();
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      e.preventDefault();
      triggerJump();
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousedown', handleCanvasClick);

    const getThemeColor = (varName: string, fallback: string) => {
      try {
        const val = window.getComputedStyle(document.body).getPropertyValue(varName).trim();
        return val || fallback;
      } catch (err) {
        return fallback;
      }
    };

    const textColor = getThemeColor('--text-bright', '#cdd6f4');
    const accentColor = getThemeColor('--accent', '#cba6f7');
    const borderColor = getThemeColor('--border', '#313244');
    const textDimColor = getThemeColor('--text-dim', '#6c7086');

    const drawRect = (x: number, y: number, w: number, height: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, height);
    };

    const drawDino = (x: number, y: number, frame: number) => {
      const color = textColor;
      const isLegUp = frame % 2 === 0;

      // Simple pixel block Dino
      drawRect(x + 4, y, 12, 4, color); // Head
      drawRect(x + 2, y + 4, 16, 4, color); // Eyes/mouth
      drawRect(x, y + 8, 18, 4, color); // Neck
      drawRect(x + 2, y + 12, 14, 4, color); // Body
      drawRect(x + 4, y + 16, 10, 4, color); // Tail
      
      // Legs
      if (isLegUp) {
        drawRect(x + 4, y + 20, 3, 4, color);
        drawRect(x + 10, y + 20, 3, 4, color);
      } else {
        drawRect(x + 6, y + 20, 3, 4, color);
        drawRect(x + 12, y + 20, 3, 4, color);
      }
    };

    const drawCactus = (x: number, y: number, w: number, height: number) => {
      const color = accentColor;
      drawRect(x + w / 2 - 2, y, 4, height, color); // Stem
      drawRect(x, y + height * 0.3, w, 4, color); // Arms
    };

    const gameLoop = () => {
      if (!h.running) return;
      
      ctx.clearRect(0, 0, k, C);

      // Draw ground line
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, C - h.groundY, k, 2);

      // Draw clouds (tiny stars)
      ctx.fillStyle = textDimColor;
      [[30, 15], [90, 8], [150, 20], [210, 5], [280, 18]].forEach(([cx, cy]) => {
        ctx.fillRect(cx, cy, 2, 2);
      });

      if (h.started) {
        h.frame++;
        h.score += 0.05;
        h.speed = 3.5 + h.score * 0.005;

        // Apply physics
        h.dino.vy += 0.45; // Gravity
        h.dino.y += h.dino.vy;

        const maxGroundY = C - h.groundY - h.dino.h;
        if (h.dino.y >= maxGroundY) {
          h.dino.y = maxGroundY;
          h.dino.vy = 0;
          h.dino.onGround = true;
        }

        // Spawn obstacles
        if (h.frame % Math.max(80, 140 - Math.floor(h.score * 0.5)) === 0) {
          spawnCactus();
        }

        // Move and filter obstacles
        h.cacti = h.cacti.filter((cact) => cact.x + cact.w > 0);
        h.cacti.forEach((cact) => {
          cact.x -= h.speed;
        });

        // Collision Check
        const d = h.dino;
        for (const cact of h.cacti) {
          if (
            d.x + d.w - 3 > cact.x + 2 &&
            d.x + 3 < cact.x + cact.w - 2 &&
            d.y + d.h - 2 > cact.y + 2 &&
            d.y + 2 < cact.y + cact.h
          ) {
            // Collision!
            h.started = false;
            h.gameOver = true;
            break;
          }
        }

        // Render obstacles
        h.cacti.forEach((cact) => {
          drawCactus(cact.x, cact.y, cact.w, cact.h);
        });

        // Render Dino
        drawDino(d.x, d.y, d.onGround ? Math.floor(h.frame / 8) : 0);

        // Render Score
        ctx.fillStyle = 'var(--text-bright)';
        ctx.font = '10px var(--font-mono)';
        ctx.fillText(String(Math.floor(h.score)).padStart(5, '0'), k - 45, 15);
      } else {
        // Not started
        drawDino(h.dino.x, C - h.groundY - h.dino.h, 0);

        if (h.gameOver) {
          // Semi-transparent overlay
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(0, 0, k, C);

          ctx.fillStyle = 'var(--error)';
          ctx.font = 'bold 12px var(--font-ui)';
          ctx.textAlign = 'center';
          ctx.fillText('Game Over', k / 2, C / 2 - 8);

          ctx.fillStyle = 'var(--text-bright)';
          ctx.font = '10px var(--font-mono)';
          ctx.fillText(`Score: ${Math.floor(h.score)}`, k / 2, C / 2 + 10);
          ctx.fillText('Press SPACE/TAP to restart', k / 2, C / 2 + 24);
        } else {
          ctx.fillStyle = 'var(--text-bright)';
          ctx.font = '11px var(--font-ui)';
          ctx.textAlign = 'center';
          ctx.fillText('Press SPACE or TAP to Jump', k / 2, C / 2);
        }
      }

      h.raf = requestAnimationFrame(gameLoop);
    };

    h.raf = requestAnimationFrame(gameLoop);

    return () => {
      h.running = false;
      if (h.raf) cancelAnimationFrame(h.raf);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('mousedown', handleCanvasClick);
    };
  }, [showDino]);

  // Reply generator logic
  const getAssistantReply = (q: string): string => {
    const text = q.toLowerCase();
    
    // Check custom trigger
    if (text.includes('play dino') || text.includes('dino') || text.includes('dinosaur')) {
      setShowDino(true);
      return "Launching Dino Game! Jump over the obstacles inside the panel. Good luck! 🦖";
    }

    if (text.includes('who') || text.includes('bio') || text.includes('name') || text.includes('about')) {
      onNavigate('profile.yaml');
      return `Mahesh Diwan is a DevOps & Cloud Engineer based in Pune, India. He has internship experience deploying containerized MERN-stack and microservice applications on AWS ECS, EKS, and EC2. He is currently pursuing his Bachelor of Engineering in Computer Science from MMIT Pune (8.7 GPA) and holds a Diploma in Computer Engineering (84%). Check the **profile.yaml** tab in the editor for more details!`;
    }

    if (text.includes('skill') || text.includes('stack') || text.includes('language') || text.includes('framework')) {
      onNavigate('skills.sh');
      return `Mahesh's tech stack is centered around DevOps, Kubernetes orchestration, CI/CD automation, and cloud:
- **Languages:** Python, Bash, JavaScript, C++, Java
- **Cloud & Infra:** AWS (ECS, EKS, EC2, S3, ECR, ALB, CloudWatch, IAM, VPC, CloudFront), Terraform
- **Containers & CI/CD:** Docker, Docker Compose, Kubernetes (Deployments, Services, HPA, ConfigMaps, Secrets), eksctl, GitHub Actions, Jenkins, SonarQube, Prometheus, Nginx

I've opened the **skills.sh** tab for you to inspect details!`;
    }

    if (text.includes('project') || text.includes('build') || text.includes('ship') || text.includes('pipeline') || text.includes('dino') || text.includes('pdf')) {
      onNavigate('projects.tf');
      return `Mahesh has shipped several high-impact cloud and automation projects:
1. **LinkedIn Clone MERN:** Deployed on AWS ECS Fargate and EKS with HPA autoscaling, CI/CD pipelines, and Prometheus logging.
2. **Distributed Voting App:** Orchestrated a 5-microservice system in Kubernetes with internal cluster DNS.
3. **CI/CD Flask App AWS:** Automated testing and continuous deployment pipeline to AWS EC2 using GitHub Actions and Nginx.
4. **Chat With PDF Tool:** A Streamlit natural-language Q&A tool using Hugging Face Transformers and LangChain.

I've activated the **projects.tf** tab so you can look at the full catalog!`;
    }

    if (text.includes('experience') || text.includes('job') || text.includes('work') || text.includes('intern') || text.includes('career')) {
      onNavigate('experience.dockerfile');
      return `Mahesh's automation journey includes:
- **Associate Software Engineer (DevOps Intern) at ThynkTech India (Dec 2025 - May 2026):** Deployed containerized applications to AWS ECS and EKS, configured task definitions, service auto-scaling, ALB target groups, eksctl, CloudWatch metrics, and built GitHub Actions pipelines.
- **DevOps & Cloud Automation Developer (Jan 2024 - Present):** Automating CI/CD pipelines, containerizing apps, and optimizing AWS resources.

The **experience.dockerfile** tab has the full details.`;
    }

    if (text.includes('contact') || text.includes('hire') || text.includes('email') || text.includes('reach') || text.includes('collab')) {
      onNavigate('contact.yaml');
      return `For professional opportunities, collabs, or to discuss code, Mahesh is online here:
- **Email:** diwanmahesh11@gmail.com
- **LinkedIn:** linkedin.com/in/mahesh-diwan/
- **GitHub:** github.com/mahesh-diwan
- **Hashnode:** mahesh1215.hashnode.dev

I've opened the **contact.yaml** tab, where you can submit a message directly through the form!`;
    }

    if (text.includes('coffee') || text.includes('support') || text.includes('buy')) {
      return `You can support his work by buying him a coffee:
- International support: buymeacoffee.com/mahesh-diwan
- India support (UPI): diwanmahesh11@ybl (₹1+, any UPI app)

Much appreciated! 💜`;
    }

    if (text.includes('chatgpt') || text.includes('gpt') || text.includes('claude') || text.includes('llama')) {
      return "I am not ChatGPT or Claude, but a custom AI assistant crafted specifically for Mahesh's portfolio workspace. Though, I was coded with love! 😄";
    }

    // Default witty replies from Mahesh's guidelines
    const fallbacks = [
      "I'm Mahesh's portfolio copilot, not a general coding assistant. While you're here — he's built some interesting stuff in the projects.tf tab.",
      "He writes clean code and automates workflows. I tried to find the bugs, but his Jenkins pipelines filtered them out! ⚙️",
      "I'm just a friendly AI assistant, feel free to poke around the tabs for more info.",
      "Fair. Drop him a message from the contact.yaml tab or hit him on LinkedIn — he takes feedback seriously.",
      "Every recruiter who visits after you is already doing better. (Just kidding, or am I? 😉)",
    ];

    const randomIdx = Math.floor(Math.random() * fallbacks.length);
    return fallbacks[randomIdx];
  };

  const handleSend = () => {
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAssistantReply(query);
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePresetQuestion = (q: string) => {
    setInputVal(q);
    // Send it immediately
    setTimeout(() => {
      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: q,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputVal('');
      setIsTyping(true);

      setTimeout(() => {
        const reply = getAssistantReply(q);
        const assistantMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: reply,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, 1000);
    }, 50);
  };

  return (
    <div 
      style={{
        ...styles.assistantDock,
        width: isMobile ? '100%' : '380px',
      }} 
      className="reveal animate-slide-up assistant-dock-panel"
    >
      {/* 1. Header */}
      <div style={styles.header} className="no-select">
        <div style={styles.headerLeft}>
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
          <span style={styles.headerTitle}>AI Assistant</span>
          <div style={styles.statusWrapper}>
            <span className="online-dot" />
            <span style={styles.statusText}>online</span>
          </div>
        </div>
        <div style={styles.headerRight}>
          {showDino && (
            <button 
              style={styles.dinoToggle} 
              onClick={() => setShowDino(false)} 
              title="Return to Chat"
            >
              Back to Chat
            </button>
          )}
          <button style={styles.closeBtn} onClick={onClose} title="Close Panel">
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 2. Messages or Dino canvas */}
      <div style={styles.contentArea}>
        {showDino ? (
          <div style={styles.dinoContainer}>
            <div style={styles.dinoHeader}>
              <Gamepad2 size={14} style={{ color: 'var(--accent)', marginRight: '6px' }} />
              <span style={{ fontWeight: 600 }}>Cactus Jump 🦖</span>
            </div>
            <canvas 
              ref={canvasRef} 
              width={280} 
              height={120} 
              style={styles.canvas} 
              className="dino-canvas-glow"
            />
            <p style={styles.dinoTip}>
              Use <strong>SPACE</strong> or <strong>CLICK</strong> on canvas to jump!
            </p>
          </div>
        ) : (
          <div style={styles.chatHistory}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className="chat-row"
                style={{
                  ...styles.msgRow,
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="assistant-avatar"><Sparkles size={11} /></div>
                )}
                <div 
                  className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            
            {/* Loading typing indicator */}
            {isTyping && (
              <div className="chat-row" style={styles.msgRow}>
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

      {/* Preset Suggestions (only shown in chat mode, when history is brief) */}
      {!showDino && messages.length <= 2 && !isTyping && (
        <div style={styles.suggestions} className="no-select">
          {[
            "Who is Mahesh?",
            "What is his tech stack?",
            "Tell me about his projects",
            "How can I contact him?",
          ].map((q) => (
            <button 
              key={q} 
              className="chat-suggestion-chip"
              onClick={() => handlePresetQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* 3. Input Textbox (not shown in Dino mode) */}
      {!showDino && (
        <div style={styles.inputArea}>
          <div className="chat-input-wrapper">
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={styles.textarea}
              rows={1}
            />
            <button 
              style={styles.sendBtn} 
              onClick={handleSend} 
              disabled={!inputVal.trim() || isTyping}
              title="Send Message"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  assistantDock: {
    width: '380px',
    backgroundColor: 'var(--bg)',
    borderLeft: '1px solid var(--border)',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexShrink: 0,
    zIndex: 30,
  },
  header: {
    height: '38px',
    borderBottom: '1px solid var(--border)',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--bg-titlebar)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '12px',
    color: 'var(--text-bright)',
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginLeft: '6px',
    backgroundColor: 'var(--accent-dim)',
    padding: '2px 6px',
    borderRadius: '10px',
    border: '1px solid var(--accent-border)',
  },
  statusText: {
    fontSize: '9px',
    fontWeight: 600,
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    lineHeight: 1,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dinoToggle: {
    fontSize: '9px',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '4px',
    padding: '2px 6px',
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
    borderRadius: '3px',
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHistory: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  msgRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
    width: '100%',
  },
  assistantAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-dim)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 700,
    flexShrink: 0,
    marginTop: '2px',
  },
  msgBubble: {
    border: '1px solid',
    padding: '12px 14px',
    fontSize: '13px',
    lineHeight: '1.6',
    fontFamily: 'var(--font-ui)',
    maxWidth: '85%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    whiteSpace: 'pre-wrap',
  },
  typingDots: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0',
  },
  suggestions: {
    padding: '0 16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  suggestionChip: {
    background: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '12px',
    lineHeight: '1.4',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  inputArea: {
    padding: '12px',
    borderTop: '1px solid var(--border)',
    backgroundColor: 'var(--bg-titlebar)',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontSize: '13px',
    lineHeight: '1.4',
    fontFamily: 'var(--font-ui)',
    resize: 'none',
    padding: 0,
    caretColor: 'var(--accent)',
  },
  sendBtn: {
    background: 'var(--accent-dim)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    borderRadius: '4px',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background-color 0.12s, color 0.12s',
  },
  dinoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  dinoHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: 'var(--text-bright)',
    marginBottom: '16px',
  },
  canvas: {
    backgroundColor: 'var(--bg-terminal)',
    border: '2px solid var(--border)',
    borderRadius: '6px',
    display: 'block',
    cursor: 'pointer',
  },
  dinoTip: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    marginTop: '12px',
    textAlign: 'center',
  },
};
