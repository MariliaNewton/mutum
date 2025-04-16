import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Portfolio from "../components/Portfolio";
import { useOutletContext } from "react-router-dom";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  const { portfolioRef, backgroundColor } = useOutletContext();
  return (
    <>
      <Hero />
      <Gallery />
      <div ref={portfolioRef}>
        <Portfolio backgroundColor={backgroundColor} />
      </div>
      <Testimonials />
      <div className="placeholder"></div>
    </>
  );
}
