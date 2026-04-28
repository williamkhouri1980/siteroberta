export default function Sobre() {
  return (
    <section id="sobre">
      <span className="label">Sobre a Dra. Roberta</span>
      <div className="sobre-grid">
        <h2 className="sobre-heading">
          Uma visão que<br />
          poucos especialistas<br />
          no mundo possuem.
        </h2>
        <div className="sobre-body">
          <p>
            A Dra. Roberta Pulcheri Ramos é pneumologista com formação até pós-doutorado
            e atuação clínica centrada em hipertensão pulmonar, fisiologia do exercício e
            terapia intensiva. O que a distingue não é o acúmulo de especialidades — é a
            forma como elas se integram.
          </p>
          <p>
            A maioria dos especialistas avalia o pulmão em repouso. Ela avalia o pulmão em
            movimento. A incorporação da fisiologia do exercício na prática diária de
            hipertensão pulmonar permite identificar alterações que exames convencionais
            não capturam — e isso muda diagnósticos.
          </p>
          <p>
            Atende presencialmente no Brasil e por telemedicina para pacientes em qualquer
            parte do mundo. Conduz ensino médico e pesquisa científica, mantendo a prática
            clínica como centro da sua atuação.
          </p>
          <div className="sobre-credentials">
            <span className="cred-item">Pós-doutorado</span>
            <span className="cred-item">Pneumologia</span>
            <span className="cred-item">Hipertensão Pulmonar</span>
            <span className="cred-item">Fisiologia Clínica do Exercício</span>
            <span className="cred-item">Terapia Intensiva</span>
            <span className="cred-item">Pesquisa Clínica</span>
            <span className="cred-item">Ensino Médico</span>
            <a
              className="cred-item cred-link"
              href="http://lattes.cnpq.br/3674430003360595"
              target="_blank"
              rel="noopener noreferrer"
            >
              Currículo Lattes &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
