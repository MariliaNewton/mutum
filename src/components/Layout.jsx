import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

const SECOND = 1000;
const MIN_PAGE_LOAD = 1.8 * SECOND;
// const MIN_PAGE_LOAD = 3.8 * SECOND;
const GREY = "#333333";
const WHITE = "#fff";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [headerTextColor, setHeaderTextColor] = useState(GREY);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(WHITE);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useLayoutEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
    if (!loading) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [loading]);

  useEffect(() => {
    if (!isHome) {
      setHeaderTextColor(GREY);
      setHeaderBackgroundColor(WHITE);
      setBackgroundColor(WHITE);
    }
  }, [isHome]);

  useEffect(() => {
    setLoading(true);

    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(MIN_PAGE_LOAD - elapsedTime, 0);
      setTimeout(() => setLoading(false), remainingTime);
    };

    let allImages = [];
    let imagesLoaded = 0;

    setTimeout(() => {
      allImages = document.querySelectorAll("img");

      allImages.forEach((image) => {
        if (image.complete) {
          imagesLoaded += 1;
        } else {
          image.addEventListener("load", () => {
            imagesLoaded += 1;
            if (imagesLoaded === allImages.length) {
              handleLoad();
            }
          });
        }
      });

      if (imagesLoaded === allImages.length) {
        handleLoad();
      }
    }, 1000);

    return () => {
      allImages.forEach((image) => {
        image.removeEventListener("load", handleLoad);
      });
    };

    // remeber to check if the key is necessary to rerender
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <CustomCursor backgroundColor={headerTextColor} />
      <Header
        color={headerTextColor}
        headerBackgroundColor={headerBackgroundColor}
        backgroundColor={backgroundColor}
      />
      <motion.div style={{ backgroundColor }} className="wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Outlet
              context={{
                loading,
                backgroundColor,
                setHeaderTextColor,
                setHeaderBackgroundColor,
                setBackgroundColor,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <Footer />
    </>
  );
}

function CustomCursor({ backgroundColor }) {
  const [mouseOnScreen, setMouseOnScreen] = useState(false);

  const mouseX = useMotionValue(-20);
  const mouseY = useMotionValue(-20);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateMousePos = (e) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };
    const updateMouseLeave = () => setMouseOnScreen(false);
    const updateMouseEnter = () => setMouseOnScreen(true);

    window.addEventListener("mousemove", updateMousePos);
    document.addEventListener("mouseenter", updateMouseEnter);
    document.addEventListener("mouseleave", updateMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePos);
      document.removeEventListener("mouseenter", updateMouseEnter);
      document.removeEventListener("mouseleave", updateMouseLeave);
    };
  }, []);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        backgroundColor,
      }}
      animate={{
        opacity: mouseOnScreen ? 1 : 0,
      }}
      transition={{
        opacity: {
          duration: 0.25,
        },
        type: "spring",
        stiffness: 1000,
        damping: 30,
      }}
      className="circle-cursor"
    />
  );
}
