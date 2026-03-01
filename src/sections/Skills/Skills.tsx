import { portfolioData } from "../../data/data";
import styles from "./Skills.module.css";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import Reveal from "../../components/Reveal/Reveal";

const SkillGroup = ({ title, skills, index }: { title: string; skills: string[]; index: number }) => (
  <Reveal delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
    <div className={styles.skillGroup}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.honeycomb}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            className={styles.hexagon}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div className={styles.hexagonInner}>{skill}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </Reveal>
);

const Skills = () => {
  return (
    <Element name="skills" className={styles.skills}>
      <Reveal direction="down">
        <h2>Technical Skills</h2>
      </Reveal>
      <div className={styles.groupsContainer}>
        <SkillGroup index={0} title="Languages" skills={portfolioData.skills.languages} />
        <SkillGroup index={1} title="Frameworks" skills={portfolioData.skills.frameworks} />
        <SkillGroup index={2} title="Databases" skills={portfolioData.skills.databases} />
        <SkillGroup index={3} title="Tools" skills={portfolioData.skills.tools} />
      </div>
    </Element>
  );
};

export default Skills;
