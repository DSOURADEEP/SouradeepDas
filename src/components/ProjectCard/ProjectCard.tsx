import styles from "./ProjectCard.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  project: {
    name: string;
    tech: string[];
    dates: string;
    description: string;
    github?: string;
    liveDemo?: string;
  };
  isExpanded: boolean;
}

const ProjectCard = ({ project, isExpanded }: ProjectCardProps) => {
  return (
    <motion.div className={styles.card} layout>
      <motion.h3 layout="position">{project.name}</motion.h3>
      <motion.div className={styles.tech} layout="position">
        {project.tech.map((t) => (
          <span key={t} className={styles.techItem}>
            {t}
          </span>
        ))}
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.details}
          >
            <p className={styles.dates}>{project.dates}</p>
            <p>{project.description}</p>
            <div className={styles.links}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
