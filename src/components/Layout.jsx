import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useRef } from "react";
import { useInView } from "motion/react";
import { motion } from "motion/react";

export default function Layout() {
  const portfolioRef = useRef(null);
  const isBgBlack = useInView(portfolioRef, { amount: 0.1 });
  return (
    <>
      {/* {loading && <Loader />} */}
      <Header />
      <motion.div
        style={{
          backgroundColor: isBgBlack ? "#000000" : "#fff",
          transition: "background-color 2s ease-in-out",
        }}
        className="wrapper"
      >
        <Outlet context={{ portfolioRef }} />
      </motion.div>
      {/* <Footer /> */}
    </>
  );
}
