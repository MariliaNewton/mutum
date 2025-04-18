export default function Footer() {
  return (
    <footer>
      <div className="footer-top-line"></div>
      <div className="footer-left">
        <h1>MUTUM</h1>
        <span>fotografias</span>
      </div>
      <div className="footer-right">
        <a
          href="https://www.instagram.com/mutumfotografias/"
          target="_blankface"
        >
          INSTAGRAM
        </a>
        <a href="https://www.facebook.com/mutumfotografias" target="_blank">
          FACEBOOK
        </a>
        <a href="mailto:mutum@gmail.com" target="_blank">
          MUTUM@GMAIL.COM
        </a>
        <a
          href="https://wa.me/5582993355662"
          target="_blank"
          className="footer-whatsapp"
        >
          <img src="images/whatsappLogo.svg" />
          <span>+55 (82) 99335-5662</span>
        </a>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="scroll-to-top"
      >
        <img src="images/scrollToTop.svg" alt="" />
      </button>
    </footer>
  );
}
