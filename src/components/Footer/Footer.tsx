import styles from "./Footer.module.css";
import { portfolioData } from "../../data/data";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.contactInfo}>
          <h4>Contact Me</h4>
          <p>{portfolioData.email}</p>
          <p>{portfolioData.phone}</p>
        </div>
        <div className={styles.socialLinks}>
          <h4>Follow Me</h4>
          <div className={styles.links}>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Souradeep Das. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
