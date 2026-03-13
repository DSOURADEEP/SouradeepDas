import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./sections/Home/Home";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills"; // Cyberpunk Skills
import History from "./sections/History/History";
import TerminalWidget from "./components/Terminal/TerminalWidget";
import styles from "./App.module.css";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll"; // Import Element

// ... (Section component definition)

const Section = ({ children, onInView, id }: { children: React.ReactNode, onInView: () => void, id: string }) => {
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        onInView();
      }
    },
  });

  return (
    <Element name={id.toLowerCase()}>
      <div ref={ref}>
        {children}
      </div>
    </Element>
  );
};


function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [visibleSection, setVisibleSection] = useState("Home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className={styles.app}>
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      
      {/* Animated Journey Line */}
      <div className={styles.journeyLineContainer}>
        <motion.svg
          viewBox="0 0 10 100"
          preserveAspectRatio="none"
          className={styles.journeySvg}
        >
          <motion.path
            d="M 5 0 L 5 100"
            fill="none"
            stroke="url(#journeyGradient)"
            strokeWidth="2"
            style={{ pathLength: scrollYProgress }}
          />
          <defs>
            <linearGradient id="journeyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="50%" stopColor="var(--secondary)" />
              <stop offset="100%" stopColor="var(--tertiary)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <Header visibleSection={visibleSection} onConsoleClick={() => setIsTerminalOpen(true)} />
      <main>
        <Section id="Home" onInView={() => setVisibleSection("Home")}>
          <Home />
        </Section>
        <Section id="Projects" onInView={() => setVisibleSection("Projects")}>
          <Projects />
        </Section>
        <Section id="History" onInView={() => setVisibleSection("History")}>
          <History />
        </Section>
        <Section id="Skills" onInView={() => setVisibleSection("Skills")}>
          <Skills />
        </Section>
      </main>
      <Footer />
      <TerminalWidget isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
}

export default App;
