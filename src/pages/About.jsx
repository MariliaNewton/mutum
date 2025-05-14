import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

export default function About() {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const isImgInView = useInView(imgRef, { amount: 0.3, once: true });
  const isTextInView = useInView(textRef, { amount: 0.3, once: true });
  const { isMobile } = useOutletContext();
  const { loading } = useOutletContext();

  const initialContainerLeft = {
    x: "-100%",
    opacity: 0,
  };
  const initialContainerRight = {
    x: "100%",
    opacity: 0,
  };
  const animateContainer = {
    x: "0%",
    opacity: 1,
  };
  const transitionContainer = {
    opacity: {
      duration: 1.75,
    },
    duration: 1.25,

    ease: "circOut",
  };
  const initialText = {
    opacity: 0,
  };
  const animateText = {
    opacity: 1,
  };
  const transitionText = {
    delay: isMobile ? 0.6 : 1.75,
    duration: 0.5,
    ease: "easeOut",
  };

  return (
    <section className="about-section">
      <motion.h1
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={!loading ? { clipPath: "inset(0 -10% 0 0)" } : {}}
        transition={{
          duration: 1.75,
          ease: "easeInOut",
        }}
      >
        Sobre nós
      </motion.h1>
      <div className="about-container">
        <motion.div
          initial={isMobile ? { opacity: 0 } : initialContainerLeft}
          animate={
            !loading ? (isMobile ? { opacity: 1 } : animateContainer) : null
          }
          transition={isMobile ? { duration: 1.75 } : transitionContainer}
          className="photographer-container first"
        >
          <motion.h2
            initial={initialText}
            animate={!loading ? animateText : null}
            transition={transitionText}
          >
            Ana
          </motion.h2>
          <div>
            <img src="images/ana.jpg" alt="" />
            <motion.p
              initial={initialText}
              animate={!loading ? animateText : null}
              transition={transitionText}
            >
              <span>Ana</span> Jucyara Newton Melo é psicóloga clínica com
              formação em Gestalt-terapia, Sonhos e Psicossomática. Com
              experiência em Psicologia Escolar pela Secretaria de Educação do
              Estado de Alagoas, ela utiliza sua sensibilidade para capturar
              momentos autênticos, valorizando a essência de cada indivíduo em
              seu trabalho fotográfico.
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          initial={isMobile ? { opacity: 0 } : initialContainerRight}
          animate={
            !loading ? (isMobile ? { opacity: 1 } : animateContainer) : null
          }
          transition={
            isMobile
              ? { duration: 1.75 }
              : { ...transitionContainer, delay: 0.5 }
          }
          className="photographer-container second"
        >
          <motion.h2
            initial={initialText}
            animate={!loading ? animateText : null}
            transition={transitionText}
          >
            Mari
          </motion.h2>
          <div>
            <img src="images/mari.jpg" alt="" />
            <motion.p
              initial={initialText}
              animate={!loading ? animateText : null}
              transition={transitionText}
            >
              <span>Mariana</span> Bezerra Marroquim é fotógrafa apaixonada por
              contar histórias através de imagens. Com formação que inclui
              referências literárias e artísticas, ela traduz emoções e
              narrativas pessoais em cada clique, explorando a profundidade dos
              sentimentos humanos e a beleza dos momentos cotidianos.
            </motion.p>
          </div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={isImgInView ? { opacity: 1, y: 0 } : {}}
          ref={imgRef}
          transition={{
            opacity: {
              duration: 2,
            },
            duration: 1,
          }}
          src="images/mutum.svg"
          alt=""
        />
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isTextInView ? { opacity: 1, y: 0 } : {}}
          ref={textRef}
          transition={{
            opacity: {
              duration: 2,
            },
            duration: 1,
          }}
        >
          Assim nasceu a Mutum Fotografias, unindo a sensibilidade única de Ana,
          que com sua experiência e olhar acolhedor captura as emoções mais
          profundas e genuínas de cada pessoa, e a criatividade de Mariana, que
          traduz histórias e sentimentos em imagens autênticas e poéticas.
          Juntas, elas criam uma fotografia que vai além do momento, buscando
          eternizar as memórias de maneira intimista, verdadeira e especial. A
          Mutum Fotografias é o encontro de duas visões complementares,
          proporcionando uma experiência única, onde cada clique conta uma
          história pessoal e emocional, conectando as pessoas com a essência do
          que realmente importa.
        </motion.p>
      </div>
    </section>
  );
}
