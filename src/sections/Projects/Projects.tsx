import { useState } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { portfolioData } from "../../data/data";
import styles from "./Projects.module.css";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { FaPython, FaJava, FaReact } from 'react-icons/fa';
import { SiSpringboot, SiCplusplus, SiOpenai, SiGooglecloud } from 'react-icons/si';
import Reveal from "../../components/Reveal/Reveal";


const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <Element name="projects" className={styles.projects}>
      <div className={styles.bgAnimation}>
        <motion.div className={styles.symbol1} animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><FaPython /></motion.div>
        <motion.div className={styles.symbol2} animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><FaJava /></motion.div>
        <motion.div className={styles.symbol3} animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><FaReact /></motion.div>
        <motion.div className={styles.symbol4} animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><SiSpringboot /></motion.div>
        <motion.div className={styles.symbol5} animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}><SiCplusplus /></motion.div>
        <motion.div className={styles.symbol6} animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}><SiOpenai /></motion.div>
        <motion.div className={styles.symbol7} animate={{ y: [-10, 10, -10] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}><SiGooglecloud /></motion.div>
        <motion.div className={styles.symbol8} animate={{ scale: [0.9, 1, 0.9], rotate: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}><SiCplusplus /></motion.div>
      </div>
      <Reveal direction="down">
        <h2 className={styles.title}>My Projects</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className={styles.subtitle}>Hover over a project to see more details</p>
      </Reveal>
      <div className={styles.projectList}>
        {portfolioData.projects.map((project, index) => (
          <Reveal 
            key={project.name} 
            delay={index * 0.1} 
            direction={index % 2 === 0 ? "left" : "right"}
            width="100%"
          >
            <motion.div
              className={styles.projectCardContainer}
              onMouseEnter={() => setExpandedProject(project.name)}
              onMouseLeave={() => setExpandedProject(null)}
              layout
            >
              <ProjectCard
                project={project}
                isExpanded={expandedProject === project.name}
              />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Element>
  );
};

export default Projects;
