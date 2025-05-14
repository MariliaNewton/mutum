import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroPhoto from "../assets/images/heroPhoto.jpg";
import { useOutletContext } from "react-router-dom";

const INITIAL_DELAY = 0.3;

export default function Hero() {
  const { loading, isMobile } = useOutletContext();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end -1px"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "90vh"]);
  const opacity = useTransform(scrollYProgress, [0.99999, 1], [1, 0]);
  const height = useTransform(scrollYProgress, [0, 1], ["100vh", "80vh"]);
  const width = useTransform(scrollYProgress, [0, 1], ["100vw", "38vw"]);
  // const heightMobile = useTransform(scrollYProgress, [0, 1], ["100vh", "60vh"]);
  // const widthMobile = useTransform(scrollYProgress, [0, 1], ["100vw", "60vw"]);
  // const yMobile = useTransform(scrollYProgress, [0, 1], ["0vh", "80vh"]);

  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6],
    ["0px", "-50px", "-135px"]
  );

  return (
    <section ref={ref} className="hero">
      <motion.img
        src={heroPhoto}
        alt=""
        style={
          isMobile
            ? {}
            : {
                zIndex: 10,
                left: 0,
                y,
                height,
                width,
                opacity,
              }
        }
      />
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="hero-text"
      >
        <h1>
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={!loading ? { clipPath: "inset(0 0 0 0)" } : {}}
            transition={{
              delay: INITIAL_DELAY,
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            CADA
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{
              delay: INITIAL_DELAY + 0.3,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            olhar
          </motion.span>
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={!loading ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{
              delay: INITIAL_DELAY + 0.8,
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            UMA
          </motion.span>
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={!loading ? { clipPath: "inset(-20% 0% 0 0)" } : {}}
            transition={{
              delay: INITIAL_DELAY + 1.1,
              duration: 0.64,
              ease: "easeInOut",
            }}
          >
            HISTÓRIA
          </motion.span>
        </h1>
      </motion.div>
    </section>
  );
}
