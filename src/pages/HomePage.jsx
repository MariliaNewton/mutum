import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Portfolio from "../components/Portfolio";
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { portfolioRef } = useOutletContext();
  return (
    <>
      <Hero />
      <Gallery />
      <div ref={portfolioRef}>
        <Portfolio />
      </div>
    </>
  );
}
