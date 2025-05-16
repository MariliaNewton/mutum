import { useOutletContext, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ImageForGrid from "../components/ImageForGrid";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
} from "motion/react";

const contentArr = {
  casamento: {
    title: "Casamentos",
    images: [
      "images/casamento/casamento1.jpg",
      "images/casamento/casamento2.jpg",
      "images/casamento/casamento3.jpg",
      "images/casamento/casamento4.jpg",
      "images/casamento/casamento5.jpg",
      "images/casamento/casamento6.jpg",
      "images/casamento/casamento7.jpg",
      "images/casamento/casamento8.jpg",
      "images/casamento/casamento9.jpg",
      "images/casamento/casamento10.jpg",
      "images/casamento/casamento11.jpg",
      "images/casamento/casamento12.jpg",
      "images/casamento/casamento13.jpg",
      "images/casamento/casamento14.jpg",
      "images/casamento/casamento15.jpg",
      "images/casamento/casamento16.jpg",
      "images/casamento/casamento17.jpg",
      "images/casamento/casamento18.jpg",
      "images/casamento/casamento19.jpg",
    ],
  },
  prewedding: {
    title: "Pre-wedding",
    images: [
      "images/casamento/casamento1.jpg",
      "images/casamento/casamento2.jpg",
      "images/casamento/casamento3.jpg",
      "images/casamento/casamento4.jpg",
      "images/casamento/casamento5.jpg",
      "images/casamento/casamento6.jpg",
      "images/casamento/casamento7.jpg",
      "images/casamento/casamento8.jpg",
      "images/casamento/casamento9.jpg",
      "images/casamento/casamento10.jpg",
      "images/casamento/casamento11.jpg",
      "images/casamento/casamento12.jpg",
      "images/casamento/casamento13.jpg",
      "images/casamento/casamento14.jpg",
      "images/casamento/casamento15.jpg",
      "images/casamento/casamento16.jpg",
      "images/casamento/casamento17.jpg",
      "images/casamento/casamento18.jpg",
      "images/casamento/casamento19.jpg",
    ],
  },
  profissionais: {
    title: "Profisionais",
    images: [
      "images/casamento/casamento1.jpg",
      "images/casamento/casamento2.jpg",
      "images/casamento/casamento3.jpg",
      "images/casamento/casamento4.jpg",
      "images/casamento/casamento5.jpg",
      "images/casamento/casamento6.jpg",
      "images/casamento/casamento7.jpg",
      "images/casamento/casamento8.jpg",
      "images/casamento/casamento9.jpg",
      "images/casamento/casamento10.jpg",
      "images/casamento/casamento11.jpg",
      "images/casamento/casamento12.jpg",
      "images/casamento/casamento13.jpg",
      "images/casamento/casamento14.jpg",
      "images/casamento/casamento15.jpg",
      "images/casamento/casamento16.jpg",
      "images/casamento/casamento17.jpg",
      "images/casamento/casamento18.jpg",
      "images/casamento/casamento19.jpg",
    ],
  },
  eventos: {
    title: "Eventos",
    images: [
      "images/casamento/casamento1.jpg",
      "images/casamento/casamento2.jpg",
      "images/casamento/casamento3.jpg",
      "images/casamento/casamento4.jpg",
      "images/casamento/casamento5.jpg",
      "images/casamento/casamento6.jpg",
      "images/casamento/casamento7.jpg",
      "images/casamento/casamento8.jpg",
      "images/casamento/casamento9.jpg",
      "images/casamento/casamento10.jpg",
      "images/casamento/casamento11.jpg",
      "images/casamento/casamento12.jpg",
      "images/casamento/casamento13.jpg",
      "images/casamento/casamento14.jpg",
      "images/casamento/casamento15.jpg",
      "images/casamento/casamento16.jpg",
      "images/casamento/casamento17.jpg",
      "images/casamento/casamento18.jpg",
      "images/casamento/casamento19.jpg",
    ],
  },
  prints: {
    title: "Prints",
    images: [
      "images/casamento/casamento1.jpg",
      "images/casamento/casamento2.jpg",
      "images/casamento/casamento3.jpg",
      "images/casamento/casamento4.jpg",
      "images/casamento/casamento5.jpg",
      "images/casamento/casamento6.jpg",
      "images/casamento/casamento7.jpg",
      "images/casamento/casamento8.jpg",
      "images/casamento/casamento9.jpg",
      "images/casamento/casamento10.jpg",
      "images/casamento/casamento11.jpg",
      "images/casamento/casamento12.jpg",
      "images/casamento/casamento13.jpg",
      "images/casamento/casamento14.jpg",
      "images/casamento/casamento15.jpg",
      "images/casamento/casamento16.jpg",
      "images/casamento/casamento17.jpg",
      "images/casamento/casamento18.jpg",
      "images/casamento/casamento19.jpg",
    ],
  },
};

