import { useState } from "react";
import { portfolioData } from "../../data/data";
import styles from "./History.module.css";
import { Element } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import Reveal from "../../components/Reveal/Reveal";

const History = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Element name="history" className={styles.history}>
      <div className={styles.bgAnimation}>
        <motion.div className={styles.symbol1} animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><FaGraduationCap /></motion.div>
        <motion.div className={styles.symbol2} animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}><FaBriefcase /></motion.div>
        <motion.div className={styles.symbol3} animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><FaGraduationCap /></motion.div>
      </div>
      <Reveal direction="down">
        <h2>History & Experience</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className={styles.subtitle}>Hover over an item to see more details</p>
      </Reveal>
      <div className={styles.timeline}>
        {portfolioData.history.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.1} direction="left" width="100%">
            <motion.div
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
          </Reveal>
        ))}
      </div>
    </Element>
  );
};

export default History;
