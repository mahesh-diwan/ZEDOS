import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TermIcon } from 'lucide-react';
import { portfolioConfig } from '../portfolioConfig';

interface TerminalDockProps {
  onClose: () => void;
  onOpenFile: (fileName: string) => void;
}

interface HistoryItem {
  type: 'input' | 'output';
  text: string;
}

export const TerminalDock: React.FC<TerminalDockProps> = ({ onClose, onOpenFile }) => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: "Welcome to Mahesh's portfolio interactive terminal!" },
    { type: 'output', text: "Type 'help' to see available commands." },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => {
      if (prev.length > 0 && prev[prev.length - 1] === trimmed) {
        return prev;
      }
      return [...prev, trimmed];
    });
    setHistoryIdx(-1);

    const newHistory = [...history, { type: 'input' as const, text: trimmed }];

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  ls               — list files in current workspace
  pwd              — print working directory path
  cat <file>       — open and view a file in the editor
  open <file>      — same as cat
  whoami           — display bio overview
  date             — show current date and time
  echo <text>      — print text to terminal
  git log          — show simulated commits
  python --version — show Python runtime version
  neofetch         — display ZEDOS system diagnostics
  joke             — display a random developer joke
  matrix           — enter the matrix code rain
  antigravity      — import flight simulator
  clear            — clear terminal output history`;
        break;

      case 'ls':
        output = `home.tsx    profile.yaml    projects.tf    skills.sh    experience.dockerfile    contact.yaml    blog.md    README.md    Mahesh_Diwan_Resume.pdf`;
        break;

      case 'pwd':
        output = `/home/mahesh-diwan/zedos`;
        break;

      case 'whoami':
        output = `${portfolioConfig.name} - ${portfolioConfig.role}\nBased in ${portfolioConfig.location}.\nBio: ${portfolioConfig.bioShort}`;
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'git':
        if (args[0] === 'log') {
          output = `commit a3f1c2e (HEAD -> main)
Author: Mahesh Diwan <diwanmahesh11@gmail.com>
Date:   Thu Jul 2 14:20:11 2026 +0530

    feat: setup automated dockerized deploy pipeline with github actions

commit b7d4a1f
Author: Mahesh Diwan <diwanmahesh11@gmail.com>
Date:   Wed Jun 18 10:12:05 2026 +0530

    fix: optimize AWS resource tracker script performance and cron logging

commit d1f8c4a
Author: Mahesh Diwan <diwanmahesh11@gmail.com>
Date:   Mon Jun 2 11:34:52 2026 +0530

    chore: add interactive terminal interface to zedos portfolio`;
        } else {
          output = `git: try 'git log' to see recent changes.`;
        }
        break;

      case 'python':
        if (args[0] === '--version' || args[0] === '-V') {
          output = `Python 3.11.4`;
        } else {
          output = `Python interactive mode not supported in browser. Use --version to check runtime.`;
        }
        break;

      case 'cat':
      case 'open':
        if (args.length === 0) {
          output = `Usage: ${command} <filename>`;
        } else {
          const fileName = args[0];
          const files = [
            'home.tsx',
            'profile.yaml',
            'projects.tf',
            'skills.sh',
            'experience.dockerfile',
            'contact.yaml',
            'blog.md',
            'README.md',
            'Mahesh_Diwan_Resume.pdf',
          ];
          if (files.includes(fileName)) {
            onOpenFile(fileName);
            output = `Opening ${fileName} in editor tabs...`;
          } else {
            output = `cat: ${fileName}: File not found in workspace. Type 'ls' to see files.`;
          }
        }
        break;

      case 'neofetch':
        output = `     /\\_/\\      mahesh@ZEDOS
    ( o.o )     ------------
     > ^ <      OS: ZEDOS v1.0.0 (Custom Portfolio Shell)
    /     \\     Host: Web-Vite-SPA Engine
   (  | |  )    Kernel: React 19.2.7 + TypeScript
    (__|__)     Uptime: 2 hours, 48 mins
                Shell: Bash interactive-shell.sh
                Themes: Tokyo Night, Catppuccin, Nord, Dracula, Rosé Pine
                Monospace Font: Geist Mono / Fira Code / JetBrains Mono
                Career Path: Cloud & DevOps Engineer
                Stack: Kubernetes, Terraform, Docker, AWS (ECS/EKS)`;
        break;

      case 'joke': {
        const jokes = [
          "Why did the DevOps engineer separate their dev and prod environments? They wanted some isolation time.",
          "There are 10 types of people: those who understand binary, and those who don't.",
          "Why did the Docker container get sent to principal? Too many packaging issues.",
          "How many programmers does it take to change a light bulb? None, it's a hardware issue.",
          "What's a database administrator's favorite game? Table tennis!"
        ];
        output = jokes[Math.floor(Math.random() * jokes.length)];
        break;
      }

      case 'matrix':
        output = `Initializing Matrix Stream...
