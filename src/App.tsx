import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./sections/Home/Home";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills";
import History from "./sections/History/History";
import TerminalWidget from "./components/Terminal/TerminalWidget";
import styles from "./App.module.css";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll"; // Import Element


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

  return (
    <div className={styles.app}>
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <Header visibleSection={visibleSection} />
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
      <TerminalWidget />
    </div>
  );
}

export default App;
