import { useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { Link, useOutletContext } from "react-router-dom";

export default function Portfolio({ backgroundColor }) {
  return (
    <motion.section className="portfolio-container">
      <PortfolioItem
        name="Casamentos"
        photoUrl={"images/casamentos.jpg"}
        animateFromLeft={true}
        backgroundColor={backgroundColor}
      />
      <PortfolioItem
        name="Pre-wedding"
        photoUrl={"images/prewedding.jpg"}
        backgroundColor={backgroundColor}
      />
      <PortfolioItem
        name="Profissionais"
        photoUrl={"images/profissionais.jpg"}
        animateFromLeft={true}
        backgroundColor={backgroundColor}
      />
      <PortfolioItem
        name="Eventos"
        photoUrl={"images/eventos.jpg"}
        backgroundColor={backgroundColor}
      />
      <PortfolioItem
        name="Prints"
        photoUrl={"images/prints.jpg"}
        animateFromLeft={true}
        backgroundColor={backgroundColor}
      />
    </motion.section>
  );
}

function PortfolioItem({
  name,
  photoUrl,
  animateFromLeft = false,
  backgroundColor,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const underlineControls = useAnimation();

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className="portfolio-item"
    >
      <Link style={{ overflow: "hidden" }} to={`/${name}`}>
        <motion.img
          variants={{
            hidden: {
              opacity: 0,
              translateX: animateFromLeft ? "-70%" : "70%",
            },
            visible: {
              opacity: [0, 0.1, 0.2, 1],
              translateX: "0%",
              transition: {
                duration: 0.7,
                ease: "easeOut",
              },
            },
          }}
          onMouseEnter={() => underlineControls.start("hover")}
          onMouseLeave={() => underlineControls.start("rest")}
          className="portfolio-cover-img"
          src={photoUrl}
          alt=""
        />
      </Link>

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            transition: {
              duration: 1,
              delay: 0.25,
              ease: "easeInOut",
            },
          },
          visible: {
            opacity: 1,
            transition: {
              duration: 1,
              delay: 0.25,
              ease: "easeInOut",
            },
          },
        }}
        className="portfolio-link-container"
      >
        <Link className="portfolio-link" to={`/${name}`}>
          <motion.span
            initial="rest"
            onMouseEnter={() => underlineControls.start("hover")}
            onMouseLeave={() => underlineControls.start("rest")}
            animate={underlineControls}
          >
            <span className="portfolio-item-name">{name}</span>
            <img
              className="underline-static"
              src="images/underline.svg"
              alt=""
            />
            <motion.div
              style={{ backgroundColor }}
              variants={{
                rest: {
                  scaleX: 1,
                  translateX: "-50%",
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                },
                hover: {
                  scaleX: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.0, 0, 0.15, 1],
                  },
                },
              }}
              className="underline-animated"
            ></motion.div>
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
