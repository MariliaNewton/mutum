import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useRef, useEffect } from "react";
import { useInView, useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";

export default function Layout() {
  const portfolioRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start 100vh", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 0.85, 1],
    ["#fff", "#fff", "#000000", "#000000", "#fff"]
  );
  const headerBackgroundColor = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 0.85, 1],
    ["", "#fff", "#000000", "#000000", "#fff"]
  );
  const headerTextColor = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 0.85, 1],
    ["#333333", "#333333", "#fff", "#fff", "#333333"]
  );

  return (
    <>
      {/* {loading && <Loader />} */}
      <Header color={headerTextColor} backgroundColor={headerBackgroundColor} />
      <motion.div
        style={{
          backgroundColor,
        }}
        className="wrapper"
      >
        <Outlet context={{ portfolioRef, backgroundColor }} />
      </motion.div>
      {/* <Footer /> */}
    </>
  );
}
