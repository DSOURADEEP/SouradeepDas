import { useState } from "react";
import { portfolioData } from "../../data/data";
import styles from "./History.module.css";
import { Element } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const History = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Element name="history" className={styles.history}>
      <div className={styles.bgAnimation}>
        <motion.div className={styles.symbol1} animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><FaGraduationCap /></motion.div>
        <motion.div className={styles.symbol2} animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}><FaBriefcase /></motion.div>
        <motion.div className={styles.symbol3} animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><FaGraduationCap /></motion.div>
      </div>
       <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        History & Experience
      </motion.h2>
      <p className={styles.subtitle}>Hover over an item to see more details</p>
      <div className={styles.timeline}>
        {portfolioData.history.map((item) => (
          <motion.div
            key={item.id}
            className={styles.timelineNode}
            onMouseEnter={() => setExpandedId(item.id)}
            onMouseLeave={() => setExpandedId(null)}
            layout
          >
            <motion.div className={styles.nodePoint} layout />
            <AnimatePresence>
              {expandedId === item.id ? (
                <motion.div
                  className={styles.details}
                  initial={{ opacity: 0, flexBasis: 0 }}
                  animate={{ opacity: 1, flexBasis: 'auto' }}
                  exit={{ opacity: 0, flexBasis: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  layout
                >
                  {item.type === "Work" ? (
                    <div>
                      <h3>{item.role}</h3>
                      <h4>{item.company}</h4>
                      <p className={styles.meta}>{item.location} | {item.dates}</p>
                      <ul>
                        {item.responsibilities?.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h3>{item.degree}</h3>
                      <h4>{item.institution}</h4>
                      <p className={styles.meta}>{item.location} | {item.dates}</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div className={styles.shortTitle} layout>
                  {item.shortTitle}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Element>
  );
};

export default History;
