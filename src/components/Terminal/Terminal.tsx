import React, { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';
import { portfolioData } from '../../data/data';
import { scroller } from 'react-scroll';

interface TerminalLine {
  type: 'input' | 'output';
  content: string | React.ReactNode;
}

interface TerminalProps {
  onClose?: () => void;
  history: TerminalLine[];
  setHistory: React.Dispatch<React.SetStateAction<TerminalLine[]>>;
}

const Terminal = ({ onClose, history, setHistory }: TerminalProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: 'input', content: cmd }];

    const navigateTo = (section: string) => {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -80,
      });
      if (onClose) setTimeout(onClose, 800);
    };

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className={styles.helpList}>
              <span>- help: List available commands</span>
              <span>- whoami: About me</span>
              <span>- projects: Go to Projects section</span>
              <span>- skills: Go to Skills section</span>
              <span>- history: Go to History section</span>
              <span>- home: Go to Home section</span>
              <span>- contact: Show contact info</span>
              <span>- clear: Clear terminal</span>
              <span>- exit: Close terminal</span>
            </div>
          ),
        });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: `I am ${portfolioData.name}, a ${portfolioData.title}. Passionate about building impactful tech solutions, I am a Software Engineer driven by curiosity, continuous learning, and a love for solving real-world problems through code.` });
        break;
      case 'projects':
        newHistory.push({ type: 'output', content: 'Navigating to Projects...' });
        navigateTo('projects');
        break;
      case 'skills':
        newHistory.push({ type: 'output', content: 'Navigating to Skills...' });
        navigateTo('skills');
        break;
      case 'history':
        newHistory.push({ type: 'output', content: 'Navigating to History...' });
        navigateTo('history');
        break;
      case 'home':
        newHistory.push({ type: 'output', content: 'Navigating to Home...' });
        navigateTo('home');
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          content: (
            <div className={styles.helpList}>
              <div>Email: {portfolioData.email}</div>
              <div>Phone: {portfolioData.phone}</div>
              <div>LinkedIn: {portfolioData.social.linkedin}</div>
              <div>GitHub: {portfolioData.social.github}</div>
            </div>
          ),
        });
        break;
      case 'exit':
        if (onClose) onClose();
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({ type: 'output', content: `Command not found: ${trimmedCmd}. Type "help" for available commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  return (
    <div className={styles.terminalWrapper} onClick={() => inputRef.current?.focus()}>
      <div className={styles.terminalHeader}>
        <div className={styles.dots}>
          <div className={styles.dot} style={{ backgroundColor: '#ff5f56' }} onClick={onClose} />
          <div className={styles.dot} style={{ backgroundColor: '#ffbd2e' }} />
          <div className={styles.dot} style={{ backgroundColor: '#27c93f' }} />
        </div>
        <div className={styles.title}>sd-os — bash — 80x24</div>
        <button className={styles.closeButton} onClick={onClose}>X</button>
      </div>
      <div className={styles.terminalBody}>
        {history.map((line, i) => (
          <div key={i} className={styles.line}>
            {line.type === 'input' ? (
              <span className={styles.prompt}>
                <span className={styles.user}>visitor</span>
                <span className={styles.at}>@</span>
                <span className={styles.host}>portfolio</span>
                <span className={styles.colon}>:</span>
                <span className={styles.tilde}>~</span>
                <span className={styles.dollar}>$</span> {line.content}
              </span>
            ) : (
              <div className={styles.output}>{line.content}</div>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.inputLine}>
          <span className={styles.prompt}>
            <span className={styles.user}>visitor</span>
            <span className={styles.at}>@</span>
            <span className={styles.host}>portfolio</span>
            <span className={styles.colon}>:</span>
            <span className={styles.tilde}>~</span>
            <span className={styles.dollar}>$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
            autoFocus
            spellCheck={false}
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Terminal;
