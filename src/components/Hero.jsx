import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import heroPhoto from "../assets/images/heroPhoto.jpg";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end -1px"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "90vh"]);
  const opacity = useTransform(scrollYProgress, [0.99999, 1], [1, 0]);
  const height = useTransform(scrollYProgress, [0, 1], ["100vh", "80vh"]);
  const width = useTransform(scrollYProgress, [0, 1], ["100vw", "38vw"]);

  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    ["0px", "-50px", "-120px"]
  );

  return (
    <section ref={ref} className="hero">
      <motion.img
        src={heroPhoto}
        alt=""
        style={{
          zIndex: 10,
          left: 0,
          y,
          height,
          width,
          opacity,
        }}
      />
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="hero-text"
      >
        <h1>
          <span>CADA</span>
          <span>olhar</span>
          <span>UMA</span>
          <span>HISTÓRIA</span>
        </h1>
      </motion.div>
    </section>
  );
}
