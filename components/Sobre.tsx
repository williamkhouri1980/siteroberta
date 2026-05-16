import { getSobre } from '@/lib/content'

export default async function Sobre() {
  const sobre = await getSobre()

  return (
    <section id="sobre" aria-labelledby="sobre-heading">
      <div className="section-inner">
        <span className="label">Sobre a especialista</span>
        <div className="sobre-grid">
          <h2 id="sobre-heading" className="sobre-heading">{sobre.heading}</h2>
          <div className="sobre-body">
            {sobre.paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="sobre-credentials">
              {sobre.credenciais
                .filter(c => !c.toUpperCase().includes('CRM') && !c.toUpperCase().includes('RQE'))
                .map((c) => (
                  <span key={c} className="cred-item">{c}</span>
                ))}
              {sobre.lattesUrl && (
                <a
                  className="cred-item cred-link"
                  href={sobre.lattesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Currículo Lattes &rarr;
                </a>
              )}
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
