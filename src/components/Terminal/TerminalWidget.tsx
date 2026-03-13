import { useState } from 'react';
import styles from './TerminalWidget.module.css';
import Terminal from './Terminal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes } from 'react-icons/fa';

interface TerminalLine {
  type: 'input' | 'output';
  content: string | React.ReactNode;
}

const TerminalWidget = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to SD-OS v1.0.0 (Souradeep Das Operating System)' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);

  return (
    <div className={styles.terminalWidget}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.floatingTerminal}
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Terminal 
              onClose={onClose} 
              history={history} 
              setHistory={setHistory} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerminalWidget;
