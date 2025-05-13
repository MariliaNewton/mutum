import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COLOR_DD_IN_PX = 630;

export default function Header({
  color,
  backgroundColor,
  headerBackgroundColor,
  isHome,
  isMobile,
}) {
  const [topOfPage, setTopOfPage] = useState(true);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const menuRef = useRef(null);
  const linkVariants = {
    hover: { opacity: 1 },
    rest: { opacity: 0 },
  };

  useEffect(() => {
    const handleCloseMenuMobile = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowDropdownMenu(false);
    };

    document.addEventListener("mousedown", handleCloseMenuMobile);
    document.addEventListener("touchstart", handleCloseMenuMobile);

    return () => {
      document.removeEventListener("mousedown", handleCloseMenuMobile);
      document.removeEventListener("touchstart", handleCloseMenuMobile);
    };
  }, [isMobile, showDropdownMenu]);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > COLOR_DD_IN_PX && setTopOfPage(false);
      window.scrollY <= COLOR_DD_IN_PX && setTopOfPage(true);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header style={{ color, backgroundColor: headerBackgroundColor }}>
      <nav className="header-nav">
        <motion.div className="header-logo">
          <Link to="/">MUTUM</Link>
        </motion.div>
        <ul className="header-nav-links">
          <motion.li initial="rest" whileHover="hover" animate="rest">
            <span>
              <Link to="/sobre">sobre</Link>
            </span>
            <motion.div
              variants={linkVariants}
              style={{ borderColor: color }}
              className="header-active-link"
            />
          </motion.li>
          <motion.li
            ref={menuRef}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="dropdown-menu-title"
            onMouseEnter={() => !isMobile && setShowDropdownMenu(true)}
            onMouseLeave={() => !isMobile && setShowDropdownMenu(false)}
            onClick={() => isMobile && setShowDropdownMenu((prev) => !prev)}
          >
            <span>portfólio</span>
            <motion.div
              variants={linkVariants}
              style={{ borderColor: color }}
              className="header-active-link"
            />
            <AnimatePresence>
              {showDropdownMenu && (
                <DropDownMenu
                  backgroundColor={backgroundColor}
                  color={color}
                  topOfPage={topOfPage}
                  isHome={isHome}
                  isMobile={isMobile}
                />
              )}
            </AnimatePresence>
          </motion.li>
          <motion.li initial="rest" whileHover="hover" animate="rest">
            <a href="#footer">contato</a>
            <motion.div
              variants={linkVariants}
              style={{ borderColor: color }}
              className="header-active-link"
            />
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  );
}

function DropDownMenu({ backgroundColor, color, topOfPage, isHome, isMobile }) {
  const liVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: {
          scaleY: 0,
          transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
            duration: 0.3,
            delay: 0.3,
          },
        },
        visible: {
          scaleY: 1,
          transition: {
            staggerChildren: 0.1,
            duration: 0.2,
            delayChildren: 0.15,
          },
        },
      }}
      style={{
        borderColor: color,
        backgroundColor: isMobile
          ? backgroundColor
          : !isHome
          ? "#fff"
          : topOfPage
          ? ""
          : backgroundColor,
        x: "-50%",
      }}
      className="dropdown-menu"
    >
      {["Casamento", "Pre-wedding", "Profissionais", "Eventos", "Prints"].map(
        (text, i) => (
          <motion.li key={i} variants={liVariants} whileHover={{ scale: 1.05 }}>
            <Link to={`/${text.toLowerCase().replace("-", "")}`}>{text}</Link>
          </motion.li>
        )
      )}
    </motion.ul>
  );
}
