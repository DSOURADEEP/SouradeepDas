import { motion } from 'framer-motion';
import styles from './AnimatedTitle.module.css';

interface AnimatedTitleProps {
  title: string;
  targetWord?: string;
  className?: string;
}

const AnimatedTitle = ({ title, targetWord, className = '' }: AnimatedTitleProps) => {
  // If targetWord is provided, split the title and only underline the target
  if (targetWord) {
    const parts = title.split(targetWord);
    return (
      <h2 className={`${styles.title} ${className}`}>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i === 0 && (
              <span className={styles.targetWrapper}>
                <span className={styles.targetWord}>{targetWord}</span>
                <motion.svg 
                  className={styles.underline} 
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.path 
                    d="M 5 15 Q 40 5, 95 10" 
                    fill="transparent" 
                    stroke="var(--primary)" 
                    strokeWidth="3"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: { 
                        pathLength: 1, 
                        opacity: 1, 
                        transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
                      }
                    }}
                  />
                </motion.svg>
              </span>
            )}
          </span>
        ))}
      </h2>
    );
  }

  // Default: Underline the whole title
  return (
    <h2 className={`${styles.title} ${className}`}>
      <span className={styles.targetWrapper}>
        <span className={styles.targetWord}>{title}</span>
        <motion.svg 
          className={styles.underline} 
          viewBox="0 0 100 20" 
          preserveAspectRatio="none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.path 
            d="M 5 15 Q 40 5, 95 10" 
            fill="transparent" 
            stroke="var(--primary)" 
            strokeWidth="3"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 1, 
                transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
              }
            }}
          />
        </motion.svg>
      </span>
    </h2>
  );
};

export default AnimatedTitle;
