import { motion } from "motion/react";

export default function Loader() {
  const transition = {
    delay: 0.8,
    duration: 1.5,
    repeat: Infinity,
    repeatType: "mirror",
    repeatDelay: 1.5,
    ease: "easeInOut",
  };
  return (
    <motion.div
      initial={{ y: 0 }}
      // initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="loader-overlay"
    >
      <motion.span
        animate={{ y: [0, -75, -75, 0], x: [0, 0, 241, 241] }}
        transition={{ ...transition, delay: 2.3 }}
      >
        M
      </motion.span>
      <motion.span
        animate={{ y: [0, 60, 60, 0], x: [0, 0, 111, 111] }}
        transition={transition}
      >
        U
      </motion.span>
      <span>T</span>
      <motion.span
        animate={{ y: [0, -60, -60, 0], x: [0, 0, -111, -111] }}
        transition={transition}
      >
        U
      </motion.span>
      <motion.span
        animate={{ y: [0, 75, 75, 0], x: [0, 0, -241, -241] }}
        transition={{ ...transition, delay: 2.3 }}
      >
        M
      </motion.span>
    </motion.div>
  );
}
