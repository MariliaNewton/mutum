import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue } from "motion/react";
import { useOutletContext } from "react-router-dom";

const testimonials = [
  {
    client: "Mari & Ana",
    review:
      "Experiência incrível! As fotos ficaram simplesmente perfeitas, capturando cada detalhe e emoção do momento. O profissionalismo e o olhar sensível fizeram toda a diferença. Com certeza, voltarei para mais registros especiais!",
    service: "Pre-wedding",
  },
  {
    client: "João & Luana",
    review:
      "As fotos do nosso casamento ficaram emocionantes! Cada clique carrega uma memória linda. Foi tudo feito com muito carinho e atenção aos detalhes. Recomendamos de olhos fechados!",
    service: "Casamento",
  },
  {
    client: "Equipe VitalCorp",
    review:
      "Precisávamos de fotos profissionais para nosso time e ficamos impressionados com a qualidade e agilidade do trabalho. Superou todas as expectativas!",
    service: "Profissionais",
  },
  {
    client: "Carlos Mendes",
    review:
      "Cobriram nosso evento com muita sensibilidade e presença. As fotos captaram não só momentos, mas a energia do ambiente. Ficou lindo demais!",
    service: "Evento",
  },
];

const ONE_SECOND = 1000;
const AUTO_DELAY = 6 * ONE_SECOND;
const DRAG_MIN = 50;
const DRAG_MIN_MOBILE = 15;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.25, once: true });
  const { isMobile } = useOutletContext();

  const dragX = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setActiveIndex((index) =>
          index >= testimonials.length - 1 ? 0 : index + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(interval);
  }, [isInView, activeIndex]);

  function onDragEnd() {
    const x = dragX.get();
    const drag = isMobile ? DRAG_MIN_MOBILE : DRAG_MIN;

    if (x <= -drag && activeIndex < testimonials.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (x >= drag && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  }

  const initialAnimation = { opacity: 0, y: 200 };
  const animateAnimation = { opacity: isInView ? 1 : 0, y: isInView ? 0 : 200 };
  const transitionAnimation = {
    opacity: { duration: 1.3 },
    y: { duration: 1 },
    ease: "easeOut",
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
      ref={ref}
      className="testimonials-section"
    >
      <div className="testimonials-wrapper">
        <motion.h1
          initial={initialAnimation}
          animate={animateAnimation}
          transition={transitionAnimation}
        >
          O que dizem nossos clientes?
        </motion.h1>

        <motion.div className="testimonials-container">
          <motion.div
            initial={initialAnimation}
            drag="x"
            dragConstraints={{
              right: 0,
              left: 0,
            }}
            style={{
              x: dragX,
            }}
            animate={{
              translateX: `-${activeIndex * 100}%`,
              ...animateAnimation,
            }}
            transition={{
              translateX: {
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
              },
              ...transitionAnimation,
            }}
            onDragEnd={onDragEnd}
            className="testimonials-slider"
          >
            <ClientTestimonial activeIndex={activeIndex} />
          </motion.div>
        </motion.div>

        <DotsPagination
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </motion.section>
  );
}

function ClientTestimonial({ activeIndex }) {
  return (
    <>
      {testimonials.map((item, index) => (
        <motion.div
          animate={{
            scale: activeIndex === index ? 1 : 0.8,
            opacity: activeIndex === index ? 1 : 0,
          }}
          transition={{
            opacity: {
              duration: 1,
            },
            scale: {
              duration: 0.65,
            },
            type: "tween",
            ease: "easeIn",
          }}
          className="testimonial-card"
          key={index}
        >
          <p className="text">
            {item.review}
            <span className="quote quote-left">“</span>
            <span className="quote quote-right">”</span>
          </p>
          <h2 className="client">{item.client}</h2>
          <h2 className="service">- {item.service} -</h2>
        </motion.div>
      ))}
    </>
  );
}

function DotsPagination({ activeIndex, setActiveIndex }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      variants={{
        hidden: {
          transition: {
            staggerChildren: 0,
          },
        },
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.55,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className="testimonials-pagination"
    >
      {testimonials.map((_, index) => (
        <motion.button
          layout
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          onClick={() => setActiveIndex(index)}
          key={index}
        >
          {index === activeIndex && (
            <motion.div
              layoutId="dot"
              style={{ backgroundColor: "#333333" }}
              className="button-mask"
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
