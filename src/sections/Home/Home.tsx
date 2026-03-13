import { useEffect, useState } from "react";
import { portfolioData } from "../../data/data";
import styles from "./Home.module.css";
import { Element, scroller } from "react-scroll";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showSourceMenu, setShowSourceMenu] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth out the mouse values for parallax
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const card1X = useTransform(springX, [-1, 1], [-20, 20]);
  const card1Y = useTransform(springY, [-1, 1], [-20, 20]);
  const card2X = useTransform(springX, [-1, 1], [30, -30]);
  const card2Y = useTransform(springY, [-1, 1], [30, -30]);

  const scrollToProjects = () => {
    scroller.scrollTo("projects", {
      smooth: true,
      duration: 500,
      offset: -80,
    });
  };

  return (
    <Element name="home" className={styles.home}>
      {/* Animated Radial Gradient Background is handled in CSS */}
      <div className={styles.radialGlow}></div>

      {/* Floating Parallax Glass Cards */}
      <motion.div 
        className={`${styles.floatingCard} glass-card`} 
        style={{ top: '15%', left: '10%', x: card1X, y: card1Y }}
      >
        <span className="tech-text">SEC_LVL_01</span>
        <div className={styles.dataBar}></div>
      </motion.div>

      <motion.div 
        className={`${styles.floatingCard} glass-card`} 
        style={{ bottom: '20%', right: '15%', x: card2X, y: card2Y }}
      >
        <span className="tech-text">SYS.UPTIME</span>
        <div className={styles.statusPulseGroup}>
          <div className={styles.pulseNode}></div>
          <span>99.99%</span>
        </div>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.headline}>
            <span className={styles.gradientText}>SOURADEEP</span>
            <br />
            DAS
          </h1>
        </motion.div>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I am {portfolioData.name}, a {portfolioData.title}. Building production-grade systems with high-end security, automation, and real-time observability.
        </motion.p>

        <motion.div 
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className={styles.primaryCta} onClick={scrollToProjects}>
            INITIALIZE <FaArrowRight className={styles.arrow} />
          </button>
          
          <div className={styles.sourceWrapper}>
            <button 
              className={`${styles.secondaryCta} glass-card`}
              onClick={() => setShowSourceMenu(!showSourceMenu)}
            >
              ABOUT_ME
            </button>
            
            <AnimatePresence>
              {showSourceMenu && (
                <motion.div 
                  className={`${styles.sourceMenu} glass-card`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={portfolioData.social.github} target="_blank" rel="noreferrer" className={styles.menuItem}>
                    <span>01</span> GITHUB_REPO
                  </a>
                  <a href={portfolioData.social.linkedin} target="_blank" rel="noreferrer" className={styles.menuItem}>
                    <span>02</span> LINKEDIN_PROFILE
                  </a>
                  <a href="/Souradeep_Das_Resume.pdf" download className={styles.menuItem}>
                    <span>03</span> DOWNLOAD_CV
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Element>
  );
};

export default Home;
