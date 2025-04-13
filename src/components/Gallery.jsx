import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

import galleryPhoto2 from "../assets/images/galleryPhoto2.png";
import galleryPhoto3 from "../assets/images/galleryPhoto3.png";
import galleryPhoto4 from "../assets/images/galleryPhoto4.png";
import galleryPhoto5 from "../assets/images/galleryPhoto5.png";
import galleryPhoto6 from "../assets/images/galleryPhoto6.png";

import heroPhoto from "../assets/images/heroPhoto.jpg";

export default function Gallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.0001], [0, 1]);

  const galleryPhotos = [
    galleryPhoto2,
    galleryPhoto3,
    galleryPhoto4,
    galleryPhoto5,
    galleryPhoto6,
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="gallery-scroll">
      <div className="gallery-container">
        <motion.div style={{ x }}>
          <div className="gallery-photo-container">
            <motion.img style={{ opacity }} src={heroPhoto} alt="" />
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.29 }}
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
