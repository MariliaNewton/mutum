import { Link, useOutletContext } from "react-router-dom";
import { motion } from "motion/react";

export default function Header({ color, backgroundColor }) {
  return (
    <motion.header style={{ color, backgroundColor }}>
      <nav className="header-nav">
        <motion.div className="header-logo">
          <Link to="/">MUTUM</Link>
        </motion.div>
        <ul className="header-nav-links">
          <li>
            <Link to="/">sobre</Link>
          </li>
          <li>
            <a href="#portfolio">portfólio</a>
          </li>
          <li>
            <a href="#contact">contato</a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
