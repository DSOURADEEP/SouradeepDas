import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import { BsChatDotsFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const suggestedQuestions = [
  'What technologies does Souradeep know?',
  'Show me his work experience.',
  'What projects has he built?',
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleQuestion = (question: string) => {
    setMessages((prev) => [...prev, { type: 'user', text: question }]);

    setTimeout(() => {
      let targetSection = '';
      const q = question.toLowerCase();

      if (q.includes('skill') || q.includes('tech')) {
        targetSection = 'skills';
      } else if (q.includes('experience') || q.includes('work')) {
        targetSection = 'history';
      } else if (q.includes('project')) {
        targetSection = 'projects';
      } else {
        setMessages((prev) => [...prev, { type: 'bot', text: 'Sorry, I can only navigate to sections. Please try one of the suggested questions.' }]);
        return;
      }
      
      setMessages((prev) => [...prev, { type: 'bot', text: 'Sure, I will show you that!' }]);
      
      setTimeout(() => {
        scroller.scrollTo(targetSection, { smooth: true, duration: 500, offset: -80 });
        setIsOpen(false);
      }, 1000);

    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className={styles.chatHeader}>
              <p>Souradeep's Assistant</p>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>X</button>
            </div>
            <div className={styles.chatMessages}>
              <div className={styles.messageContainer}>
                <p className={styles.botMessage}>Hello! How can I help you navigate the portfolio?</p>
              </div>
              {messages.map((msg, index) => (
                <div key={index} className={styles.messageContainer} style={{ justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                  <p className={msg.type === 'user' ? styles.userMessage : styles.botMessage}>{msg.text}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.chatInputArea}>
                {suggestedQuestions.map(q => (
                    <button key={q} className={styles.suggestionBtn} onClick={() => handleQuestion(q)}>{q}</button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className={styles.fab} onClick={() => setIsOpen(!isOpen)}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <IoClose /> : <BsChatDotsFill />}
          </motion.div>
        </AnimatePresence>
      </button>
    </>
  );
};

export default Chatbot;
