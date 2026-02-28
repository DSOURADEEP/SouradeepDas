import { useState, useRef, useEffect } from "react";
import { scroller } from "react-scroll";
import styles from "./Header.module.css";
import { motion, useMotionValue, animate } from "framer-motion";

const navItems = ["Home", "Projects", "History", "Skills"];
const ITEM_WIDTH = 120; // Assuming each nav item has this width

const Header = ({ visibleSection }: { visibleSection: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectorX = useMotionValue(0); // MotionValue for the selector's x position
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to animate the selector's position
  const animateSelectorTo = (index: number) => {
    const targetX = index * ITEM_WIDTH;
    animate(selectorX, targetX, {
      type: "spring",
      stiffness: 250,
      damping: 30,
      mass: 1,
    });
  };

  // Handle click on nav item
  const handleClick = (index: number) => {
    setActiveIndex(index);
    animateSelectorTo(index); // Animate selector
    scroller.scrollTo(navItems[index].toLowerCase(), {
      smooth: true,
      duration: 500,
      offset: -80,
    });
  };

  // Effect to sync selector with manual scroll (via visibleSection prop)
  useEffect(() => {
    const newIndex = navItems.indexOf(visibleSection);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      animateSelectorTo(newIndex); // Animate selector to new active item
    }
  }, [visibleSection]);

  // Set initial selector position on mount
  useEffect(() => {
    animateSelectorTo(activeIndex);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Souradeep Das</div>
      <nav className={styles.navContainer}>
        <div className={styles.navTrack}>
          {navItems.map((item, index) => (
            <div
              key={item}
              ref={(el) => (navItemRefs.current[index] = el)}
              className={`${styles.navItem} ${activeIndex === index ? styles.active : ""}`}
              onClick={() => handleClick(index)} // Now clickable
            >
              {item}
            </div>
          ))}
        </div>
        {/* The selector - now controlled by clicks/scroll, not draggable */}
        <motion.div
          className={styles.selector}
          style={{ x: selectorX }} // Use motion value for x
          onClick={() => handleClick(activeIndex)} // Clicking selector also navigates
        />
      </nav>
    </header>
  );
};

export default Header;
