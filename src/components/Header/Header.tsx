import { useState, useRef, useEffect } from "react";
import { scroller } from "react-scroll";
import styles from "./Header.module.css";
import { motion, useMotionValue, animate } from "framer-motion";

const navItems = ["Home", "Projects", "History", "Skills"];
const ITEM_WIDTH = 100;

const Header = ({ visibleSection, onConsoleClick }: { visibleSection: string, onConsoleClick: () => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectorX = useMotionValue(0);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animateSelectorTo = (index: number) => {
    const targetX = index * ITEM_WIDTH;
    animate(selectorX, targetX, {
      type: "spring",
      stiffness: 250,
      damping: 30,
      mass: 1,
    });
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    animateSelectorTo(index);
    scroller.scrollTo(navItems[index].toLowerCase(), {
      smooth: true,
      duration: 500,
      offset: -120, // Adjust offset for the new floating header
    });
  };

  useEffect(() => {
    const newIndex = navItems.indexOf(visibleSection);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      animateSelectorTo(newIndex);
    }
  }, [visibleSection]);

  useEffect(() => {
    animateSelectorTo(activeIndex);
  }, []);

  return (
    <header className={styles.headerWrapper}>
      <div className={`${styles.headerContainer} glass-card`}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>SD.SYS</span>
        </div>

        <nav className={styles.navContainer}>
          <div className={styles.navTrack}>
            {navItems.map((item, index) => (
              <div
                key={item}
                ref={(el) => (navItemRefs.current[index] = el)}
                className={`${styles.navItem} ${activeIndex === index ? styles.active : ""}`}
                onClick={() => handleClick(index)}
              >
                {item}
              </div>
            ))}
          </div>
          <motion.div
            className={styles.selector}
            style={{ x: selectorX }}
            onClick={() => handleClick(activeIndex)}
          />
        </nav>

        <div className={styles.statusArea}>
          <div className={styles.statusIndicator}>
            <div className={styles.statusPulse}></div>
            <span>SYS.ACTIVE</span>
          </div>
          <button className={styles.consoleBtn} onClick={onConsoleClick}>
            CONSOLE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
