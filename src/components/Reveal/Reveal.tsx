import { motion } from "framer-motion";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  scale?: number;
}

const Reveal = ({ 
  children, 
  width = "fit-content", 
  direction = "up", 
  delay = 0, 
  duration = 0.5,
  scale = 1
}: RevealProps) => {
  const getInitialProps = () => {
    switch (direction) {
      case "up": return { y: 50, opacity: 0 };
      case "down": return { y: -50, opacity: 0 };
      case "left": return { x: -50, opacity: 0 };
      case "right": return { x: 50, opacity: 0 };
      default: return { y: 50, opacity: 0 };
    }
  };

  return (
    <motion.div
      style={{ width, position: "relative", overflow: "visible" }}
      initial={{ ...getInitialProps(), scale }}
      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
