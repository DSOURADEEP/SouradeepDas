import { useState } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { portfolioData } from "../../data/data";
import styles from "./Projects.module.css";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import AnimatedTitle from "../../components/AnimatedTitle/AnimatedTitle";

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <Element name="projects" className={styles.projects}>
      <div className={styles.headerArea}>
        <AnimatedTitle title="My Projects" targetWord="Projects" />
        <p className={styles.subtitle}>Hover over a project to see more details</p>
      </div>

      <div className={styles.stackingContainer}>
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.name}
            className={styles.stackedCard}
            style={{ 
              top: `calc(15vh + ${index * 30}px)`, 
              zIndex: index 
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className={styles.cardWrapper}
              onMouseEnter={() => setExpandedProject(project.name)}
              onMouseLeave={() => setExpandedProject(null)}
            >
              <ProjectCard
                project={project}
                isExpanded={expandedProject === project.name}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Element>
  );
};

export default Projects;
