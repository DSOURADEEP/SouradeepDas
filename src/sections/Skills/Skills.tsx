import { portfolioData } from "../../data/data";
import styles from "./Skills.module.css";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

const SkillGroup = ({ title, skills }: { title: string; skills: string[] }) => (
  <div className={styles.skillGroup}>
    <h3 className={styles.groupTitle}>{title}</h3>
    <div className={styles.honeycomb}>
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          className={styles.hexagon}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className={styles.hexagonInner}>{skill}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <Element name="skills" className={styles.skills}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Technical Skills
      </motion.h2>
      <div className={styles.groupsContainer}>
        <SkillGroup title="Languages" skills={portfolioData.skills.languages} />
        <SkillGroup title="Frameworks" skills={portfolioData.skills.frameworks} />
        <SkillGroup title="Databases" skills={portfolioData.skills.databases} />
        <SkillGroup title="Tools" skills={portfolioData.skills.tools} />
      </div>
    </Element>
  );
};

export default Skills;
