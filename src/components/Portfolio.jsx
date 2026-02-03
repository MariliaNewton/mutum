import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useOutletContext } from "react-router-dom";

const categories = [
  { name: "Casamentos", photoUrl: "images/casamentos.jpg", slug: "casamentos" },
  {
    name: "Casal e Família",
    photoUrl: "images/prewedding.jpg",
    slug: "pre-wedding",
  },
  { name: "Eventos", photoUrl: "images/eventos.jpg", slug: "eventos" },
  {
    name: "Posicionamento Profissional",
    photoUrl: "images/profissionais.jpg",
    slug: "profissionais",
  },
  {
    name: "Para Parede | Fotografia Para Impressão",
    photoUrl: "images/prints.jpg",
    slug: "prints",
  },
];

export default function Portfolio({ backgroundColor, headerTextColor }) {
  const { isMobile } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.section
      className="portfolio-split-layout"
      style={{
        backgroundColor: "transparent",
        "--portfolio-text": headerTextColor,
        "--portfolio-border": headerTextColor,
        "--portfolio-active-bg": headerTextColor,
        "--portfolio-active-text": backgroundColor,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Left Menu */}
      <div className="portfolio-menu">
        {categories.map((category) => {
          const isActive = activeCategory.name === category.name;

          return (
            <motion.div
              key={category.name}
              layout
              className="portfolio-menu-item-wrapper"
              onMouseEnter={() => setActiveCategory(category)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="portfolio-menu-active-bg"
                />
              )}

              <Link
                to={`/${category.slug}`}
                className={`portfolio-menu-item ${isActive ? "active" : ""}`}
              >
                {category.name}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Right Display */}
      <div className="portfolio-display">
        <motion.div
          variants={{
            hover: { x: "0%", y: "0%" },
            initial: { x: "100%", y: "-100%" },
          }}
          className="portfolio-arrow-icon"
          initial="initial"
          animate={isHovering ? "hover" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={`/${activeCategory.slug}`}
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.img
            key={activeCategory.name}
            src={activeCategory.photoUrl}
            alt={activeCategory.name}
            className="portfolio-display-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
