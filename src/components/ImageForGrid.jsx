import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function ImageForGrid({ src, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div onClick={onClick}>
      <motion.img
        src={src}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        whileHover={{
          scale: 1.05,
        }}
        transition={{
          type: "tween",
          opacity: {
            duration: 1.2,
          },
        }}
      />
    </motion.div>
  );
}
