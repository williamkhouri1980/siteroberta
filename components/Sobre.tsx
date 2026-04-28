import { LATTES_URL, CRM } from '@/lib/constants'

const credenciais = [
  'Pós-doutorado em Pneumologia',
  'Especialista em Hipertensão Pulmonar',
  'Fisiologia Clínica do Exercício (CPET)',
  'Terapia Intensiva',
  'Pesquisa Clínica',
  'Ensino Médico',
]

export default function Sobre() {
  return (
    <section id="sobre" aria-labelledby="sobre-heading">
      <div className="section-inner">
        <span className="label">Sobre a especialista</span>
        <div className="sobre-grid">
          <h2 id="sobre-heading" className="sobre-heading">
            Diagnóstico que vai além do exame de repouso.
          </h2>
          <div className="sobre-body">
            <p>
              A Dra. Roberta Pulcheri Ramos é pneumologista em São Paulo com formação
              até pós-doutorado e atuação clínica centrada em hipertensão pulmonar,
              fisiologia do exercício e doenças respiratórias complexas.
            </p>
            <p>
              Seu diferencial é avaliar o pulmão em movimento — não apenas em repouso.
              Ao integrar a fisiologia do exercício na prática clínica, identifica
              alterações que exames convencionais como espirometria e ecocardiograma
              de repouso não capturam. Isso muda diagnósticos e evita anos de tratamento
              inadequado.
            </p>
            <p>
              Atende presencialmente em São Paulo e por telemedicina para pacientes em
              qualquer parte do mundo, em português, inglês e espanhol. Conduz pesquisa
              científica e ensino médico com foco em hipertensão pulmonar e teste
              cardiopulmonar.
            </p>

            <div className="sobre-credentials">
              {credenciais.map((c) => (
                <span key={c} className="cred-item">{c}</span>
              ))}
              <a
                className="cred-item cred-link"
                href={LATTES_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Currículo Lattes &rarr;
              </a>
            </div>

            <p className="sobre-crm">{CRM}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
