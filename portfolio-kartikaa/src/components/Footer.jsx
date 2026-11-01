import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} Kartikaa Natarajan</p>
        <p className="footer__hand">made with ☁ + ✎</p>
      </div>
    </footer>
  )
}
