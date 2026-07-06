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
  cat <file>       — open and view a file in the editor (e.g., cat ABOUT.md)
  open <file>      — same as cat
  about            — open biography and objectives (ABOUT.md)
  skills           — open skills matrix (ABOUT.md)
  projects         — open projects portfolio (PROJECTS.md)
  resume           — open resume panel (RESUME.pdf)
  blog             — open writings feed (BLOGS.md)
  contact          — open contact details (CONTACT.md)
  github           — open GitHub profile in a new tab
  linkedin         — open LinkedIn profile in a new tab
  neofetch         — display ZEDOS system diagnostics
  docker ps        — check running container tasks (DevOps)
  kubectl get pods — fetch active Kubernetes pods status (K8s)
  terraform plan   — generate simulated infrastructure plans (IaC)
  whoami           — display bio overview
  date             — show current date and time
  git log          — show simulated commits
  clear            — clear terminal output history`;
        break;

      case 'ls':
        output = `README.md    ABOUT.md    PROJECTS.md    BLOGS.md    CERTIFICATIONS.md    RESUME.pdf    CONTACT.md`;
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

      case 'neofetch':
        output = `   .──────────────────────────.     mahesh@ZEDOS
  /  (o.o)                     \\    ------------
 /    > ^ <                     \\   OS: ZEDOS v1.1.0 (Custom Portfolio Shell)
|     /     \\                    |  Kernel: React 19.2.7 + TypeScript
|    (  | |  )                   |  Shell: bash 5.2.15 (interactive)
 \\    (__|__)                   /   Uptime: 4 hours, 18 mins
  \\                            /    Package Manager: npm + Vite
   '──────────────────────────'     DevOps Stack: AWS EKS, K8s, Terraform, Docker
                                    Career Target: Cloud & DevOps Engineer`;
        break;

      case 'docker':
        if (args[0] === 'ps') {
          output = `+--------------+-----------------+-----------------------+-------------+-------------+------------------------+
| CONTAINER ID | IMAGE           | COMMAND               | CREATED     | STATUS      | PORTS                  |
+--------------+-----------------+-----------------------+-------------+-------------+------------------------+
| f9a2e31bc439 | nginx:alpine    | "/docker-entrypoint…" | 2 hours ago | Up 2 hours  | 0.0.0.0:80->80/tcp     |
| 8d2a1c4e9b92 | node:20-alpine  | "docker-entrypoint.s…"| 2 hours ago | Up 2 hours  | 0.0.0.0:3000->3000/tcp |
| a1b2c3d4e5f6 | mongo:latest    | "docker-entrypoint.s…"| 2 hours ago | Up 2 hours  | 27017/tcp              |
+--------------+-----------------+-----------------------+-------------+-------------+------------------------+`;
        } else {
          output = `docker: support command option 'ps' to view container tasks.`;
        }
        break;

      case 'kubectl':
        if (args.join(' ') === 'get pods') {
          output = `AWS EKS ACTIVE WORKLOAD TELEMETRY:
+------------------------------------+---------+---------+------------+-----+
| NAME                               | READY   | STATUS  | RESTARTS   | AGE |
+------------------------------------+---------+---------+------------+-----+
| linkedin-mern-web-7fd89c56-abcde   | 1/1     | Running | 0          | 5d  |
| voting-app-worker-c4d92a18-xyz12   | 1/1     | Running | 1          | 2d  |
| redis-cache-77c858546b-pqrst       | 1/1     | Running | 0          | 12d |
| postgres-db-0                      | 1/1     | Running | 0          | 12d |
+------------------------------------+---------+---------+------------+-----+`;
        } else {
          output = `kubectl: support options 'get pods' to query cluster workload statuses.`;
        }
        break;

      case 'terraform':
        if (args[0] === 'plan') {
          output = `Terraform execution plan: 2 to add, 0 to change, 0 to destroy.

[+] aws_s3_bucket.portfolio_assets
    ├── arn: (known after apply)
    ├── bucket: "mahesh-portfolio-static-assets"
    └── force_destroy: false

[+] github_repository_deploy_key.pages_key
    ├── id: (known after apply)
    ├── key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ..."
    └── repository: "ZEDOS"`;
        } else {
          output = `terraform: support 'plan' command to audit state adjustments.`;
        }
        break;

      case 'cat':
      case 'open':
        if (args.length === 0) {
          output = `Usage: ${command} <filename>`;
        } else {
          const fileArg = args[0].toUpperCase();
          let matchedFile = '';
          if (fileArg.includes('READ') || fileArg.includes('HOME')) matchedFile = 'README.md';
          else if (fileArg.includes('ABOUT') || fileArg.includes('PROFILE')) matchedFile = 'ABOUT.md';
          else if (fileArg.includes('PROJ')) matchedFile = 'PROJECTS.md';
          else if (fileArg.includes('BLOG')) matchedFile = 'BLOGS.md';
          else if (fileArg.includes('RESU')) matchedFile = 'RESUME.pdf';
          else if (fileArg.includes('CONT')) matchedFile = 'CONTACT.md';

          if (matchedFile) {
            onOpenFile(matchedFile);
            output = `Opening ${matchedFile} in editor tabs...`;
          } else {
            output = `cat: ${args[0]}: File not found. Type 'ls' to see list of valid files.`;
          }
        }
        break;

      case 'projects':
        onOpenFile('PROJECTS.md');
        output = 'Opening PROJECTS.md in editor tabs...';
        break;
      case 'resume':
        onOpenFile('RESUME.pdf');
        output = 'Opening RESUME.pdf in editor tabs...';
        break;
      case 'blog':
      case 'blogs':
        onOpenFile('BLOGS.md');
        output = 'Opening BLOGS.md in editor tabs...';
        break;
      case 'contact':
        onOpenFile('CONTACT.md');
        output = 'Opening CONTACT.md in editor tabs...';
        break;
      case 'about':
        onOpenFile('ABOUT.md');
        output = 'Opening ABOUT.md in editor tabs...';
        break;
      case 'github':
        window.open('https://github.com/mahesh-diwan', '_blank');
        output = 'Opening GitHub profile in a new browser tab...';
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/mahesh-diwan/', '_blank');
        output = 'Opening LinkedIn profile in a new browser tab...';
        break;
      case 'skills':
        onOpenFile('ABOUT.md');
        output = 'Opening ABOUT.md (Skills tab) in editor tabs...';
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
