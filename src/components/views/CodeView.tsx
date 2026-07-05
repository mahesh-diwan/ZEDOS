import React from 'react';

interface CodeViewProps {
  fileName: string;
  code: string;
}

export const CodeView: React.FC<CodeViewProps> = ({ fileName, code }) => {
  const getLanguage = (file: string) => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) return 'typescript';
    if (file.endsWith('.html')) return 'html';
    if (file.endsWith('.js')) return 'javascript';
    if (file.endsWith('.json')) return 'json';
    if (file.endsWith('.css')) return 'css';
    if (file.endsWith('.md')) return 'markdown';
    if (file.endsWith('.yaml') || file.endsWith('.yml')) return 'yaml';
    if (file.endsWith('.tf')) return 'terraform';
    if (file.endsWith('.sh')) return 'bash';
    if (file.toLowerCase().endsWith('dockerfile')) return 'dockerfile';
    return 'plaintext';
  };

  const highlightLine = (line: string, lang: string) => {
    if (!line.trim()) return <span className="syntax-normal">&nbsp;</span>;

    // Handle full line comments
    if (lang === 'typescript' || lang === 'javascript' || lang === 'css') {
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
        return <span className="syntax-comment">{line}</span>;
      }
    } else if (lang === 'markdown' || lang === 'html') {
      if (line.trim().startsWith('<!--') || line.trim().endsWith('-->')) {
        return <span className="syntax-comment">{line}</span>;
      }
    } else if (lang === 'yaml' || lang === 'terraform' || lang === 'bash' || lang === 'dockerfile') {
      if (line.trim().startsWith('#')) {
        return <span className="syntax-comment">{line}</span>;
      }
    }

    // Escape HTML characters to render correctly
    let escaped = line;

    // Apply regex highlighting
    // Note: To keep things simple and extremely robust, we can split by keywords, strings, etc.
    const parts: React.ReactNode[] = [];
    let currentIdx = 0;

    // Simple regex matching for common tokens
    // Keywords, Strings, Numbers, Comments, Tags, Functions
    const tokenRegex = /("(?:\\u[0-9a-fA-F]{4}|\\[^u]|[^"\\])*"|'(?:\\u[0-9a-fA-F]{4}|\\[^u]|[^'\\])*'|`[^`]*`|\/\/.*|#.*|<!--[\s\S]*?-->|\b(?:const|let|var|function|return|import|export|from|default|class|interface|type|public|private|as|extends|implements|div|section|h1|h2|h3|p|button|span|section|body|html|DOCTYPE|meta|head|link|href|className|onClick|true|false|null|interface|typeof|FROM|RUN|ENV|CMD|COPY|ADD|WORKDIR|EXPOSE|LABEL|AS|resource|variable|output|locals|provider|echo|declare|local|if|then|else|fi|for|in|do|done)\b|\b\d+\b)/g;

    let match;
    const matches: { text: string; index: number; type: string }[] = [];

    while ((match = tokenRegex.exec(escaped)) !== null) {
      const matchText = match[0];
      const index = match.index;

      let type = 'normal';
      if (matchText.startsWith('"') || matchText.startsWith("'") || matchText.startsWith('`')) {
        type = 'string';
      } else if (matchText.startsWith('//') || matchText.startsWith('#') || matchText.startsWith('<!--')) {
        type = 'comment';
      } else if (!isNaN(Number(matchText)) && matchText.trim() !== '') {
        type = 'number';
      } else if (
        ['div', 'section', 'h1', 'h2', 'h3', 'p', 'button', 'span', 'body', 'html', 'DOCTYPE', 'meta', 'head', 'link', 'FROM', 'RUN', 'ENV', 'CMD', 'COPY', 'ADD', 'WORKDIR', 'EXPOSE', 'LABEL', 'AS', 'resource', 'variable', 'output', 'locals', 'provider'].includes(matchText)
      ) {
        type = 'tag';
      } else {
        type = 'keyword';
      }

      matches.push({ text: matchText, index, type });
    }

    if (matches.length === 0) {
      return <span className="syntax-normal">{line}</span>;
    }

    matches.forEach((m, idx) => {
      // Add preceding normal text
      if (m.index > currentIdx) {
        parts.push(
          <span key={`n-${idx}`} className="syntax-normal">
            {escaped.substring(currentIdx, m.index)}
          </span>
        );
      }

      // Add highlighted token
      parts.push(
        <span key={`h-${idx}`} className={`syntax-${m.type}`}>
          {m.text}
        </span>
      );

      currentIdx = m.index + m.text.length;
    });

    if (currentIdx < escaped.length) {
      parts.push(
        <span key="last" className="syntax-normal">
          {escaped.substring(currentIdx)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  const lines = code.split('\n');
  const lang = getLanguage(fileName);

  return (
    <div style={styles.codeContainer} className="code-block animate-fade-in">
      <div style={styles.lineNumbers}>
        {lines.map((_, i) => (
          <div key={i} style={styles.lineNumber}>
            {i + 1}
          </div>
        ))}
      </div>
      <div style={styles.codeContent}>
        {lines.map((line, i) => (
          <div key={i} style={styles.codeLine}>
            {highlightLine(line, lang)}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  codeContainer: {
    display: 'flex',
    fontSize: '12px',
    lineHeight: '1.7',
    padding: '16px 8px',
    overflowY: 'auto',
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--bg)',
    boxSizing: 'border-box',
  },
  lineNumbers: {
    textAlign: 'right',
    paddingRight: '14px',
    color: 'var(--text-dim)',
    userSelect: 'none',
    width: '32px',
    flexShrink: 0,
    borderRight: '1px solid var(--border)',
  },
  lineNumber: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11.5px',
  },
  codeContent: {
    paddingLeft: '14px',
    flex: 1,
    overflowX: 'auto',
    whiteSpace: 'pre',
  },
  codeLine: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11.5px',
  },
};
