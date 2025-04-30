import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import InstagramPreview from "../components/InstagramPreview";

export default function HomePage() {
  const portfolioRef = useRef(null);
  const {
    setHeaderTextColor,
    setHeaderBackgroundColor,
    setBackgroundColor,
    backgroundColor,
  } = useOutletContext();

  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start 100vh", "end 15vh"],
  });

  const progress = [0, 0.01, 0.15, 0.88, 1];

  const backgroundColorScroll = useTransform(scrollYProgress, progress, [
    "#fff",
    "#fff",
    "#000000",
    "#000000",
    "#fff",
  ]);
  const headerBackgroundColorScroll = useTransform(scrollYProgress, progress, [
    "",
    "#fff",
    "#000000",
    "#000000",
    "#fff",
  ]);
  const headerTextColorScroll = useTransform(scrollYProgress, progress, [
    "#333333",
    "#333333",
    "#fff",
    "#fff",
    "#333333",
  ]);

  useEffect(() => {
    if (setBackgroundColor) {
      setBackgroundColor(backgroundColorScroll);
    }
    if (setHeaderBackgroundColor) {
      setHeaderBackgroundColor(headerBackgroundColorScroll);
    }
    if (setHeaderTextColor) {
      setHeaderTextColor(headerTextColorScroll);
    }
  }, [
    setBackgroundColor,
    setHeaderBackgroundColor,
    setHeaderTextColor,
    backgroundColorScroll,
    headerBackgroundColorScroll,
    headerTextColorScroll,
  ]);

  return (
    <>
      <Hero />
      <Gallery />
      <div ref={portfolioRef}>
        <Portfolio backgroundColor={backgroundColor} />
      </div>
      <Testimonials />
      <InstagramPreview />
    </>
  );
}
