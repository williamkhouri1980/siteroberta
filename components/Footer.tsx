export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-brand">
        <span className="footer-dra">Dra.</span>
        <span className="footer-name">Roberta Pulcheri Ramos</span>
      </div>
      <ul className="footer-links">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#especialidades">Especialidades</a></li>
        <li><a href="#atendimento">Atendimento</a></li>
        <li>
          <a
            href="http://lattes.cnpq.br/3674430003360595"
            target="_blank"
            rel="noopener noreferrer"
          >
            Publicações
          </a>
        </li>
        <li><a href="#agendar">Contato</a></li>
      </ul>
      <span className="footer-copy">&copy; {year}</span>
    </footer>
  )
}
