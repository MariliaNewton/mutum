import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useRef } from "react";
import { useInView, useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";

export default function Layout() {
  const portfolioRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start 100vh", "end center"],
  });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.175],
    ["#fff", "#000000"]
  );

  return (
    <>
      {/* {loading && <Loader />} */}
      <Header />
      <motion.div
        style={{
          backgroundColor,
        }}
        className="wrapper"
      >
        <Outlet context={{ portfolioRef }} />
      </motion.div>
      {/* <Footer /> */}
    </>
  );
}
