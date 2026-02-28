import { portfolioData } from "../../data/data";
import styles from "./Home.module.css";
import { Element, scroller } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Bubble = ({ icon, link, style, name }: { icon: React.ReactNode; link: string; style: React.CSSProperties, name: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bubble}
      style={style}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <AnimatePresence>
      {isHovered && (
        <motion.div 
          className={styles.tooltip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Click to visit my {name}
        </motion.div>
      )}
      </AnimatePresence>
    </motion.a>
  );
};


const Home = () => {
  const scrollToProjects = () => {
    scroller.scrollTo("projects", {
      smooth: true,
      duration: 500,
      offset: -80,
    });
  };

  const nameParts = portfolioData.name.split(" ");

  return (
    <Element name="home" className={styles.home}>
      <Bubble icon={<FaGithub />} name="GitHub" link={portfolioData.social.github} style={{ top: '15%', left: '10%', fontSize: '4.5rem' }} />
      <Bubble icon={<FaLinkedin />} name="LinkedIn" link={portfolioData.social.linkedin} style={{ top: '65%', right: '10%', fontSize: '4.5rem' }} />
      <Bubble icon={<FaGithub />} name="GitHub" link={portfolioData.social.github} style={{ bottom: '15%', left: '20%', fontSize: '3rem' }} />
      <Bubble icon={<FaLinkedin />} name="LinkedIn" link={portfolioData.social.linkedin} style={{ top: '25%', right: '20%', fontSize: '3.5rem' }} />

      <div className={styles.intro}>
        <motion.h1
          className={styles.nameTitle}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {nameParts.map((part, partIndex) => (
            <span key={partIndex} style={{ display: 'inline-block', marginRight: '1.5rem' }}>
              {part.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        <motion.h2
          className={styles.jobTitle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {portfolioData.title}
        </motion.h2>
         <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          I am a Site Reliability Engineer (Apprentice) Engineering custom internal tooling and automation solutions. Passionate about building impactful tech solutions, I am a Software Engineer driven by curiosity, continuous learning, and a love for solving real-world problems through code.
        </motion.p>
        <div className={styles.buttonContainer}>
          <motion.button
            className={styles.ctaButton}
            onClick={scrollToProjects}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(56, 178, 172, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
           <motion.a
            href="/Souradeep_Das_Resume.pdf"
            download="Souradeep_Das_Resume.pdf"
            className={styles.ctaButtonAlt}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let me help you with hiring me
          </motion.a>
        </div>
      </div>
    </Element>
  );
};

export default Home;
