import { useState, useEffect } from "react";
import { portfolioData } from "../../data/data";
import styles from "./History.module.css";
import { Element } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../../components/Reveal/Reveal";
import AnimatedTitle from "../../components/AnimatedTitle/AnimatedTitle";

const History = () => {
  const [activeItem, setActiveItem] = useState(portfolioData.history[0]);
  const [isChanging, setIsChanging] = useState(false);
  const [displayItem, setDisplayItem] = useState(portfolioData.history[0]);

  const handleItemClick = (item: any) => {
    if (item.id === displayItem.id || isChanging) return;
    
    setIsChanging(true);
    
    // Step 1: Close the scroll
    setTimeout(() => {
      setDisplayItem(item);
      setActiveItem(item);
      // Step 2: Re-open with new content after a slight pause at the closed state
      setTimeout(() => {
        setIsChanging(false);
      }, 100);
    }, 800); // Slower, more deliberate closing
  };

  return (
    <Element name="history" className={styles.history}>
      <div className={styles.headerArea}>
        <AnimatedTitle title="History & Experience" targetWord="Experience" />
        <p className={styles.subtitle}>Select a role to unroll the ancient scroll</p>
      </div>

      <div className={styles.interactiveContainer}>
        {/* Sidebar for Selection */}
        <div className={styles.sidebar}>
          {portfolioData.history.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1} direction="left">
              <motion.div
                className={`${styles.sideItem} ${activeItem.id === item.id ? styles.active : ''}`}
                onClick={() => handleItemClick(item)}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.itemIcon}>
                  {item.type === "Work" ? "📜" : "🏺"}
                </div>
                <div className={styles.itemTitle}>
                  {item.shortTitle}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Ancient Scroll Display */}
        <Reveal delay={0.3} direction="right" width="100%">
          <div className={styles.scrollWrapper}>
            {/* The Top Roller */}
            <motion.div 
              className={styles.scrollTop}
              initial={false}
              animate={{ 
                y: isChanging ? "50%" : 0,
                rotate: isChanging ? 360 : 0
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className={styles.scrollHandle}></div>
            </motion.div>
            
            <motion.div 
              className={styles.scrollPaper}
              initial={false}
              animate={{ 
                height: isChanging ? 0 : "auto",
                opacity: isChanging ? 0 : 1,
                scaleY: isChanging ? 0 : 1
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ originY: "center" }}
            >
              <div className={styles.scrollContent}>
                <AnimatePresence mode="wait">
                  {!isChanging && (
                    <motion.div
                      key={displayItem.id}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {displayItem.type === "Work" ? (
                        <>
                          <h3 className={styles.roleTitle}>{displayItem.role}</h3>
                          <h4 className={styles.companyName}>{displayItem.company}</h4>
                          <p className={styles.metaData}>{displayItem.location} | {displayItem.dates}</p>
                          <ul className={styles.responsibilities}>
                            {displayItem.responsibilities?.map((res, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                              >
                                {res}
                              </motion.li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <>
                          <h3 className={styles.roleTitle}>{displayItem.degree}</h3>
                          <h4 className={styles.companyName}>{displayItem.institution}</h4>
                          <p className={styles.metaData}>{displayItem.location} | {displayItem.dates}</p>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* The Bottom Roller */}
            <motion.div 
              className={styles.scrollBottom}
              initial={false}
              animate={{ 
                y: isChanging ? "-50%" : 0,
                rotate: isChanging ? -360 : 0
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className={styles.scrollHandle}></div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </Element>
  );
};

export default History;