const NAV_PHOTO_WIDTH = 104;
const NAV_PHOTO_WIDTH_MOBILE = 78;
const NAV_PHOTO_GAP = 30;
const NAV_PHOTO_GAP_MOBILE = 15;
const DRAG_MIN = 15;

export default function PortfolioCategory() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { category } = useParams();
  const content = contentArr[category.toLocaleLowerCase()];
  const selectedImgRef = useRef(null);
  const dragX = useMotionValue(0);
  const dragXNav = useMotionValue(0);
  const { isMobile, isMobileSm, loading } = useOutletContext();

  const photoWidth = isMobileSm ? NAV_PHOTO_WIDTH_MOBILE : NAV_PHOTO_WIDTH;
  const photoGap = isMobileSm ? NAV_PHOTO_GAP_MOBILE : NAV_PHOTO_GAP;

  useEffect(() => {
    selectedImgRef.current = selectedImg;
  }, [selectedImg]);

  useEffect(() => {
    if (selectedImg !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [selectedImg]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImg(null);
      }
      if (e.key === "ArrowLeft") {
        handlePreviousPhoto();
      }
      if (e.key === "ArrowRight") {
        handleNextPhoto();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  function handleNextPhoto() {
    if (selectedImgRef.current >= content.images.length - 1) return;
    setSelectedImg((prev) => prev + 1);
  }

  function handlePreviousPhoto() {
    if (selectedImgRef.current <= 0) return;
    setSelectedImg((prev) => prev - 1);
  }

  function onDragEnd() {
    const x = dragX.get();

    if (x <= -DRAG_MIN) {
      handleNextPhoto();
    } else if (x >= DRAG_MIN) {
      handlePreviousPhoto();
    }
  }
  useEffect(() => {
    if (selectedImg === null) return;
    const targetX = -selectedImg * (photoWidth + photoGap) - photoWidth / 2;

    const controls = animate(dragXNav, targetX, {
      duration: 0.4,
      easing: "easeInOut",
    });

    return controls.stop;
  }, [selectedImg, photoWidth, photoGap]);

  return (
    <>
      {content ? (
        <PortfolioPage
          content={content}
          selectImg={setSelectedImg}
          loading={loading}
        />
      ) : (
        <PortfolioNotFound />
      )}
      <AnimatePresence mode="wait">
        {selectedImg !== null && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedImg(null)}
            className="fullscreen-overlay"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="fullscreen-container"
            >
              <motion.img
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                style={{
                  x: dragX,
                }}
                transition={{ duration: 0.3 }}
                src={content.images[selectedImg]}
                alt=""
                className="fullscreen-photo"
              />
              <button
                onClick={handlePreviousPhoto}
                className="portfolio-arrows previous"
              >
                <img src="images/portfolioPrevious.svg" alt="" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="portfolio-arrows next"
              >
                <img src="images/portfolioNext.svg" alt="" />
              </button>
              <button
                onClick={() => setSelectedImg(null)}
                className="portfolio-close"
              >
                <img src="images/portfolioClose.svg" alt="" />
              </button>
              <motion.div
                drag={isMobile ? "x" : false}
                dragConstraints={{
                  left:
                    -(content.images.length + 1) * (photoWidth + photoGap / 2),
                  right: -photoWidth / 2,
                }}
                onDragEnd={onDragEnd}
                style={{
                  x: dragXNav,
                }}
                transition={{
                  ease: "easeInOut",
                }}
                className="photos-navigation-container"
              >
                {content.images.map((img, index) => (
                  <motion.div
                    className="photos-navigation"
                    key={index}
                    onClick={() => setSelectedImg(index)}
                    animate={{
                      scale: +selectedImg === index ? 1.125 : 1,
                    }}
                  >
                    <img src={img} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PortfolioPage({ content, selectImg, loading }) {
  return (
    <section className="portfolio-page-section">
      <motion.h1
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={!loading ? { clipPath: "inset(0 -10% 0 0)" } : {}}
        transition={{
          duration: 1.75,
          ease: "easeInOut",
        }}
      >
        {content.title}
      </motion.h1>
      <ImagesGrid images={content.images} selectImg={selectImg} />
      <div className="portfolio-contact">
        <h1>Sua história merece ser contada</h1>
        <p>
          Vamos conversar pelo{" "}
          <a href="https://wa.me/5582993355662" target="_blank">
            whatsapp
          </a>{" "}
          e criar algo único para você
        </p>
      </div>
    </section>
  );
}

function PortfolioNotFound() {
  return (
    <div className="category-not-found">
      <h1>Não encontramos esse tipo de ensaio</h1>
      <h2>
        Verifique se digitou corretamente ou escolha uma opção no menu acima
      </h2>
    </div>
  );
}

function ImagesGrid({ images, selectImg }) {
  return (
    <div className="images-grid images-grid-portfolio">
      {images.map((img, index) => (
        <ImageForGrid key={index} src={img} onClick={() => selectImg(index)} />
      ))}
    </div>
  );
}
