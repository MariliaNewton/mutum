import { useRef, useEffect, useState, createRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import galleryPhoto2 from "../assets/images/galleryPhoto2.png";
import galleryPhoto3 from "../assets/images/galleryPhoto3.png";
import galleryPhoto4 from "../assets/images/galleryPhoto4.png";
import galleryPhoto5 from "../assets/images/galleryPhoto5.png";
import galleryPhoto6 from "../assets/images/galleryPhoto6.png";

import heroPhoto from "../assets/images/heroPhoto.jpg";
import useWindowDimensions from "../utils/getWindowDimension";
import { useOutletContext } from "react-router-dom";

export default function Gallery() {
  const [widthScroll, setWidthScroll] = useState(0);
  const [topToBottom, setTopToBottom] = useState(true);
  const { isMobile } = useOutletContext();
  const ref = useRef(null);
  const scrollableRef = useRef(null);
  const scrollableRefMobile = useRef(null);
  const photoRefs = useRef([]);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.29) {
          setInView(true);
        } else if (entry.intersectionRatio < 0.01) {
          setInView(false);
        }
      },
      { threshold: [0.01, 0.29] },
    );

    if (scrollableRef.current) {
      observer.observe(scrollableRef.current);
    }

    return () => observer.disconnect();
  }, []);
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
    ["0px", `-${widthScroll - width}px`],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.0001], [0, 1]);

  const galleryPhotos = [
    galleryPhoto2,
    galleryPhoto3,
    galleryPhoto4,
    galleryPhoto5,
    galleryPhoto6,
  ];

  const containerVariants = isMobile
    ? {}
    : {
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

  const photoVariants = isMobile
    ? {}
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };

  return (
    <section ref={ref} className="gallery-scroll">
      <div className="gallery-container">
        <motion.div ref={scrollableRef} style={isMobile ? {} : { x }}>
          {!isMobile && (
            <div className="gallery-photo-container">
              <motion.img
                style={{ opacity: opacity }}
                src={heroPhoto}
                alt=""
                className="gallery-photo-container-first"
              />
            </div>
          )}
          <motion.div
            variants={containerVariants}
            animate={inView ? "visible" : "hidden"}
            initial="hidden"
            ref={scrollableRefMobile}
          >
            {galleryPhotos.map((photo, index) => {
              if (!photoRefs.current[index]) {
                photoRefs.current[index] = createRef();
              }

              const { scrollXProgress } = useScroll({
                axis: "x",
                target: photoRefs.current[index],
                container: scrollableRef,
                offset: ["center end", "center start"],
              });

              const scale = useTransform(
                scrollXProgress,
                [0, 0.5, 1],
                [0.85, 1, 0.85],
              );
              return (
                <motion.div
                  style={isMobile ? { scale } : {}}
                  ref={photoRefs.current[index]}
                  variants={photoVariants}
                  key={index}
                  className="gallery-photo-container"
                >
                  <img src={photo} alt="" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
