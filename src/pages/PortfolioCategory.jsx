import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
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
  //   prewedding: {
  //     title: "Pre-wedding",
  //     images: [],
  //   },
  profisionais: {
    title: "Profisionais",
    images: [],
  },
  eventos: {
    title: "Eventos",
    images: [],
  },
  prints: {
    title: "Prints",
    images: [],
  },
};

const NAV_PHOTO_WIDTH = 104;
const NAV_PHOTO_GAP = 30;
const DRAG_MIN = 50;
const MOBILE_BREAKPOINT = 768;

export default function PortfolioCategory() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { category } = useParams();
  const content = contentArr[category.toLocaleLowerCase()];
  const selectedImgRef = useRef(null);
  const dragX = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    selectedImgRef.current = selectedImg;
  }, [selectedImg]);

  useEffect(() => {
    if (selectedImg) {
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

  return (
    <>
      {content ? (
        <PortfolioPage content={content} selectImg={setSelectedImg} />
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
                animate={{
                  x: `${
                    -selectedImg * (NAV_PHOTO_WIDTH + NAV_PHOTO_GAP) -
                    NAV_PHOTO_WIDTH / 2
                  }px`,
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

function PortfolioPage({ content, selectImg }) {
  return (
    <section className="portfolio-page-section">
      <h1>{content.title}</h1>
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
      {images.map((img, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { amount: 0.3, once: true });

        return (
          <motion.div onClick={() => selectImg(index)} key={index}>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              ref={ref}
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "tween",
                opacity: {
                  duration: 1.2,
                },
              }}
              src={img}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
