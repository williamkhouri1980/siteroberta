import { getConfig } from '@/lib/content'
import { EMAIL, LATTES_URL, ADDRESS, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/constants'

export default async function Footer() {
  const config    = await getConfig()
  const waNumber  = config.whatsapp  || WHATSAPP_NUMBER
  const waUrl     = `https://wa.me/${waNumber}?text=${WHATSAPP_MESSAGE}`
  const email     = config.email     || EMAIL
  const lattesUrl = config.lattesUrl || LATTES_URL
  const year      = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <span className="footer-dra">Dra.</span>
            <span className="footer-name">Roberta Pulcheri Ramos</span>
          </div>
          <p className="footer-esp">Pneumologia &middot; São Paulo</p>

        </div>

        <div className="footer-cols">
          <div>
            <span className="footer-col-label">Navegação</span>
            <ul className="footer-links">
              <li><a href="#quando-consultar">Quando consultar</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#condicoes">Condições</a></li>
              <li><a href="#como-funciona">Como funciona</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <span className="footer-col-label">Contato</span>
            <ul className="footer-links">
              <li>
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li><a href={`mailto:${email}`}>{email}</a></li>
              <li>
                <a href={lattesUrl} target="_blank" rel="noopener noreferrer">
                  Currículo Lattes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="footer-col-label">Localização</span>
            <address className="footer-address">
              {ADDRESS.neighborhood}<br />
              {ADDRESS.city}, {ADDRESS.state}<br />
              <a href="#localizacao">Ver no mapa &rarr;</a>
            </address>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; {year} Dra. Roberta Pulcheri Ramos. Todos os direitos reservados.
        </span>
        <span className="footer-copy">
          Informações para referência. Não substituem consulta médica.
        </span>
      </div>
    </footer>
  )
}
