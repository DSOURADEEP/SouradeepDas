import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChatDotsFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { portfolioData } from '../../data/data';

const suggestedQuestions = [
  'What are your top projects?',
  'What is your experience in SRE?',
  'Which tech stack do you use?',
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', text: message }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: portfolioData }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages((prev) => [...prev, { type: 'bot', text: data.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { type: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
    setInput('');
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
              <p>Souradeep's AI Assistant</p>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>X</button>
            </div>
            <div className={styles.chatMessages}>
              <div className={styles.messageContainer} style={{ justifyContent: 'flex-start' }}>
                <p className={styles.botMessage}>Hello! I'm an AI trained on Souradeep's portfolio. Ask me anything!</p>
              </div>
              {messages.map((msg, index) => (
                <div key={index} className={styles.messageContainer} style={{ justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                  <p className={msg.type === 'user' ? styles.userMessage : styles.botMessage}>{msg.text}</p>
                </div>
              ))}
              {isLoading && (
                <div className={styles.messageContainer} style={{ justifyContent: 'flex-start' }}>
                  <p className={styles.botMessage}>Thinking...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.chatInputArea}>
              <div className={styles.suggestions}>
                {suggestedQuestions.map((q) => (
                  <button key={q} className={styles.suggestionBtn} onClick={() => handleSend(q)} disabled={isLoading}>
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleInputSubmit} className={styles.inputForm}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()}>Send</button>
              </form>
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
