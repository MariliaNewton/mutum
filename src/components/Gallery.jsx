import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

import galleryPhoto2 from "../assets/images/galleryPhoto2.png";
import galleryPhoto3 from "../assets/images/galleryPhoto3.png";
import galleryPhoto4 from "../assets/images/galleryPhoto4.png";
import galleryPhoto5 from "../assets/images/galleryPhoto5.png";
import galleryPhoto6 from "../assets/images/galleryPhoto6.png";

import heroPhoto from "../assets/images/heroPhoto.jpg";
import useWindowDimensions from "../utils/getWindowDimension";

export default function Gallery() {
  const [widthScroll, setWidthScroll] = useState(0);
  const [topToBottom, setTopToBottom] = useState(true);
  const ref = useRef(null);
  const scrollableRef = useRef(null);
  const inView = useInView(scrollableRef, { amount: 0.29 });
  const { width } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      updateSize();
    }, 0);

    function updateSize() {
      const { width } = scrollableRef.current.getBoundingClientRect();
      setWidthScroll(width);
    }
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const handleScrollDir = () => {
      if (scrollableRef.current) {
        const { top } = scrollableRef.current.getBoundingClientRect();
        top > 0 ? setTopToBottom(true) : setTopToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScrollDir);

    return () => window.removeEventListener("scroll", handleScrollDir);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `-${widthScroll - width}px`]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.0001], [0, 1]);

  const galleryPhotos = [
    galleryPhoto2,
    galleryPhoto3,
    galleryPhoto4,
    galleryPhoto5,
    galleryPhoto6,
  ];

  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0,
      },
    },
    visible: {
      transition: {
        staggerChildren: topToBottom ? 0.25 : 0,
        staggerDirection: topToBottom ? 1 : -1,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section ref={ref} className="gallery-scroll">
      <div className="gallery-container">
        <motion.div ref={scrollableRef} style={{ x }}>
          <div className="gallery-photo-container">
            <motion.img style={{ opacity }} src={heroPhoto} alt="" />
          </div>
          <motion.div
            variants={containerVariants}
            animate={inView ? "visible" : "hidden"}
            initial="hidden"
            viewport={0.8}
          >
            {galleryPhotos.map((photo, index) => (
              <motion.div
                variants={photoVariants}
                key={index}
                className="gallery-photo-container"
              >
                <img src={photo} alt="" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
