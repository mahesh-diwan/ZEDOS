import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileCode, 
  FileJson, 
  FileText, 
  Settings, 
  Plus, 
  FolderPlus,
  X
} from 'lucide-react';

interface ProjectPanelProps {
  activeFile: string;
  onFileSelect: (fileName: string) => void;
  openFiles: string[];
  onClose?: () => void;
}

interface FileItem {
  name: string;
  type: string;
  color: string;
  gitStatus?: 'M' | 'U' | 'A';
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
  activeFile,
  onFileSelect,
  openFiles,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const files: FileItem[] = [
    { name: 'README.md', type: 'md', color: '#98c379' },
    { name: 'ABOUT.md', type: 'md', color: '#61afef', gitStatus: 'M' },
    { name: 'PROJECTS.md', type: 'md', color: '#c678dd', gitStatus: 'M' },
    { name: 'BLOGS.md', type: 'md', color: '#e5c07b' },
    { name: 'RESUME.pdf', type: 'pdf', color: '#56b6c2' },
    { name: 'CONTACT.md', type: 'md', color: '#d19a66' },
  ];

  const getFileIcon = (type: string, color: string) => {
    switch (type) {
      case 'ts':
      case 'js':
      case 'tf':
      case 'sh':
      case 'dockerfile':
        return <FileCode size={14} style={{ color }} />;
      case 'json':
      case 'yaml':
        return <FileJson size={14} style={{ color }} />;
      case 'md':
      case 'pdf':
        return <FileText size={14} style={{ color }} />;
      default:
        return <FileCode size={14} style={{ color }} />;
    }
  };

  return (
    <div style={styles.sidebar} className="no-select project-sidebar">
      {/* Sidebar Header */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>Project</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={styles.actions}>
            <button style={styles.iconButton} title="New File"><Plus size={13} /></button>
            <button style={styles.iconButton} title="New Folder"><FolderPlus size={13} /></button>
          </div>
          {onClose && (
            <button 
              onClick={onClose} 
              style={styles.closeButton} 
              title="Close Panel"
              className="mobile-sidebar-close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* File Tree Root Folder */}
      <div style={styles.treeContainer}>
        <div 
          style={styles.folderRow}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span style={styles.folderName}>mahesh-portfolio</span>
        </div>

        {/* File items list with smooth collapse/expand transition */}
        <div 
          style={{
            ...styles.fileList,
            maxHeight: isExpanded ? '300px' : '0px',
            opacity: isExpanded ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
          }}
          className="file-tree-list"
        >
          {files.map((file) => {
            const isActive = activeFile === file.name;
            const isOpen = openFiles.includes(file.name);
            
            return (
              <div
                key={file.name}
                style={{
                  ...styles.fileRow,
                  backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                  borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                }}
                onClick={() => onFileSelect(file.name)}
                className="file-tree-row"
              >
                <div style={styles.indent} />
                {getFileIcon(file.type, file.color)}
                <span 
                  style={{
                    ...styles.fileName,
                    color: isActive ? 'var(--text-bright)' : isOpen ? 'var(--text)' : 'var(--text-dim)',
                    fontWeight: isActive ? 500 : 400,
                    flexGrow: 1,
                  }}
                >
                  {file.name}
                </span>
                {file.gitStatus && (
                  <span 
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: file.gitStatus === 'M' ? '#d19a66' : file.gitStatus === 'A' ? '#98c379' : '#56b6c2',
                      paddingRight: '6px',
                      fontFamily: 'var(--font-mono)',
                    }}
                    title={file.gitStatus === 'M' ? 'Modified' : file.gitStatus === 'A' ? 'Added' : 'Untracked'}
                  >
                    {file.gitStatus}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer / Settings Gear */}
      <div style={styles.footer}>
        <div style={styles.footerItem}>
          <Settings size={14} style={{ marginRight: '6px' }} />
          <span>Outline</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: '210px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    height: '36px',
    borderBottom: '1px solid var(--border)',
  },
  headerTitle: {
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: '10px',
    fontWeight: 700,
    color: 'var(--text-bright)',
  },
  actions: {
    display: 'flex',
    gap: '4px',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-dim)',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3px',
  },
  treeContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0',
  },
  folderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    color: 'var(--text-bright)',
    fontSize: '12px',
    fontWeight: 500,
  },
  folderName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
  },
  fileRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.1s',
  },
  indent: {
    width: '12px',
  },
  fileName: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11.5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '8px 14px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-dim)',
    fontSize: '11px',
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-dim)',
    cursor: 'pointer',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3px',
    width: '24px',
    height: '24px',
    transition: 'color 0.15s',
  },
};