🤖 0101010101010101010101010101010101010101
💾 Follow the white rabbit, Mahesh...
🕶️ You took the red pill. ZEDOS rules the grid.`;
        break;

      case 'antigravity':
        output = `✈️  import antigravity
Loading gravity bypass module...
*Whoa, you're flying!* Refer to https://xkcd.com/353/ for flight instruction.`;
        break;

      case 'sudo':
        if (args.join(' ').includes('rm -rf')) {
          output = `🚨 ACCESS DENIED: Nice try! I am not letting you wipe Mahesh's workspace. Nice security test!`;
        } else {
          output = `mahesh is not in the sudoers file. This incident will be reported.`;
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = `shell: command not found: ${command}. Type 'help' to see list of valid options.`;
    }

    setHistory([...newHistory, { type: 'output', text: output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInputVal(cmdHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      if (historyIdx === cmdHistory.length - 1) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInputVal(cmdHistory[newIdx]);
      }
    }
  };

  return (
    <div style={styles.terminalPanel} className="reveal animate-slide-up terminal-dock-panel" onClick={handleFocus}>
      {/* Terminal Title Header */}
      <div style={styles.termHeader} className="no-select">
        <div style={styles.tabGroup}>
          <div style={styles.activeTab}>
            <TermIcon size={12} style={{ marginRight: '6px' }} />
            <span>Terminal</span>
          </div>
          <div style={styles.inactiveTab}>Diagnostics</div>
          <div style={styles.inactiveTab}>Output</div>
        </div>
        <button style={styles.closeBtn} onClick={onClose} title="Close Panel">
          <X size={12} />
        </button>
      </div>

      {/* Terminal Output history & Input box */}
      <div style={styles.termContainer}>
        {history.map((item, idx) => (
          <div key={idx} style={styles.historyLine}>
            {item.type === 'input' ? (
              <div style={styles.inputPromptRow}>
                <span style={styles.prompt}>mahesh@zedos:~$</span>
                <span style={styles.inputText}>{item.text}</span>
              </div>
            ) : (
              <div style={styles.outputText}>{item.text}</div>
            )}
          </div>
        ))}
        {/* Active input line */}
        <div style={styles.inputPromptRow}>
          <span style={styles.prompt}>mahesh@zedos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.termInput}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  terminalPanel: {
    height: '200px',
    backgroundColor: 'var(--bg-terminal)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    zIndex: 20,
  },
  termHeader: {
    height: '32px',
    backgroundColor: 'var(--bg-sidebar)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
  },
  tabGroup: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  activeTab: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-bright)',
    borderBottom: '2px solid var(--accent)',
    padding: '0 12px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  inactiveTab: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    padding: '0 12px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
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
  termContainer: {
    flex: 1,
    padding: '12px 16px',
    overflowY: 'auto',
    fontFamily: 'var(--font-mono)',
    fontSize: '11.5px',
    lineHeight: '1.65',
    color: 'var(--text-bright)',
  },
  historyLine: {
    marginBottom: '4px',
  },
  inputPromptRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  prompt: {
    color: 'var(--success)',
    fontWeight: 700,
    flexShrink: 0,
  },
  inputText: {
    color: 'var(--text-bright)',
  },
  outputText: {
    color: 'var(--text)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  termInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontFamily: 'var(--font-mono)',
    fontSize: '11.5px',
    padding: 0,
    caretColor: 'var(--accent)',
  },
};
