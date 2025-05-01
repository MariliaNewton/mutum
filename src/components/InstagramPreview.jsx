import { motion, useInView } from "motion/react";
import { useRef } from "react";

const imageNames = Array.from(
  { length: 19 },
  (_, i) => `imagesTest/instagramSection${i + 1}.jpg`
);

export default function InstagramPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section className="instagram-section">
      <motion.h1
        variants={{
          hidden: {
            y: "200%",
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          },
          visible: {
            y: "0%",
            opacity: 1,
            transition: {
              y: {
                duration: 0.7,
              },
              opacity: {
                duration: 0.7,
                delay: 0.25,
              },
            },
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        ref={ref}
      >
        Confira nosso{" "}
        <a
          href="https://www.instagram.com/mutumfotografias/"
          target="_blank"
          className="instagram-link"
        >
          <span>instagram</span>
          <img
            className="instagram-link-underline"
            src="images/underline2.svg"
          />
          <motion.div
            variants={{
              hidden: {
                scaleX: 1,
                translateX: "-48.5%",
                transition: {
                  duration: 0,
                },
              },
              visible: {
                scaleX: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.7,
                },
              },
            }}
            className="instagram-link-underline-mask"
          ></motion.div>
        </a>
      </motion.h1>
      <ImagesGrid />
      <div className="instagram-white-fade"></div>
    </section>
  );
}

function ImagesGrid() {
  return (
    <div className="images-grid">
      {imageNames.map((img, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { amount: 0.3, once: true });

        return (
          <motion.div key={index}>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              ref={ref}
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "tween",
                opacity: {
                  duration: 1.2,
                },
              }}
              src={img}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
