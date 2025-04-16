import { useState } from "react";
import { motion } from "motion/react";

export default function Testimonials() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

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

  return (
    <section className="testimonials-section">
      <div className="testimonials-wrapper">
        <h1>O que dizem nossos clientes?</h1>
        <div className="testimonials-container">
          {testimonials.map((item, index) => (
            <ClientTestimonial testimonial={item} key={index} />
          ))}
          {/* <ClientTestimonial testimonial={testimonials[1]} /> */}
        </div>
        <div className="testimonials-pagination">
          {testimonials.map((_, index) => (
            <motion.div
              style={{
                backgroundColor:
                  activeTestimonialIndex === index ? "#333333" : "##d9d9d9",
                cursor: "pointer",
              }}
              key={index}
            ></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientTestimonial({ testimonial }) {
  return (
    <div className="testimonial-card">
      <p className="text">
        {testimonial.review}
        <span className="quote quote-left">“</span>
        <span className="quote quote-right">”</span>
      </p>
      <h2 className="client">{testimonial.client}</h2>
      <h2 className="service">- {testimonial.service} -</h2>
    </div>
  );
}
